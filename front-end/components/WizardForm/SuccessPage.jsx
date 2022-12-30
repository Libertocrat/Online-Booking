import React, {useState, useEffect, useContext} from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function SuccessPage(props) {

    const formCtx = useContext(WizardFormContext);

    function onCloseHandler(event) {

        // Close Wizard
        formCtx.onHideWizard();
        // Reset Form Wizard
        formCtx.onFormReset();
    }

    let isPageOn = formCtx.responseStatus === "success";

    return(
    <div className={styles['response-page']} style={isPageOn ? null : {display: "none"}}>
        <div className={styles['title']}>Request received!</div>
        <div className={`${styles['success-icon']} material-icons`}><span>check_circle</span></div>
        <div className={styles['message']}>{props.message}</div>
        <div className={styles['nav-buttons']}>
            <button type="button" onClick={onCloseHandler}>OK</button>
        </div>
    </div>);
}

export default SuccessPage;