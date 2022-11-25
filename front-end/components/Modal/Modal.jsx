import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

function Modal(props) {

    const [state, setState] = useState({
        display: props.display
    });

    /*
    function onClickHandler(event) {

        setState((prevState) => {
            return {...prevState,
                display: false
            }
        });
    }
    */

    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                display: props.display}
        });
    }, [props.display]);

    // Example of a wrapper component, by using "props.children"
    if (state.display) {
    return ReactDOM.createPortal(
            <div className={styles['modal-full']}>
            <div className={styles['backdrop']} onClick={props.onClickHandler}></div>
            <div className={styles['modal-contents']}>
                {props.children} 
            </div>
        </div>, 
        document.querySelector('.modal-container')
    );
    }
    else {
        return (null);
    }
    /*
    if (state.display) {
        return(
        <div className={styles['modal-full']}>
            <div className={styles['backdrop']} onClick={props.onClickHandler}></div>
            <div className={styles['modal-contents']}>
                {props.children} 
            </div>
        </div>);
    }
    else {
        return(<div></div>);
    }
    */
}

export default Modal;