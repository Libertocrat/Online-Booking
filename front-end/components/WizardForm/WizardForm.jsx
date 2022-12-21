import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

import Button from "../Button/Button.jsx";

export const WizardFormContext = React.createContext({
    csrfToken: '',
    submitUrl: '',
    displayWizard: '',
    currentPage: '',
    currentContent: '',
    maxPages: '',
    isFieldValid: {},
    isPageValid: [],
    formData: {},
    onDataChange: (name, value) => {},
    onFieldValidate: (fieldName, isValid) => {},
    onPageValidate: (pageNum, isValid) => {},
    onLastPage: () => {},
    onNextPage: () => {},
    onFormSubmit: () => {},
    onSubmitConfirmation: () => {},
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
        currentContent: '',
        maxPages: '',
        isFieldValid: {},
        isPageValid: [],
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
                isPageValid: isPageValid
            }
        });

    }, []);

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
            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);
            }
        );
    }

    const context = {
        csrfToken: state.csrfToken,
        submitUrl: '',
        displayWizard: state.displayWizard,
        currentPage: state.currentPage,
        currentContent: state.currentContent,
        maxPages: state.maxPages,
        isFieldValid: state.isFieldValid,
        isPageValid: state.isPageValid,
        formData: state.formData,
        onDataChange: onDataChangeHandler,
        onFieldValidate: onFieldValidateHandler,
        onPageValidate: onPageValidateHandler,
        onLastPage: onLastPageHandler,
        onNextPage: onNextPageHandler,
        onFormSubmit: onFormSubmitHandler
    };

    return(
        <WizardFormContext.Provider
            value={context}
        >
            <div className={styles['wizard-form']}>
                {/* Each children is a WizardPage, they have their own wrapper */}
                {props.children}
            </div>
        </WizardFormContext.Provider>
    );
}

export default WizardForm;