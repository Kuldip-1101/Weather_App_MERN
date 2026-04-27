// React application entry point - renders the App component into the DOM
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Create React root and render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// reportWebVitals is included by Create React App for optional performance logging.
// It is called here, but you can remove it if you do not need metrics.
reportWebVitals();
