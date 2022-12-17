import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

import {WizardFormContext} from "./WizardForm.jsx";

function WizardPage(props) {

    const formCtx = useContext(WizardFormContext);

    let isPageOn = props.pageNum === formCtx.currentPage;

    return (
        <React.Fragment >
            <div className={styles['form-page']} style={isPageOn ? null : {display: "none"}}>
                <div className={styles['page-title']} > {props.title} </div>
                {props.children}
                <div className={styles['nav-buttons']}>
                    <button onClick={formCtx.onLastPage}>Last</button>
                    { !props.submit ?
                        <button onClick={formCtx.onNextPage}>Next</button> :
                        <button onClick={formCtx.onFormSubmit}>Submit</button>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default WizardPage;