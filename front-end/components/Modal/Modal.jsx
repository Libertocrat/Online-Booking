import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

function Modal(props) {

    const [state, setState] = useState({
        display: props.display
    });

    function onClickHandler(event) {

        setState((prevState) => {
            return {...prevState,
                display: false
            }
        });
    }

    // Example of a wrapper component, by using "props.children"
    if (state.display) {
        return(
        <div className={styles['modal-full']}>
            <div className={styles['backdrop']} onClick={onClickHandler}></div>
            <div className={styles['modal-contents']}>
                {props.children} 
            </div>
        </div>);
    }
    else {
        return(<div></div>);
    }
}

export default Modal;