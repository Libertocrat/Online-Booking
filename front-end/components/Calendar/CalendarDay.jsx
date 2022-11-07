import React, { useState } from "react";
import styles from "./CalendarDay.module.scss"; //SCSS Modules use example

function CalendarDay (props) {

    const dayClasses = `${styles['day']} ${props.isToday ? styles['today'] : '' } ${props.status === 'inactive' ? styles['inactive'] : ''}`;

    return(
        <div className= {dayClasses} key={props.id}>
            <div>{props.day}</div>
        </div>
    );
}

export default CalendarDay;