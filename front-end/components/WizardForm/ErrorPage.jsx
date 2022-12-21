import React, {useContext} from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function ErrorPage(props) {

    const formCtx = useContext(WizardFormContext);

    function onCloseHandler(event) {

        // Close Wizard
        formCtx.onHideWizard();
        // Reset Form Wizard
        formCtx.onFormReset();
    }

    let isPageOn = formCtx.responseStatus === "error";

    return(<div className={styles['response-page']} style={isPageOn ? null : {display: "none"}}>
        <div className={styles['title']}>An Error Occurred</div>
        <div className={`${styles['error-icon']} material-icons`}><span>error</span></div>
        <div className={styles['message']}>Your request wasn't successfully received.<br />Please try again in a few moments.</div>
        <div className={styles['nav-buttons']}>
            <button type="button" onClick={onCloseHandler}>OK</button>
        </div>
    </div>);
}

export default ErrorPage;