import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

import SuccessPage from "./SuccessPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Button from "../Button/Button.jsx";

export const WizardFormContext = React.createContext({
    csrfToken: '',
    submitUrl: '',
    displayWizard: '',
    currentPage: '',
    responseStatus: '',
    maxPages: '',
    isFieldValid: {},
    isPageValid: [],
    isFormReady: false,
    formData: {},
    onDataChange: (name, value) => {},
    onFieldValidate: (fieldName, isValid) => {},
    onPageValidate: (pageNum, isValid) => {},
    onLastPage: () => {},
    onNextPage: () => {},
    onFormSubmit: () => {},
    onFormReset: () => {},
    onShowWizard: () => {},
    onHideWizard: () => {}
});

function WizardForm(props) {

    // Wizard states
    const [state, setState] = useState({
        csrfToken: props.csrfToken,
        submitUrl: '',
        displayWizard: '',
        currentPage: '',
        responseStatus: '',
        maxPages: '',
        isFieldValid: {},
        isPageValid: [],
        isFormReady: false,
        formData: {}
    });

    useEffect(() => {

        // Get initial state from props & checking children
        const arrayChildren = React.Children.toArray(props.children);

        let maxPages = arrayChildren.length;
        let currentContent = arrayChildren[0];
        let isPageValid = Array(maxPages).fill(false);

        setState((prevState) => {
            return { ...prevState,
                csrfToken: props.csrfToken,
                submitUrl: props.submitUrl,
                displayWizard: props.displayWizard,
                currentPage: 1,
                currentContent: currentContent,
                maxPages: maxPages,
                isPageValid: isPageValid,
                isFormReady: false
            }
        });

    }, []);

    // Check if form is ready to be submitted
    useEffect(() => {

        // Check if all fields are valid
        const fieldsStatus = Object.values(state.isFieldValid);

        // If all fields are valid, the form is ready to be submitted
        let isFormReady = true;
        if (fieldsStatus.length > 0) {

            fieldsStatus.forEach((fieldStat) => {
                isFormReady = isFormReady && fieldStat;
            });
        }
        else {
            isFormReady = false;
        }

        setState((prevState) => {
            return { ...prevState,
            isFormReady: isFormReady};
        });

    }, [state.isFieldValid]);

    // Updates the value of the attribute with name "key", in the form data object
    const onDataChangeHandler = (key, value) => {

        setState((prevState) => {
            return { ...prevState,
                formData: {...prevState.formData, [key]:value}
            }
        });

        //alert(key +" : "+value);
        console.log("Form Data: " + state.formData);
    }

    const onPageValidateHandler = (pageNum, isValid) => {

        const isPageValid = state.isPageValid;
        isPageValid[pageNum - 1] = isValid;

        setState((prevState) => {
            return { ...prevState,
                isPageValid: isPageValid
            }
        });
    }

    // Updates the validation status for the field with name "fieldName"
    const onFieldValidateHandler = (fieldName, isValid) => {

        setState((prevState) => {
            return { ...prevState,
                isFieldValid: {...prevState.isFieldValid, [fieldName]:isValid}
            }
        });
    }

    const onLastPageHandler = () => {

        if (state.currentPage > 1 ) {

            let newPageNumber = state.currentPage - 1;
            let content = props.children[newPageNumber - 1];

            setState((prevState) => {
                return { ...prevState,
                    currentPage: newPageNumber,
                    currentContent: content
                }
            });

            console.log(props.children[newPageNumber - 1]);
        }
    }

    const onNextPageHandler = () => {

        if (state.currentPage < state.maxPages ) {

            let newPageNumber = state.currentPage + 1;
            let content = props.children[newPageNumber - 1];

            setState((prevState) => {
                return { ...prevState,
                    currentPage: newPageNumber,
                    currentContent: content
                }
            });

            console.log(props.children[newPageNumber - 1]);
        }
    }

    const onFormSubmitHandler = () => {
        //alert(props.dayUrl);
        const postUrl = `/calendar/request_appointment/`;

        fetch(postUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': props.csrfToken,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                data: state.formData,
            })
            }
        )
        .then(response => response.json())
        .then(
            (result) => {
                //handlePostSuccess(result); // success handling
                console.log(result);
                //props.onDayChange(result.calendarDay);
                //const calendarDay = result.calendarDay;


                setState({
                    ...state,
                    status: 'blocked'
                });

                console.log("Reservation request response recieved from API :");
                console.log(result.message);
                console.log(result.body);

                // Display "SUCCESS PAGE" and hide form pages
                setState((prevState) => {
                    return {
                        ...prevState,
                        currentPage: '',
                        responseStatus: 'success'};
                });
            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);

                // Display "ERROR PAGE" and hide form pages
                setState((prevState) => {
                    return {
                        ...prevState,
                        currentPage: '',
                        responseStatus: 'error'};
                });
            }
        );
    }

    // Resets all form fields into their default values, and changes to the 1st page
    // Triggered after closing a response page (Success or Error)
    const onFormResetHandler = () => {

        // Go to page 1 & reset response status
        setState((prevState) => {
            return {
                ...prevState,
                currentPage: 1,
                responseStatus: ''
            };
        });
    }

    const context = {
        csrfToken: state.csrfToken,
        submitUrl: '',
        displayWizard: state.displayWizard,
        currentPage: state.currentPage,
        responseStatus: state.responseStatus,
        maxPages: state.maxPages,
        isFieldValid: state.isFieldValid,
        isPageValid: state.isPageValid,
        isFormReady: state.isFormReady,
        formData: state.formData,
        onDataChange: onDataChangeHandler,
        onFieldValidate: onFieldValidateHandler,
        onPageValidate: onPageValidateHandler,
        onLastPage: onLastPageHandler,
        onNextPage: onNextPageHandler,
        onFormSubmit: onFormSubmitHandler,
        onFormReset: onFormResetHandler,
        onHideWizard: props.onHideWizard
    };

    return(
        <WizardFormContext.Provider
            value={context}
        >
            <div className={styles['wizard-form']}>
                {/* Each children is a WizardPage, they have their own wrapper */}
                {props.children}
                <SuccessPage />
                <ErrorPage />
            </div>
        </WizardFormContext.Provider>
    );
}

export default WizardForm;