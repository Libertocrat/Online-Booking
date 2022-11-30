import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

import {WizardFormContext} from "./WizardForm.jsx";

function WizardPage(props) {

    const formCtx = useContext(WizardFormContext);

    return (
        <React.Fragment>
            {props.children}
            <div className={styles['nav-buttons']}>
                <button onClick={formCtx.onLastPage}>Last</button>
                <button onClick={formCtx.onNextPage}>Next</button>
            </div>
        </React.Fragment>
    );
}

export default WizardPage;