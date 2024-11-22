# URL Shortener web app 🔗

A modern URL shortening service built with Node.js, Express, and Redis. Features a clean UI with real-time statistics and social sharing capabilities.

![URL Shortener Demo](https://github.com/your-username/url-shortener/raw/main/demo.gif)

## Features ✨

- **URL Shortening** 🎯
  - Generate short, unique URLs
  - Duplicate URL detection
  - URL validation
  - Custom short ID generation

- **Statistics Dashboard** 📊
  - Track visit counts
  - View creation dates
  - Visual analytics with Chart.js
  - Historical data visualization

- **Social Sharing** 🌐
  - Direct sharing to Facebook
  - Direct sharing to Twitter
  - One-click copy functionality

- **Modern UI** 🎨
  - Responsive design with Tailwind CSS
  - Clean and intuitive interface
  - Loading states and error handling
  - Mobile-friendly layout

## Technology Stack 🛠️

- **Backend**
  - Node.js
  - Express.js
  - Redis (for data storage)
  - ShortID (for URL generation)

- **Frontend**
  - HTML5
  - Tailwind CSS
  - Chart.js
  - Vanilla JavaScript

- **Database**
  - Redis Cloud

## Prerequisites 📋

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Redis Cloud account or local Redis instance
- Environment variables configured

## Installation 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REDIS_HOST=your-redis-host
   REDIS_PORT=your-redis-port
   REDIS_PASSWORD=your-redis-password
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints 🛣️

### Shorten URL
```http
POST /shorten
Content-Type: application/json

{
    "url": "https://example.com"
}
```

### Redirect to Original URL
```http
GET /url/:id
```

### Get URL Statistics
```http
GET /stats
```

## Redis Data Structure 📚

The application uses the following Redis key patterns:

- `url:{original_url}` - Maps original URLs to short IDs
- `id:{short_id}` - Maps short IDs to original URLs
- `visits:{short_id}` - Tracks visit counts
- `created:{short_id}` - Stores creation timestamps

## Development 👩‍💻👨‍💻

### Run in Development Mode
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Directory Structure 📁

```
url-shortener/
├── pages/
│   ├── index.html
│   └── list.html
├── package.json
├── server.js
├── .env
├── .gitignore
└── README.md
```

## Environment Variables ⚙️

| Variable | Description | Required |
|----------|-------------|-----------|
| `REDIS_HOST` | Redis server host | Yes |
| `REDIS_PORT` | Redis server port | Yes |
| `REDIS_PASSWORD` | Redis server password | Yes |
| `PORT` | Application port | No (default: 3000) |

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Express.js](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
