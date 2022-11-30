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
        csrfToken: '',
        submitUrl: '',
        displayWizard: '',
        currentPage: '',
        currentContent: '',
        maxPages: ''
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

    const context = {
        csrfToken: state.csrfToken,
        submitUrl: '',
        displayWizard: state.displayWizard,
        currentPage: state.currentPage,
        currentContent: state.currentContent,
        maxPages: state.maxPages,
        onLastPage: onLastPageHandler,
        onNextPage: onNextPageHandler
    };

    return(
        <WizardFormContext.Provider
            value={context}
        >
            <div className={styles['wizard-form']}>
                <div className={styles['header']}>{props.title}</div>
                <div className={styles['form-pages']}>
                    {state.currentContent} 
                </div>
                { /*
                <div className={styles['nav-butons']}>
                    <button onClick={onLastPageHandler}>Last</button>
                    <button onClick={onNextPageHandler}>Next</button>
                </div>
                */
                }
            </div>
        </WizardFormContext.Provider>
    );
}

export default WizardForm;