import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

import Button from "../Button/Button.jsx";

function WizardForm(props) {

    return(
        <div className={styles['wizard-form']}>
            <div className={styles['header']}>{props.title}</div>
            <div className={styles['form-pages']}>
                {props.children} 
            </div>
            <div className={styles['nav-bottom-bar']}>
                <Button>Back</Button>
                <Button>Next</Button>
            </div>
        </div>
    );
}

export default WizardForm;