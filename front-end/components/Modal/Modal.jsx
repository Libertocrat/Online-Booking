import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

function Modal(props) {

    const [state, setState] = useState({
        display: props.display
    });


    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                display: props.display}
        });
    }, [props.display]);

    // Component rendering
    return ReactDOM.createPortal(
            <div className={styles['modal-full']} style={state.display ? null : {display: "none"}} >
                <div className={styles['backdrop']} onClick={props.onClickHandler} ></div>
                <div className={styles['modal-contents']} >
                    {props.children}
                </div>
            </div>,
        document.querySelector('.modal-container')
    );

}

export default Modal;