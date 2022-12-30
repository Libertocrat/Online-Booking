import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function SummaryPage(props) {

    const formCtx = useContext(WizardFormContext);

    if ( formCtx.isFormReady && formCtx.formData["timeblock"]!="") {

        let timeBlock = formCtx.formData["timeblock"];
        let date = timeBlock.dayDate;

        return(
        <div className={styles['summary-wrap']}>
            <div className={styles['summary-field']}>
                <span className={styles['field-label']}>
                    <span className={`${styles['icon']} material-icons`}>person</span>
                </span>
                <span className={styles['field-value']}>{formCtx.formData["name"]}</span>
            </div>
            <div className={styles['summary-field']}>
                <span className={styles['field-label']}>
                    <span className={`${styles['icon']} material-icons`}>phone</span>
                </span>
                <span className={styles['field-value']}>{formCtx.formData["phone"]}</span>
            </div>
            <div className={styles['summary-field']}>
                <span className={styles['field-label']}>
                    <span className={`${styles['icon']} material-icons`}>verified</span>
                </span>
                <span className={styles['field-value']}>{formCtx.formData["service-label"]}</span>
            </div>
            <div className={styles['summary-field']}>
                <span className={styles['field-label']}>
                    <span className={`${styles['icon']} material-icons`}>event</span>
                </span>
                <span className={styles['field-value']}>{date.month+"/"+date.day+"/"+date.year}</span>
            </div>
            <div className={styles['summary-field']}>
                <span className={styles['field-label']}>
                    <span className={`${styles['icon']} material-icons`}>schedule</span>
                </span>
                <span className={styles['field-value']}>{timeBlock.startHour+" to "+timeBlock.endHour}</span>
            </div>
        </div>);
    }
    else {
        return(<div></div>);
    }

}

export default SummaryPage;