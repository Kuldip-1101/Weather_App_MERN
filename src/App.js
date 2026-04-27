// Root application component that renders the weather app
import "./App.css";
import WeatherApp from "./Components/WeatherApp/WeatherApp";

// Simple wrapper component - main logic is in WeatherApp
function App() {
  return (
    <div>
      <WeatherApp />
    </div>
  );
}

export default App;
