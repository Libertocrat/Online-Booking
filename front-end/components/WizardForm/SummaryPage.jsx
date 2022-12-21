import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function SummaryPage(props) {

    const formCtx = useContext(WizardFormContext);

    if ( formCtx.isFormReady ) {

        let timeBlock = formCtx.formData["timeblock"];
        let date = timeBlock.dayDate;

        return(<div className={styles['summary-wrap']}>
        <div className={styles['summary-field']}>
            <span className={styles['field-label']}>Name: </span>
            <span className={styles['field-value']}>{formCtx.formData["name"]}</span>
        </div>
        <div className={styles['summary-field']}>
            <span className={styles['field-label']}>Phone: </span>
            <span className={styles['field-value']}>{formCtx.formData["phone"]}</span>
        </div>
        <div className={styles['summary-field']}>
            <span className={styles['field-label']}>Service: </span>
            <span className={styles['field-value']}>{formCtx.formData["service-label"]}</span>
        </div>
        <div className={styles['summary-field']}>
            <span className={styles['field-label']}>Date: </span>
            <span className={styles['field-value']}>{date.month+"/"+date.day+"/"+date.year}</span>
        </div>
        <div className={styles['summary-field']}>
            <span className={styles['field-label']}>Hour: </span>
            <span className={styles['field-value']}>{timeBlock.startHour+" to "+timeBlock.endHour}</span>
        </div>
    </div>);
    }
    else {
        return(<div></div>);
    }

}

export default SummaryPage;