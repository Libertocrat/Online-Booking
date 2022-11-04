import React from 'react';
import { createRoot } from 'react-dom/client';
import './sass/main.scss'; //Global styles
import App from "./components/App.jsx";

// React 18 App rendering
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);