import React, { useState, useEffect, useContext } from "react";
import TimeBlock from "./TimeBlock.jsx";
import styles from "./CalendarDay.module.scss";

import AppContext from "../AppContext.jsx";
import {WizardFormContext} from "../WizardForm/WizardForm.jsx";

function CalendarDay (props) {

    // Get global context variables
    const appCtx = useContext(AppContext);

    // Wizard form context
    const formCtx = useContext(WizardFormContext);

    // CalendarDay states
    const [state, setState] = useState({
        display: appCtx.displayDay,
        dayDate: '',
        weekDay: '',
        monthName: '',
        year: '',
        month: '',
        day: '',
        nextDayUrl: '',
        lastDayUrl: '',
        timeBlocks: []
    });

    /* Effect hook on first render */
    useEffect(() => {

        setState((prevState) => {

            return {...prevState,
                display: appCtx.displayDay
            }
        });

        // Reset timeblock value & validation status on first render
        formCtx.onDataChange(props.name, "");
        formCtx.onFieldValidate(props.name, false);

    }, []);

    // This will run when new day data is passed through props
    useEffect(() => {

       const isNotEmpty = appCtx.showDay.year != '' && appCtx.showDay.month != '' && appCtx.showDay.day != '';
       const isEqual = state.dayDate.year == appCtx.showDay.year && state.dayDate.month == appCtx.showDay.month
                        && state.dayDate.day == appCtx.showDay.day;

        if(isNotEmpty && !isEqual) {

            const dayUrl = `/calendar/${appCtx.showDay.year}/${appCtx.showDay.month}/${appCtx.showDay.day}`;

            if (appCtx.serviceId != "") {
                // Update day from API request url
                requestDay(dayUrl);
            }

            // Reset timeblock value & validation status on day change
            formCtx.onDataChange(props.name, "");
            formCtx.onFieldValidate(props.name, false);
        }

    }, [appCtx.showDay, appCtx.serviceId]);

    // This runs when the selected service changes
    useEffect(() => {

        const isNotEmpty = appCtx.showDay.year != '' && appCtx.showDay.month != '' && appCtx.showDay.day != '';

        if (appCtx.serviceId != "" && isNotEmpty) {

            // Update day from API request url
            const dayUrl = `/calendar/${appCtx.showDay.year}/${appCtx.showDay.month}/${appCtx.showDay.day}`;
            requestDay(dayUrl);
        }

     }, [appCtx.serviceId]);

    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                display: appCtx.displayDay
            }
        });

    }, [appCtx.displayDay]);

    // Set time block default value if Form is reset
    useEffect(() => {

        const defValue = '';

        // If form has been submitted, reset the field value
        if (formCtx.isFormSubmitted) {

            // Reset timeblock value & validation status
            formCtx.onDataChange(props.name, "");
            formCtx.onFieldValidate(props.name, false);
        }

    }, [formCtx.isFormSubmitted]);

    const dayTitle = `${state.weekDay}, ${state.monthName} ${state.day}, ${state.year}`

    function navClickHandler(event) {
        const dayUrl = event.target.getAttribute('aref');

        // Update requested day, from API url
        requestDay(dayUrl);

        // Reset timeblock value & validation status on day change
        formCtx.onDataChange(props.name, "");
        formCtx.onFieldValidate(props.name, false);
    }

    // Display monthly calendar & hide day calendar, after clicking on day title
    function dayTitleClickHandler(event) {

        //Hide day calendar (this component) & show monthly calendar
        appCtx.onDayDisplay(false);
        appCtx.onMonthDisplay(true);
    }

    function timeBlockClickHandler(timeBlockId) {

        // Search for the clicked timeblock by Id
        const timeBlockById = state.timeBlocks.filter((timeBlock) => {return(timeBlock.id === timeBlockId);});

        if (timeBlockById.length > 0 && timeBlockById[0].status ==="active") {

            const selectedTimeBlock = {dayDate: state.dayDate, ...timeBlockById[0]};
            //const timeBlock = {dayDate: selectedTimeBlock.dayDate, startHour: selectedTimeBlock.startHour, endHour: selectedTimeBlock.endHour, serviceId: '1'};

            // Check if a Time Block was already selected
            let currentTimeBlock = {id: ''};
            if (formCtx.formData.hasOwnProperty(props.name) && formCtx.formData[props.name] != "") {
                currentTimeBlock = formCtx.formData[props.name];
            }

            // If time block was already selected, unselected it, otherwise update it in the Form
            if (selectedTimeBlock.id != currentTimeBlock.id) {
                // Lift selected timeblock up into Form Context
                formCtx.onDataChange(props.name, selectedTimeBlock);
                // Lift timeblock validation status up into Form Context
                formCtx.onFieldValidate(props.name, true);
            }
            else {
                // Reset time block
                formCtx.onDataChange(props.name, "");
                // Lift timeblock validation status up into Form Context
                formCtx.onFieldValidate(props.name, false);
            }

        }
    }

    function requestDay(dayUrl) {

        fetch(dayUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': appCtx.csrfToken,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                data: {service_id : appCtx.serviceId},
            })
          }
        )
        .then(response => response.json())
        .then(
            (result) => {

                const calendarDay = result.calendarDay;

                setState( (prevState) => {

                    return {...prevState,
                        dayDate: calendarDay.dayDate,
                        weekDay: calendarDay.weekDay,
                        year: calendarDay.year,
                        month: calendarDay.month,
                        monthName: calendarDay.monthName,
                        day: calendarDay.day,
                        lastDayUrl: calendarDay.lastDayUrl,
                        nextDayUrl: calendarDay.nextDayUrl,
                        timeBlocks: calendarDay.timeBlocks
                    }
                });

                // Notify app that display day changed
                appCtx.onDayChange(calendarDay.dayDate);

            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);
            }
        );
    }

    if (state.display === true) {
        return(
            <div className = {styles['calendar-day']}>

                <div className={styles['nav-bar']}>
                    <div className={styles['nav-btn']}>
                        <span className={`material-icons`} onClick={navClickHandler} aref={state.lastDayUrl}>chevron_left</span>
                    </div>
                    <div className={styles['title']} onClick={dayTitleClickHandler}>{dayTitle}</div>
                    <div className={styles['nav-btn']}>
                        <span className={`material-icons`} onClick={navClickHandler} aref={state.nextDayUrl}>chevron_right</span>
                    </div>
                </div>

                <div className={styles['time-block-wrap']}>
                    {
                        state.timeBlocks.map( (timeBlock, index) => {

                            // Check if current time block is selected
                            let isSelected = false;
                            if ( formCtx.formData.hasOwnProperty(props.name) && formCtx.formData[props.name] != "") {
                                const selTimeBlock = formCtx.formData[props.name];
                                isSelected = selTimeBlock.id === timeBlock.id;
                            }

                            return(
                                <TimeBlock
                                    key={timeBlock.id}
                                    id={timeBlock.id}
                                    dayDate={state.dayDate}
                                    status={timeBlock.status}
                                    relHeight={timeBlock.relHeight}
                                    startHour={timeBlock.startHour}
                                    endHour={timeBlock.endHour}
                                    selected={isSelected}

                                    onTimeBlockClick={timeBlockClickHandler}
                                />);
                            })
                    }
                </div>

            </div>
        );
    }
    else {
        return(<div></div>);
    }

}

export default CalendarDay;