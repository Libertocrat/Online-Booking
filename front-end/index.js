import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './sass/main.scss'; //Global styles
import App from "./components/App.jsx";
import {GlobalContextProvider} from "./components/Context/GlobalContext.jsx";

// React 18 App rendering
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <GlobalContextProvider>
        <App />
    </GlobalContextProvider>
);

/*
const calendarMonth = createRoot(document.getElementById('calendar-month'));
calendarMonth.render(<CalendarMonth />);
*/