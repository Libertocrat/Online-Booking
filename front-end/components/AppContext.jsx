import React, {useState, useEffect} from "react";

const AppContext = React.createContext({
    csrfToken: '',
    business: '',
    serviceId: '',
    services: [],
    showMonth: {year: '', month: ''},
    showDay: {year: '', month: '', day: ''},
    displayWizard: false,
    onServiceChange: (serviceId) => {}, // Dummy functions added here, just for better IDE autocompletion
    onDayChange: (dayDate) => {},
    onMonthChange: (monthDate) => {},
    onDayDisplay: (display) => {},
    onMonthDisplay: (display) => {},
    onShowWizard: () => {},
    onHideWizard: () => {}
});

export const AppContextProvider = (props) => {

    // App wide global states
    const [state, setState] = useState({
        csrfToken: '',
        business: '',
        serviceId: '',
        services: [],
        showMonth: {year: '', month: ''},
        displayMonth: true,
        showDay: {year: '', month: '', day: ''},
        displayDay: false,
        displayWizard: false
    });

    useEffect(() => {

        // Get CSRF Token published by the backend
        const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

        // Get initial context from backend
        const pageContext = JSON.parse(document.getElementById('page-context').textContent);
        console.log(pageContext);

        // Set calendar day to today's date & calendar month to current month
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // Month number starts on 0 for January
        let year = today.getFullYear();

        setState((prevState) => {
            return { ...prevState,
                csrfToken: csrfToken,
                business: pageContext.business,
                serviceId: '',
                services: pageContext.services,
                showMonth: {year: year, month: month},
                showDay: {year: year, month: month, day: day}
            }
        });

    }, []);

    // Updates current service Id, when a new one is selected
    const serviceChangeHandler = (serviceId) => {

        setState((prevState) => {
            return { ...prevState,
                serviceId: serviceId
            }
        });

        console.log("New service chosen with id: "+serviceId);
    };

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
        business: state.business,
        displayWizard: state.displayWizard,
        serviceId: state.serviceId,
        services: state.services,
        showDay: state.showDay,
        displayDay: state.displayDay,
        showMonth: state.showMonth,
        displayMonth: state.displayMonth,
        onServiceChange: serviceChangeHandler,
        onDayChange: dayChangeHandler,
        onMonthChange: monthChangeHandler,
        onDayDisplay: dayDisplayHandler,
        onMonthDisplay: monthDisplayHandler,
        onShowWizard: showWizardHandler,
        onHideWizard: hideWizardHandler
    };

    return (
        <AppContext.Provider
            value={context}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;