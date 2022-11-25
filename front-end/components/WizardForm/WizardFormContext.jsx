import React, {useState, useEffect} from "react";

const WizardFormContext = React.createContext({
    csrfToken: '',
    wizardStep: '',
    submitUrl: '',
    onDayChange: (dayDate) => {}, // Dummy functions added here, just for better IDE autocompletion
    onMonthChange: (monthDate) => {},
    onDayDisplay: (display) => {},
    onMonthDisplay: (display) => {},
    onShowWizard: () => {},
    onHideWizard: () => {}
});

export const WizardFormProvider = (props) => {

    // App wide global states
    const [state, setState] = useState({
        csrfToken: '',
        showMonth: {year: '', month: ''},
        displayMonth: true,
        showDay: {year: '', month: '', day: ''},
        displayDay: false,
        displayWizard: false
    });

    useEffect(() => {
        
        // Get initial context from backend
        const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

        // Set calendar day to today's date & calendar month to current month
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // Month number starts on 0 for January
        let year = today.getFullYear(); 

        setState((prevState) => {
            return { ...prevState,
                csrfToken: csrfToken,
                showMonth: {year: year, month: month},
                showDay: {year: year, month: month, day: day}
            }
        });
        
    }, []);

    const dayChangeHandler = (dayDate) => {

        /*
        if (!_.isEqual(state.showDay, dayDate)) {

            setState((prevState) => {
                return { ...prevState,
                    showDay: {year: dayDate.year, month: dayDate.month, day: dayDate.day}
                }
            });
        }
        */

        setState((prevState) => {
            return { ...prevState,
                showDay: {year: dayDate.year, month: dayDate.month, day: dayDate.day}
            }
        });
    };

    const monthChangeHandler = (monthDate) => {

        /*
        if (!_.isEqual(state.showMonth, monthDate)) {

            setState((prevState) => {
                return { ...prevState,
                    showMonth: {year: monthDate.year, month: monthDate.month}
                }
            });
        }
        */

        setState((prevState) => {
            return { ...prevState,
                showMonth: {year: monthDate.year, month: monthDate.month}
            }
        });
    };

    const dayDisplayHandler = (display) => {

        // Show/hide calendar day view
        if (display != state.displayDay) {
            setState((prevState) => {
                return { ...prevState,
                    displayDay: display,
                }
            });
        }
    };

    const monthDisplayHandler = (display) => {

        // Show/hide calendar month view
        if (display != state.displayMonth) {
            setState((prevState) => {
                return { ...prevState,
                    displayMonth: display,
                }
            });
        }
    };

    const showWizardHandler = () => {

        // Show booking wizard
        setState((prevState) => {
            return { ...prevState,
                displayWizard: true
            }
        }); 
    };

    const hideWizardHandler = () => {

        // Show booking wizard
        setState((prevState) => {
            return { ...prevState,
                displayWizard: false
            }
        });
    };

    const context = {
        csrfToken: state.csrfToken,
        displayWizard: state.displayWizard,
        showDay: state.showDay,
        displayDay: state.displayDay,
        showMonth: state.showMonth,
        displayMonth: state.displayMonth,
        onDayChange: dayChangeHandler,
        onMonthChange: monthChangeHandler,
        onDayDisplay: dayDisplayHandler,
        onMonthDisplay: monthDisplayHandler,
        onShowWizard: showWizardHandler,
        onHideWizard: hideWizardHandler
    };

    return (
        <WizardFormContext.Provider
            value={context}
        >
            {props.children}
        </WizardFormContext.Provider>
    );
};

export default WizardFormContext;