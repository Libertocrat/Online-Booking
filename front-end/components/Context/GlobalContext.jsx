import React, {useState} from "react";

const GlobalContext = React.createContext({
    csrfToken: '',
    showMonth: {year: '', month: ''},
    showDay: {year: '', month: '', day: ''},
    onDayChange: (dayDate) => {}, // Dummy functions added here, just for better IDE autocompletion
    onMonthChange: (monthDate) => {}
});

export const GlobalContextProvider = (props) => {

    // Get initial context from backend
    const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    const [state, setState] = useState({
        csrfToken: csrfToken,
        showMonth: {year: '', month: ''},
        displayMonth: true,
        showDay: {year: '', month: '', day: ''},
        displayDay: false
    });

    function dayChangeHandler(dayDate) {

        if (!_.isEqual(state.showDay, dayDate)) {

            setState((prevState) => {
                return { ...prevState,
                    showDay: {year: dayDate.year, month: dayDate.month, day: dayDate.day}
                }
            });
        }
    }

    function monthChangeHandler(monthDate) {

        if (!_.isEqual(state.showMonth, monthDate)) {

            setState((prevState) => {
                return { ...prevState,
                    showMonth: {year: monthDate.year, month: monthDate.month}
                }
            });
        }
    }

    function dayDisplayHandler(display) {

        // Show/hide calendar day view
        if (display != state.displayDay) {
            setState((prevState) => {
                return { ...prevState,
                    displayDay: display,
                }
            });
        }
    }

    function monthDisplayHandler(display) {

        // Show/hide calendar month view
        if (display != state.displayMonth) {
            setState((prevState) => {
                return { ...prevState,
                    displayMonth: display,
                }
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                csrfToken: state.csrfToken,
                showDay: state.showDay,
                displayDay: state.displayDay,
                showMonth: state.showMonth,
                displayMonth: state.displayMonth,
                onDayChange: dayChangeHandler,
                onMonthChange: monthChangeHandler,
                onDayDisplay: dayDisplayHandler,
                onMonthDisplay: monthDisplayHandler
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;