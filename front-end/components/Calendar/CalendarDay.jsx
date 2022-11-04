import React, { useState } from "react";
import styles from "./CalendarDay.module.scss"; //SCSS Modules use example

function CalendarDay (props) {

    return(
        <div className={styles['day']} key={props.id}>
            <div>{props.day}</div>
        </div>
    );
}

export default CalendarDay;