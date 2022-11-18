import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from "./App.module.scss"; //SCSS Modules use example

import GlobalContext from "./Context/GlobalContext.jsx";
import CalendarMonth from "./Calendar/CalendarMonth.jsx";
import CalendarDay from "./Calendar/CalendarDay.jsx";
import Modal from "./Modal/Modal.jsx";

function App(props) {

    // Get initial context from backend
    const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    const [app, setApp] = useState({
        showMonth: {year: '', month: ''},
        displayMonth: true,
        showDay: {year: '', month: '', day: ''},
        displayDay: false,
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

    // Updates the calendar month to show
    function onMonthChangeHandler(monthDate) {

        setApp({
            ...app,
            showMonth: {year: monthDate.year, month: monthDate.month}
        });
    }

    function dayDisplayHandler(display) {

        // Show/hide calendar day view
        if (display != app.displayDay) {
            setApp((prevState) => {
                return { ...prevState,
                    displayDay: display,
                }
            });
        }
    }

    function monthDisplayHandler(display) {

        // Show/hide calendar month view
        if (display != app.displayMonth) {
            setApp((prevState) => {
                return { ...prevState,
                    displayMonth: display,
                }
            });
        }
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
        <GlobalContext.Provider
            value={{
                csrfToken: app.csrfToken
            }}
        >
            <h1 className={styles['main-header']}>Online Booking App</h1>
            <Modal>
                <CalendarMonth 
                    showMonth={app.showMonth}
                    displayMonth={app.displayMonth}
                    onMonthChange={onMonthChangeHandler}
                    onDayChange={onDayChangeHandler}
                    onDayDisplay={dayDisplayHandler}
                    onMonthDisplay={monthDisplayHandler}
                />
                <CalendarDay 
                    //calendarDay={app.calendarDay} 
                    showDay={app.showDay}
                    displayDay={app.displayDay}
                    displayMonth={app.displayMonth}
                    onDayChange={onDayChangeHandler}
                    onDayDisplay={dayDisplayHandler}
                    onMonthDisplay={monthDisplayHandler}
                />
            </Modal>
        </GlobalContext.Provider>
    );
}

export default App;