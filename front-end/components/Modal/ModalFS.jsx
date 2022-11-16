import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

function ModalFS(props) {

    return(<div className={styles['modal-full']}>
        {props.children}
    </div>);
}

export default ModalFS;