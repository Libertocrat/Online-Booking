import React, { useState } from "react";
import styles from "./CalendarMonthDay.module.scss";

function CalendarMonthDay (props) {

    const dayClasses = `${styles['day']} ${props.isToday && styles['today']} ${props.status === 'inactive' && styles['inactive']}`;

    function onDayClickHandler() {
        
        // Update calendar day date, by calling parent function passed by props
        if (props.status === 'active') {
            props.onDayChange(props.dayDate);
        }
    }

    return(
        <div className= {dayClasses} key={props.id} onClick={onDayClickHandler}>
            <div>{props.day}</div>
        </div>
    );
}

export default CalendarMonthDay;