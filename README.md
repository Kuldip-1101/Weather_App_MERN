# Weather Web Application

## Overview

This Weather Web Application is a modern, responsive React app that provides current weather information for any city worldwide. Built with Create React App, it features dynamic weather-based backgrounds, glassmorphism UI, and smooth animations. The app fetches data from the OpenWeatherMap API and displays detailed weather metrics including temperature, humidity, wind, pressure, visibility, UV index, air quality, and sunrise/sunset times.

## Features

- **City Search:** Enter any city name to get instant weather data
- **Dynamic Backgrounds:** Weather-specific gradients and animations (clear, cloudy, rainy, drizzle, snowy)
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Full-Screen Layout:** Immersive weather experience with glassmorphism effects
- **Detailed Metrics:** Temperature, feels-like, humidity, wind speed/direction, pressure, visibility, UV index, air quality, sunrise/sunset
- **Weather Icons:** Animated weather icons with floating effects
- **Loading States:** Smooth loading spinner during API calls
- **Error Handling:** User-friendly alerts for invalid cities or API errors

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kuldip-1101/Weather_App_MERN.git
   cd Weather_App_MERN
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up API Key:**
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/)
   - Create a `.env` file in the root directory:
     ```
     REACT_APP_API_KEY=your_api_key_here
     ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   - Opens at `http://localhost:3000`

## Usage

1. **Search for Weather:** Type a city name in the search bar and press Enter or click the search button
2. **View Details:** See current weather, temperature, and detailed metrics in the grid below
3. **Responsive Experience:** The app adapts to your screen size automatically
4. **Background Changes:** Notice how the background and text colors change based on weather conditions

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Project Structure

```
src/
├── Components/
│   └── WeatherApp/
│       ├── WeatherApp.jsx           # Main weather component with state management
│       ├── WeatherApp.css           # Main component styles and responsive design
│       ├── WeatherDetailCard.jsx    # Reusable component for weather detail cards
│       └── WeatherDetailCard.css    # Detail card specific styles
├── App.js                          # Root app component
├── index.js                        # React entry point
├── index.css                       # Global styles
└── reportWebVitals.js              # Performance monitoring
```

## Component Architecture

The application follows a modular component-based architecture:

- **WeatherApp**: Main container component that manages all weather data state, API calls, and renders the complete weather interface
- **WeatherDetailCard**: Reusable component for displaying individual weather metrics (humidity, wind, pressure, etc.) with consistent styling and behavior

### Key Design Decisions

- **Component Reusability**: WeatherDetailCard component eliminates code duplication and ensures consistent UI across all detail cards
- **Separation of Concerns**: Styles are separated into component-specific CSS files for better maintainability
- **Responsive Design**: Mobile-first approach with breakpoints at 768px, 480px, and 360px
- **Performance**: Uses React hooks (useCallback, useEffect) for optimized re-renders and API calls

## Technologies Used

- **React:** Component-based UI with hooks (useState, useEffect, useCallback) for state management and side effects
- **CSS:** Modern styling with gradients, animations, glassmorphism effects, and responsive design
- **OpenWeatherMap API:** Weather data source with current weather endpoint
- **Create React App:** Development setup with hot reloading, build optimization, and testing framework
- **Component Architecture:** Modular design with reusable WeatherDetailCard component

## API Integration

The app uses the OpenWeatherMap Current Weather API endpoint:

```
https://api.openweathermap.org/data/2.5/weather?q={city}&units=Metric&appid={API_KEY}
```

Enjoy checking the weather! 🌤️
