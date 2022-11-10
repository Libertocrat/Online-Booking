import React, { useState } from "react";
import styles from "./CalendarMonthDay.module.scss";

function CalendarMonthDay (props) {

    const dayClasses = `${styles['day']} ${props.isToday && styles['today']} ${props.status === 'inactive' && styles['inactive']}`;

    function onClickHandler(event) {
        //alert(props.dayUrl);

        fetch(props.dayUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': props.csrfToken,
                'Content-Type': 'application/json'
              }/*,
            body: JSON.stringify({
                data: data,
            })*/
          }
        )
        .then(response => response.json())
        .then(
            (result) => {
                //handlePostSuccess(result); // success handling
                console.log(result);
                props.onDayChange(result.calendarDay);
            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);
            }
        );
    }

    return(
        <div className= {dayClasses} key={props.id} onClick = {onClickHandler}>
            <div>{props.day}</div>
        </div>
    );
}

export default CalendarMonthDay;