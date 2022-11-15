import React, { useState, useEffect } from "react";
import TimeBlock from "./TimeBlock.jsx";
import styles from "./CalendarDay.module.scss";

function CalendarDay (props) {

    // CalendarDay states
    const [state, setState] = useState({
        display: false,
        weekDay: '',
        monthName: '',
        year: '',
        month: '',
        day: '',
        timeBlocks: []
    });

    /* Effect hook on first render */
    useEffect(() => {
        // ... code here, what should happens when the component renders for the 1st time
        /*
        setState({
            ...state,
            weekDay: props.calendarDay.weekDay,
            year: props.calendarDay.year,
            monthName: props.calendarDay.month,
            day: props.calendarDay.day,
            timeBlocks: props.calendarDay.timeBlocks
        });
        */
        setState({
            ...state,
            display: false
        });
        /*
        console.log("First render day: ");
        console.log(props.showDay);
        */
        //loadDay(props.showDay);

    }, []);
    
    // This will run when new day data is passed through props
    useEffect(() => {
        
        /*
        setState({
            ...state,
            weekDay: props.calendarDay.weekDay,
            year: props.calendarDay.year,
            monthName: props.calendarDay.month,
            day: props.calendarDay.day,
            timeBlocks: props.calendarDay.timeBlocks
        });
        */
        if(props.showDay.year != '' && props.showDay.month != '' && props.showDay.day != '') {
            requestDay(props.showDay);
        }

    }, [props.showDay]);
    
    const dayTitle = `${state.weekDay}, ${state.monthName} ${state.day}, ${state.year}`

    function navClickHandler(event) {
        const dayUrl = event.target.getAttribute('aref');
        //window.open(dayUrl,"_self");
        alert(dayUrl);
    }

    function requestDay(dayDate) {
        //alert(props.dayUrl);
        const dayUrl = `/calendar/${dayDate.year}/${dayDate.month}/${dayDate.day}`; // Backend endpoint url: "/calendar/yyyy/mm/dd"

        console.log("CalendarDay url request: " + dayUrl);

        fetch(dayUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': props.csrfToken,
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

                setState({
                    ...state,
                    weekDay: calendarDay.weekDay,
                    year: calendarDay.year,
                    month: calendarDay.month,
                    monthName: calendarDay.monthName,
                    day: calendarDay.day,
                    timeBlocks: calendarDay.timeBlocks
                });

                console.log("New CalendarDay successfully recieved from API :");
                console.log(dayDate);
                console.log(calendarDay);
            },
            (error) => {
                //handlePostError(error);  // error handling
                console.log(error);
            }
        );
    }

    return(
        <div className = {styles['calendar-day']}>

            <div className={styles['nav-bar']}>
                <div className={styles['nav-btn']}>
                    <span className={`material-icons`} onClick={navClickHandler} aref={props.lastDayUrl}>chevron_left</span>
                </div>
                <div className={styles['title']}>{dayTitle}</div>
                <div className={styles['nav-btn']}>
                    <span className={`material-icons`} onClick={navClickHandler} aref={props.nextDayUrl}>chevron_right</span>
                </div>
            </div>

            <div className={styles['time-block-wrap']}>
                {
                    state.timeBlocks.map( (timeBlock, index) => {
                        return(
                            <TimeBlock
                                key={timeBlock.id}  
                                id={timeBlock.id}
                                csrfToken={props.csrfToken}
                                status={timeBlock.status} 
                                relHeight={timeBlock.relHeight}
                                dayDate={props.showDay}
                                startHour={timeBlock.startHour}
                                endHour={timeBlock.endHour}
                            />);
                        })
                }
            </div>
            
        </div>
    );
}

export default CalendarDay;