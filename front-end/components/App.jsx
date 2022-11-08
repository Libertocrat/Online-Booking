import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from "./App.module.scss"; //SCSS Modules use example

import CalendarMonth from "./Calendar/CalendarMonth.jsx";
import CalendarDay from "./Calendar/CalendarDay.jsx";
//import calendarMonth from "../backend-test-vars.js";

function App(props) {

    //<h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>

    return(
        <div>
            <h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>
            <CalendarMonth />
            <CalendarDay 
                weekDay = "Tue"
                day = "8"
                month = "Nov"
                year = "2022"
            />
        </div>
    );
}

export default App;

function Home() {
    return(<h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>);
}