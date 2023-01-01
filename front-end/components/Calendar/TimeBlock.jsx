import React, { useEffect, useState, useContext } from "react";
import styles from "./TimeBlock.module.scss";

import GlobalContext from "../AppContext.jsx";

function TimeBlock (props) {

    // Get global context variables
    const globalCtx = useContext(GlobalContext);

    let classNames = `${styles['time-block']} ${styles[props.status]}`;

    if (props.selected) {
        classNames = `${styles['time-block']} ${styles[props.status]} ${styles['selected']}`;
    }

    const [state, setState] = useState({
        status: props.status,
        classNames: classNames,
        height: `${parseInt(props.relHeight) * 50}px`
    });

    useEffect(() => {

        classNames = `${styles['time-block']} ${styles[props.status]}`;

        if (props.selected) {
            classNames = `${styles['time-block']} ${styles[props.status]} ${styles['selected']}`;
        }

        setState((prevState) => {
            return { ...prevState,
                status: props.status,
                classNames: classNames,
                height: `${parseInt(props.relHeight) * 50}px`
            }
        });

    }, [props]);

    useEffect(() => {

        classNames = `${styles['time-block']} ${styles[props.status]}`;

        if (props.selected) {
            classNames = `${styles['time-block']} ${styles[props.status]} ${styles['selected']}`;
        }

        setState((prevState) => {
            return { ...prevState, classNames: `${styles['time-block']} ${styles[state.status]}`}
        });

    }, [state.status]);


    function onClickHandler(event) {

        if (props.status === "active") {
            props.onTimeBlockClick(props.id);
        }
        else {
            alert("This hour is unavailable for booking");
        }

    }

    function requestAppointment(data) {

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
                // success handling

                setState({
                    ...state,
                    status: 'blocked'
                });

            },
            (error) => {
                // error handling
                console.log(error);
            }
        );
    }

    return(
        <div className = {state.classNames}
            style={{ height: state.height }}
            onClick={onClickHandler}
        >
            { props.startHour !== undefined && props.endHour !== undefined ?
                <div className ={styles['block-hours']}>{`${props.startHour} - ${props.endHour}`}</div>
                : null
            }

        </div>
    );
}

export default TimeBlock;