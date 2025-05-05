import React from "react";
import ReactDOM from "react-dom/client"; // Make sure to import from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Make sure this path matches where your App component is located

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
