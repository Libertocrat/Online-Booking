import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

import {WizardFormContext} from "./WizardForm.jsx";

function WizardPage(props) {

    const formCtx = useContext(WizardFormContext);

    const [state, setState] = useState({
        isValid: false
    });

    // Initial rendering state
    useEffect(() => {

        setState({...state,
                isValid: false
            });

    }, []);

    // Update page validation if Wizard displays another page or if a field validation status changes
    useEffect(() => {

        // Page validation
        const isValid = pageValidate();

        // Lift the page validation state to context
        formCtx.onPageValidate(props.pageNum, isValid);

        // Update local validation status
        setState((prevState) => {
            return {...prevState,
                isValid: isValid
            }
        });

    }, [formCtx.currentPage, formCtx.isFieldValid]);

    function pageValidate() {

        let isPageValid = true;
        const arrayChildren = React.Children.toArray(props.children);

        for (const child of arrayChildren) {

            if (child.props.name) {

                let isFieldValid = formCtx.isFieldValid[child.props.name];
                if (isFieldValid != true) {
                    return (false);
                }
            }
        }

        return isPageValid;
    }

    let isPageOn = props.pageNum === formCtx.currentPage;
    let isLastOn = props.pageNum != 1;

    let leftButton =   isLastOn ? <button type="button" onClick={formCtx.onLastPage}>Last</button> : null;
    let rightButton =  !props.submit ?
        <button type="button" disabled={!state.isValid} onClick={formCtx.onNextPage}>Next</button> :
        <button type="button" disabled={!formCtx.isFormReady} onClick={formCtx.onFormSubmit}>Submit</button>;

    return (
        <React.Fragment >
            <div className={styles['form-page']} style={isPageOn ? null : {display: "none"}}>
                <div className={styles['page-title']} > {props.title} </div>
                {props.children}
                <div className={styles['nav-buttons']}>
                    {leftButton}
                    {rightButton}
                </div>
            </div>
        </React.Fragment>
    );
}

export default WizardPage;