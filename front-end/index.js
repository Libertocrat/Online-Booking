import React from 'react';
//import ReactDOM from "react-dom"; This was for React 17, it's no longer in use
import { createRoot } from 'react-dom/client';
import App from "./components/App.jsx";
import './sass/main.scss';
import './styles.css'; //Just for testing, it may be removed if working with SASS/SCSS

// React 18 App rendering
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);