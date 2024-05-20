const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const redis = require("redis");
const shortid = require("shortid");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static("pages"));

const redisClient = redis.createClient({
    password: "2JjL3du2seFsS5nmDhPCfwf0Ceon68l4",
    socket: {
        host: "redis-12370.c328.europe-west3-1.gce.redns.redis-cloud.com",
        port: 12370,
    },
});
redisClient.connect();
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "list.html"));
});

app.post("/shorten", async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }
    if (!isValidUrl(url)) {
        return res.status(400).json({ error: "Invalid URL submitted" });
    }

    const urlKey = `url:${url}`;
    const existingShortId = await redisClient.get(urlKey);
    if (existingShortId) {
        const createdAt = await redisClient.get(`created:${existingShortId}`);
        res.json({
            shortUrl: `${req.protocol}://${req.get("host")}/url/${existingShortId}`,
            created: createdAt || "Date not found",
        });
    } else {
        const id = shortid.generate();
        const createdAt = Date.now();
        await redisClient.set(urlKey, id);
        await redisClient.set(`id:${id}`, url);
        await redisClient.set(`visits:${id}`, 0);
        await redisClient.set(`created:${id}`, createdAt.toString());
        res.json({
            shortUrl: `${req.protocol}://${req.get("host")}/url/${id}`,
            created: createdAt,
        });
    }
});

app.get("/url/:id", async (req, res) => {
    const originalUrl = await redisClient.get(`id:${req.params.id}`);
    if (!originalUrl) {
        res.status(404).json({ error: "URL not found" });
    } else {
        const referer = req.headers.referer || "No referer";
        console.log(`Referer: ${referer}`);
        await redisClient.incr(`visits:${req.params.id}`);
        res.redirect(originalUrl);
    }
});

app.get("/stats", async (req, res) => {
    try {
        const keys = await redisClient.keys("id:*");
        const urls = await Promise.all(
            keys.map(async (key) => {
                const shortId = key.split(":")[1];
                const originalUrl = await redisClient.get(key);
                const visits = await redisClient.get(`visits:${shortId}`);
                const created = await redisClient.get(`created:${shortId}`);
                return {
                    shortId,
                    originalUrl,
                    visits: visits || 0,
                    created,
                };
            })
        );
        res.json(urls);
    } catch (error) {
        console.error("Failed to retrieve URLs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});

module.exports = app;
