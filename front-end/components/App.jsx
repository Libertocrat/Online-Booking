import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from "./App.module.scss"; //SCSS Modules use example

import CalendarMonth from "./Calendar/CalendarMonth.jsx";
import CalendarDay from "./Calendar/CalendarDay.jsx";
//import calendarMonth from "../backend-test-vars.js";

function App(props) {

    const calendarDay = JSON.parse(document.getElementById('calendar-day').textContent);

    // Set month and day to today's date
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    const [app, setApp] = useState({
        showMonth: {year: year, month: month},
        showDay: {year: year, month: month, day: day},
        calendarDay: calendarDay
    });
    //console.log(app);

    useEffect(() => {
        // ... code here, what should happens when the component renders for the 1st time
        console.log("useEffect: Day changed. New app object");
        console.log(app);

    }, [onDayChangeHandler]);

    // Updates the calendar day to show
    function onDayChangeHandler(calendarDay) {

        setApp({
            ...app,
            calendarDay: calendarDay,
            showDay: {year: calendarDay.year, month: calendarDay.month, day: calendarDay.day}
        });

        console.log("OnDayChangeHandler: Day changed. New calendar day data:");
        console.log(calendarDay);
        console.log("New app object:");
        console.log(app);
    }

    /*
    useEffect(() => {
        
        //console.log(`${day}/${month}/${year}`);
        setApp({

            year: toString(year),
            month: toString(month),
            day: toString(day)
        });
        
        console.log(app);
    }, []);
*/
    return(
        <div>
            <Header />
            <CalendarMonth showMonth={app.showMonth} onDayChange={onDayChangeHandler}/>
            <CalendarDay calendarDay={app.calendarDay} showDay={app.showDay} onDayChange={onDayChangeHandler}/>
        </div>
    );
}

export default App;

function Header() {
    return(<h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>);
}