NASA Space Explorer

This is a simple Node.js application that integrates with multiple space-related public APIs:
- NASA Astronomy Picture of the Day (APOD)
- Launch Library 2 (Upcoming Rocket Launches)
- Open Notify (Real-Time ISS Location)


## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nasa-space-explorer.git
   cd nasa-space-explorer
Install dependencies


npm install
Add your .env file


NASA_API_KEY=Your_NASA_API_Key_Here
Run the application


node index.js
Run tests

npm test
This application fetches:

The Astronomy Picture of the Day (APOD) from NASA's API

Real-time location of the International Space Station (ISS)

Upcoming space launches using Launch Library 2




{
  "title": "The Milky Way over the Desert",
  "explanation": "A stunning view of the galaxy...",
  "date": "2025-05-01",
  "imageUrl": "https://apod.nasa.gov/apod/image/2405/milkyway_desert.jpg"
}