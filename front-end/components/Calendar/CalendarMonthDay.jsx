import React, { useState } from "react";
import styles from "./CalendarMonthDay.module.scss";

function CalendarMonthDay (props) {

    const dayClasses = `${styles['day']} ${props.isToday && styles['today']} ${props.status === 'inactive' && styles['inactive']}`;

    return(
        <div className= {dayClasses} key={props.id}>
            <div>{props.day}</div>
        </div>
    );
}

export default CalendarMonthDay;