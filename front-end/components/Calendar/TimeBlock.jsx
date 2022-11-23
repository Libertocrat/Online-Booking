import React, { useEffect, useState, useContext } from "react";
import styles from "./TimeBlock.module.scss";

import GlobalContext from "../AppContext.jsx";

function TimeBlock (props) {

    // Get global context variables
    const globalCtx = useContext(GlobalContext);

    const [state, setState] = useState({
        status: props.status,
        classNames: `${styles['time-block']} ${styles[props.status]}`,
        height: `${parseInt(props.relHeight) * 50}px`
    });

    useEffect(() => {
        /*
        setState({
            ...state,
            status: props.status,
            classNames: `${styles['time-block']} ${styles[props.status]}`,
            height: `${parseInt(props.relHeight) * 50}px`
        });
        */
        setState((prevState) => {
            return { ...prevState,
                status: props.status,
                classNames: `${styles['time-block']} ${styles[props.status]}`,
                height: `${parseInt(props.relHeight) * 50}px`
            }
        });

    }, [props]);

    useEffect(() => {

        /*
        setState({
            ...state,
            classNames: `${styles['time-block']} ${styles[state.status]}`
        });
        */

        setState((prevState) => {
            return { ...prevState, classNames: `${styles['time-block']} ${styles[state.status]}`}
        });

    }, [state.status]);
    //const timeBlockClasses = `${styles['time-block']} ${styles[props.status]}`;
    //const blockHeight = `${parseInt(props.relHeight) * 50}px`;
    //console.log(blockHeight);

    function onClickHandler(event) {

        if (props.status === "active") {
            const hours = `${props.startHour} - ${props.endHour}`;
            //alert("Available for booking: " + hours);

            // Send booking request to server (TEST for now)
            const data = {dayDate: props.dayDate, startHour: props.startHour, endHour: props.endHour, serviceId: '1'};
            requestAppointment(data);

        }
        else {
            alert("This hour is unavailable for booking");
        }
        
    }

    function requestAppointment(data) {
        //alert(props.dayUrl);
        const postUrl = `/calendar/request_appointment/`;

        fetch(postUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': globalCtx.csrfToken,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                data: data,
            })
            }
        )
        .then(response => response.json())
        .then(
            (result) => {
                //handlePostSuccess(result); // success handling
                console.log(result);
                //props.onDayChange(result.calendarDay);
                //const calendarDay = result.calendarDay;

                
                setState({
                    ...state,
                    status: 'blocked'
                });
                
                console.log("Reservation request response recieved from API :");
                console.log(result.message);
                console.log(result.body);
            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);
            }
        );
    }

    return(
        <div className = {state.classNames} 
            style={{ height: state.height }} 
            onClick={onClickHandler}>
            { props.startHour !== undefined && props.endHour !== undefined ? 
                <div className ={styles['block-hours']}>{`${props.startHour} - ${props.endHour}`}</div>
                : null
            }
            
        </div>
    );
}

export default TimeBlock;