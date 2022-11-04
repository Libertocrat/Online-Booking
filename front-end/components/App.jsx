import React, { useState } from "react";
import styles from "./App.module.scss"; //SCSS Modules use example

import CalendarMonth from "./Calendar/CalendarMonth.jsx"
import calendarMonth from "../backend-test-vars.js";

function App(props) {

    return(
        <React.StrictMode>
            <h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>
            <CalendarMonth calendarMonth = {calendarMonth} key="Calendar-month"/>
        </React.StrictMode>
    );
}

export default App;