import React, { useState } from "react";
import TimeBlock from "./TimeBlock.jsx";
import styles from "./CalendarDay.module.scss";

function CalendarDay (props) {

    const dayClasses = `${styles['calendar-day']}`;
    const dayDate = `${props.weekDay}, ${props.month} ${props.day}, ${props.year}`

    function navClickHandler(event) {
        const dayUrl = event.target.getAttribute('aref');
        //window.open(dayUrl,"_self");
        alert(dayUrl);
    }

    return(
        <div className = {styles['calendar-day']}>

            <div className={styles['nav-bar']}>
                <div className={styles['nav-btn']}>
                    <span className={`material-icons`} onClick={navClickHandler} aref={props.lastDayUrl}>chevron_left</span>
                </div>
                <div className={styles['title']}>{dayDate}</div>
                <div className={styles['nav-btn']}>
                    <span className={`material-icons`} onClick={navClickHandler} aref={props.nextDayUrl}>chevron_right</span>
                </div>
            </div>

            <div className={styles['time-block-wrap']}>
                <TimeBlock status="inactive" height="50px"/>
                <TimeBlock status="blocked" height="100px"/>
                <TimeBlock status="active" height="50px" startHour="10:00am" endHour="11:00am"/>
                <TimeBlock status="active" height="50px" startHour="11:00am" endHour="12:00pm"/>
                <TimeBlock status="active" height="50px" startHour="12:00pm" endHour="1:00pm"/>
                <TimeBlock status="blocked" height="50px" startHour="1:00pm" endHour="2:00pm"/>
                <TimeBlock status="active" height="100px" startHour="2:00pm" endHour="4:00pm"/>
                <TimeBlock status="inactive" height="50px"/>
            </div>
            
        </div>
    );
}

export default CalendarDay;