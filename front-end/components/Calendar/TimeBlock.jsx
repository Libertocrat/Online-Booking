import React, { useState } from "react";
import styles from "./TimeBlock.module.scss";

function TimeBlock (props) {

    const timeBlockClasses = `${styles['time-block']} ${styles[props.status]}`;
    const blockHeight = `${parseInt(props.relHeight) * 50}px`;
    console.log(blockHeight);

    function onClickHandler(event) {

        if (props.status === "active") {
            const hours = `${props.startHour} - ${props.endHour}`;
            alert("Available for booking: " + hours);
        }
        else {
            alert("This hour is unavailable for booking");
        }
        
    }

    return(
        <div className = {timeBlockClasses} style={{ height: blockHeight }} onClick={onClickHandler}>
            { props.startHour !== undefined && props.endHour !== undefined ? 
                <div className ={styles['block-hours']}>{`${props.startHour} - ${props.endHour}`}</div>
                : null
            }
            
        </div>
    );
}

export default TimeBlock;