import React, { useState, useEffect, useContext } from "react";
import TimeBlock from "./TimeBlock.jsx";
import styles from "./CalendarDay.module.scss";

import AppContext from "../AppContext.jsx";

function CalendarDay (props) {

    // Get global context variables
    const appCtx = useContext(AppContext);

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
        //loadDay(props.showDay);

    }, []);
    
    // This will run when new day data is passed through props
    useEffect(() => {

       const isNotEmpty = appCtx.showDay.year != '' && appCtx.showDay.month != '' && appCtx.showDay.day != '';
       const isEqual = state.dayDate.year == appCtx.showDay.year && state.dayDate.month == appCtx.showDay.month 
                        && state.dayDate.day == appCtx.showDay.day;

        if(isNotEmpty && !isEqual) {

            const dayUrl = `/calendar/${appCtx.showDay.year}/${appCtx.showDay.month}/${appCtx.showDay.day}`;
            // Update day from API request url
            requestDay(dayUrl);
        }

    }, [appCtx.showDay]);

    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                display: appCtx.displayDay
            }
        });
        
        console.log("Display changed: " + state.display + ". Global ctx display: " + appCtx.displayDay);

    }, [appCtx.displayDay]);
    
    const dayTitle = `${state.weekDay}, ${state.monthName} ${state.day}, ${state.year}`

    function navClickHandler(event) {
        const dayUrl = event.target.getAttribute('aref');

        // Update requested day, from API url
        requestDay(dayUrl);
    }

    // Display monthly calendar & hide day calendar, after clicking on day title
    function dayTitleClickHandler(event) {

        //Hide day calendar (this component) & show monthly calendar
        appCtx.onDayDisplay(false);
        appCtx.onMonthDisplay(true);
    }

    function requestDay(dayUrl) {
        //alert(props.dayUrl);
        //const dayUrl = `/calendar/${dayDate.year}/${dayDate.month}/${dayDate.day}`; // Backend endpoint url: "/calendar/yyyy/mm/dd"

        console.log("CalendarDay url request: " + dayUrl);

        fetch(dayUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': appCtx.csrfToken,
                'Content-Type': 'application/json'
              }/*,
            body: JSON.stringify({
                data: data,
            })*/
          }
        )
        .then(response => response.json())
        .then(
            (result) => {
                //handlePostSuccess(result); // success handling
                console.log(result);
                //props.onDayChange(result.calendarDay);
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

                console.log("New CalendarDay successfully recieved from API :");
                console.log(calendarDay);
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
                            return(
                                <TimeBlock
                                    key={timeBlock.id}  
                                    id={timeBlock.id}
                                    dayDate={state.dayDate}
                                    status={timeBlock.status} 
                                    relHeight={timeBlock.relHeight}
                                    startHour={timeBlock.startHour}
                                    endHour={timeBlock.endHour}  
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