import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from "./App.module.scss"; //SCSS Modules use example

import CalendarMonth from "./Calendar/CalendarMonth.jsx";
import CalendarDay from "./Calendar/CalendarDay.jsx";

function App(props) {

    // Get initial context from backend
    const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    const [app, setApp] = useState({
        showMonth: {year: '', month: ''},
        showDay: {year: '', month: '', day: ''},
        csrfToken: csrfToken
    });
    //console.log(app);

    /* Initial render effect*/
    useEffect(() => {
        
        // Set calendar day to today's date & calendar month to current month
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // Month number starts on 0 for January
        let year = today.getFullYear(); 

        setApp({
            ...app,
            showMonth: {year: year, month: month},
            showDay: {year: year, month: month, day: day}
        });

    }, []);

    // Updates the calendar day to show
    function onDayChangeHandler(dayDate) {

        setApp({
            ...app,
            showDay: {year: dayDate.year, month: dayDate.month, day: dayDate.day}
        });

        /*
        console.log("OnDayChangeHandler: Day changed. New calendar day data:");
        console.log(calendarDay);
        console.log("New app object:");
        console.log(app);
        */
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
            <CalendarMonth 
                showMonth={app.showMonth}
                csrfToken={app.csrfToken}
                onDayChange={onDayChangeHandler}
            />
            <CalendarDay 
                //calendarDay={app.calendarDay} 
                showDay={app.showDay}
                csrfToken={app.csrfToken} 
                onDayChange={onDayChangeHandler}
            />
        </div>
    );
}

export default App;

function Header() {
    return(<h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>);
}