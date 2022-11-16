import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

function Modal(props) {

    // Example of a wrapper component, by using "props.children"
    return(<div className={styles['modal-full']}>
        {props.children} 
    </div>);
}

export default Modal;