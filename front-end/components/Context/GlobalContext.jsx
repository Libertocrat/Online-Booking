import React, {useState} from "react";

const GlobalContext = React.createContext({
    csrfToken: '',
    showMonth: {year: '', month: ''},
    showDay: {year: '', month: '', day: ''},
    displayWizard: false,
    onDayChange: (dayDate) => {}, // Dummy functions added here, just for better IDE autocompletion
    onMonthChange: (monthDate) => {},
    onDayDisplay: (display) => {},
    onMonthDisplay: (display) => {},
    showWizard: () => {},
    hideWizard: () => {}
});

export const GlobalContextProvider = (props) => {

    // Get initial context from backend
    const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    const [state, setState] = useState({
        csrfToken: csrfToken,
        showMonth: {year: '', month: ''},
        displayMonth: true,
        showDay: {year: '', month: '', day: ''},
        displayDay: false,
        displayWizard: false
    });

    const dayChangeHandler = (dayDate) => {

        if (!_.isEqual(state.showDay, dayDate)) {

            setState((prevState) => {
                return { ...prevState,
                    showDay: {year: dayDate.year, month: dayDate.month, day: dayDate.day}
                }
            });
        }
    };

    const monthChangeHandler = (monthDate) => {

        if (!_.isEqual(state.showMonth, monthDate)) {

            setState((prevState) => {
                return { ...prevState,
                    showMonth: {year: monthDate.year, month: monthDate.month}
                }
            });
        }
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

    const showWizard = () => {

        // Show booking wizard
        setState((prevState) => {
            return { ...prevState,
                displayWizard: true
            }
        }); 
    };

    const hideWizard = () => {

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
        showWizard: showWizard,
        hideWizard: hideWizard
    };

    return (
        <GlobalContext.Provider
            value={context}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;