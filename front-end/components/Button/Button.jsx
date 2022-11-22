import React, { useState, useEffect, useContext } from "react";
import styles from "./Button.module.scss";

function Button(props) {

    return(
        <div className={`${styles['button']} material-icons`} onClick={props.onClickHandler}>
            <span>{props.icon}</span>
        </div>
    );
}

export default Button;