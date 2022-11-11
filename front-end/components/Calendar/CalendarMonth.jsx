import React, { useState, useEffect } from "react";
import styles from "./CalendarMonth.module.scss"; //SCSS Modules use example

import CalendarMonthDay from "./CalendarMonthDay.jsx";
//import calendarMonth from "../../backend-test.js";

function CalendarMonth (props) {

    // Initial context sent from backend
    const calendarMonth = JSON.parse(document.getElementById('calendar-month').textContent);

    const [state, setState] = useState({
        calendarMonth: '',
        csrfToken: props.csrfToken,
        showMonth: props.showMonth
    });

    // Set initial state after first render
    useEffect(() => {

        setState({
            ...state,
            calendarMonth: calendarMonth
        });

    }, []);

    function loadMonth(event) {
        const monthUrl = event.target.getAttribute('aref');
        window.open(monthUrl,"_self");
    }

    if (state.calendarMonth != '') {

        return (
            <div className={styles['month']}>
    
                <div className={styles['nav-bar']}>
                    <div className={`${styles['nav-btn']}`}>
                        <span className={`material-icons`} onClick={loadMonth} aref={state.calendarMonth.lastMonthUrl}>chevron_left</span>
                    </div>
                    <div className={styles['title']}>{state.calendarMonth.titleMonth} {state.calendarMonth.titleYear}</div>
                    <div className={`${styles['nav-btn']}`}>
                        <span className={`material-icons`} onClick={loadMonth} aref={state.calendarMonth.nextMonthUrl}>chevron_right</span>
                    </div>
                </div>
            
                <div className={styles['week'] + " " + styles['week__labels']} key="week-label">
                {
                    state.calendarMonth.weekDayLabels.map( dayLabel => {
                        return(<div key={dayLabel}>{dayLabel}</div>);
                    })
                }
                </div>
                
                {
                    state.calendarMonth.monthDays.map((week, weekNum) => {
                        return(
                            <div className={styles['week']} key={weekNum}>
                                {
                                    week.map( (monthDay, index) => {
    
                                        let dayDate = {year: monthDay.year, month: monthDay.month, day: monthDay.day};
    
                                        return(
                                            <CalendarMonthDay
                                                key={monthDay.id}
                                                csrfToken={state.csrfToken}  
                                                id={monthDay.id}
                                                dayUrl={monthDay.dayUrl}
                                                day={monthDay.day}
                                                dayDate={dayDate}
                                                isToday={monthDay.isToday}
                                                status={monthDay.status}
    
                                                onDayChange={props.onDayChange}
                                            />);
                                        })
                                }
                            </div>
                        );
                    })
                }
                
            </div>
        );

    }
    else {
        return(<p className={styles['month']}>Loading...</p>);
    }
    

    /*
    return (
        <div className={styles['month']}>
            <div className={styles['title']}>{props.calendarMonth.titleMonth} {props.calendarMonth.titleYear}</div>
        
                <div className={styles['week'] + " " + styles['week__labels']} key="week-label">
                {
                    props.calendarMonth.weekDayLabels.map( dayLabel => {
                        return(<div key={dayLabel}>{dayLabel}</div>);
                    })
                }
                </div>
                <div className={styles['week']} key="week-01">
                {
                    props.calendarMonth.monthDays[0].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-02">
                {
                    props.calendarMonth.monthDays[1].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-03">
                {
                    props.calendarMonth.monthDays[2].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-04">
                {
                    props.calendarMonth.monthDays[3].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-05">
                {
                    props.calendarMonth.monthDays[4].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id} 
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
            
        </div>
        
    );
    */
}

export default CalendarMonth;