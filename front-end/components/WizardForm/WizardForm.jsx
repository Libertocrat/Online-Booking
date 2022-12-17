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
    formData: {},
    onDataChange: (name, value) => {},
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
        formData: {}
    });

    useEffect(() => {

        // Get initial state from props & checking children
        const arrayChildren = React.Children.toArray(props.children);

        let maxPages = arrayChildren.length;
        let currentContent = arrayChildren[0];

        setState((prevState) => {
            return { ...prevState,
                csrfToken: props.csrfToken,
                submitUrl: props.submitUrl,
                displayWizard: props.displayWizard,
                currentPage: 1,
                currentContent: currentContent,
                maxPages: maxPages
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
        formData: state.formData,
        onDataChange: onDataChangeHandler,
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