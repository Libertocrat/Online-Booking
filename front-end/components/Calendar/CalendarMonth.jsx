import React, { useState, useEffect, useContext } from "react";
import styles from "./CalendarMonth.module.scss"; //SCSS Modules use example

import GlobalContext from "../Context/GlobalContext.jsx";
import CalendarMonthDay from "./CalendarMonthDay.jsx";
//import calendarMonth from "../../backend-test.js";

function CalendarMonth (props) {

    // Get global context variables
    const globalCtx = useContext(GlobalContext);

    const [state, setState] = useState({
        display: false,
        calendarMonth: '',
        csrfToken: globalCtx.csrfToken,
        showMonth: props.showMonth
    });

    // Set initial state after first render
    useEffect(() => {

        setState({
            ...state,
            display: false
        });

    }, []);

    // Re-render when a new month is selected
    useEffect(() => {

        if(props.showMonth.year != '' && props.showMonth.month != '') {
            requestMonth(props.showMonth);
            setState({
                ...state,
                showMonth: props.showMonth
            });
        }

    }, [props.showMonth]);

    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                display: props.displayMonth
            }
        });

    }, [props.displayMonth]);
    

    function loadMonth(event) {
        //const monthUrl = event.target.getAttribute('aref');
        //window.open(monthUrl,"_self");
        const month = event.target.getAttribute('loadmonth');
        const year = event.target.getAttribute('loadyear');
        const monthDate = {year: year, month: month};
        //const monthUrl = event.target.getAttribute('aref');

        props.onMonthChange(monthDate);
        //requestMonth(monthUrl);
        //console.log(monthDate);
        //alert(monthDate.year + "/" + monthDate.month);

        // Pass new month to app
    }

    function requestMonth(monthDate) {
        //alert(props.dayUrl);
        const monthUrl = `/calendar/${monthDate.year}/${monthDate.month}`; // Backend endpoint url: "/calendar/yyyy/mm"

        //console.log("CalendarDay url request: " + dayUrl);

        fetch(monthUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': state.csrfToken,
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

                const calendarMonth = result.calendarMonth;

                setState({
                    ...state,
                    calendarMonth: calendarMonth
                });

                console.log("New CalendarMonth successfully recieved from API :");
                console.log(calendarMonth);
            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);
            }
        );
    }

    /* COMPONENT RENDERING */

    if (state.calendarMonth != '') {

        if (state.display) {
            return (
                <div className={styles['month']}>
        
                    <div className={styles['nav-bar']}>
                        <div className={`${styles['nav-btn']}`}>
                            <span 
                                className={`material-icons`} 
                                onClick={loadMonth} 
                                aref={state.calendarMonth.lastMonthUrl} 
                                loadmonth={state.calendarMonth.lastMonthDate.month}
                                loadyear={state.calendarMonth.lastMonthDate.year}
                            >
                                chevron_left
                            </span>
                        </div>
                        <div className={styles['title']}>{state.calendarMonth.titleMonth} {state.calendarMonth.titleYear}</div>
                        <div className={`${styles['nav-btn']}`}>
                            <span 
                                className={`material-icons`} 
                                onClick={loadMonth} 
                                aref={state.calendarMonth.nextMonthUrl}
                                loadmonth={state.calendarMonth.nextMonthDate.month}
                                loadyear={state.calendarMonth.nextMonthDate.year}
                            >
                                chevron_right
                            </span>
                        </div>
                    </div>
                
                    <div className={styles['week'] + " " + styles['week__labels']} key="week-label">
                    {
                        state.calendarMonth.weekDayLabels.map( dayLabel => {
                            return(<div key={dayLabel}>{dayLabel}</div>);
                        })
                    }
                    </div>
                    
                    {
                        state.calendarMonth.monthDays.map((week, weekNum) => {
                            return(
                                <div className={styles['week']} key={weekNum}>
                                    {
                                        week.map( (monthDay, index) => {
        
                                            let dayDate = {year: monthDay.year, month: monthDay.month, day: monthDay.day};
        
                                            return(
                                                <CalendarMonthDay
                                                    key={monthDay.id}
                                                    csrfToken={state.csrfToken}  
                                                    id={monthDay.id}
                                                    dayUrl={monthDay.dayUrl}
                                                    day={monthDay.day}
                                                    dayDate={dayDate}
                                                    isToday={monthDay.isToday}
                                                    status={monthDay.status}
        
                                                    onDayChange={props.onDayChange}
                                                    onDayDisplay={props.onDayDisplay}
                                                    onMonthDisplay={props.onMonthDisplay}
                                                />);
                                            })
                                    }
                                </div>
                            );
                        })
                    }
                    
                </div>
            );
        }
        else {
            return(<div></div>);
        }
        

    }
    else {
        return(<p className={styles['month']}>Loading...</p>);
    }
    

    /*
    return (
        <div className={styles['month']}>
            <div className={styles['title']}>{props.calendarMonth.titleMonth} {props.calendarMonth.titleYear}</div>
        
                <div className={styles['week'] + " " + styles['week__labels']} key="week-label">
                {
                    props.calendarMonth.weekDayLabels.map( dayLabel => {
                        return(<div key={dayLabel}>{dayLabel}</div>);
                    })
                }
                </div>
                <div className={styles['week']} key="week-01">
                {
                    props.calendarMonth.monthDays[0].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-02">
                {
                    props.calendarMonth.monthDays[1].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-03">
                {
                    props.calendarMonth.monthDays[2].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-04">
                {
                    props.calendarMonth.monthDays[3].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id}  
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
                <div className={styles['week']} key="week-05">
                {
                    props.calendarMonth.monthDays[4].map( (monthDay, index) => {
                        return(
                            <CalendarDay
                                key={monthDay.id} 
                                id={monthDay.id}
                                day={monthDay.day} 
                                status={monthDay.status}
                            />);
                    })
                }
                </div>
            
        </div>
        
    );
    */
}

export default CalendarMonth;