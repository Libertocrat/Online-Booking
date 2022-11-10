import React, { useState, useEffect } from "react";
import TimeBlock from "./TimeBlock.jsx";
import styles from "./CalendarDay.module.scss";

function CalendarDay (props) {

    // CalendarDay states
    const [calDay, setCalDay] = useState({
        display: false,
        weekDay: props.dayData.weekDay,
        year: props.dayData.year,
        month: props.dayData.month,
        day: props.dayData.day,
        timeBlocks: props.dayData.timeBlocks
    });

    //const calendarDay = JSON.parse(document.getElementById('calendar-day').textContent);

    // This will run just at the beginning, when the component renders for the first time
    useEffect(() => {
        // ... code here, what should happens when the component renders for the 1st time
        setCalDay({
            weekDay: props.dayData.weekDay,
            year: props.dayData.year,
            month: props.dayData.month,
            day: props.dayData.day,
            timeBlocks: props.dayData.timeBlocks
        });

    }, []);

    const dayDate = `${calDay.weekDay}, ${calDay.month} ${calDay.day}, ${calDay.year}`

    function navClickHandler(event) {
        const dayUrl = event.target.getAttribute('aref');
        //window.open(dayUrl,"_self");
        alert(dayUrl);
    }

    return(
        <div className = {styles['calendar-day']}>

            <div className={styles['nav-bar']}>
                <div className={styles['nav-btn']}>
                    <span className={`material-icons`} onClick={navClickHandler} aref={props.lastDayUrl}>chevron_left</span>
                </div>
                <div className={styles['title']}>{`${calDay.weekDay}, ${calDay.month} ${calDay.day}, ${calDay.year}`}</div>
                <div className={styles['nav-btn']}>
                    <span className={`material-icons`} onClick={navClickHandler} aref={props.nextDayUrl}>chevron_right</span>
                </div>
            </div>

            <div className={styles['time-block-wrap']}>
                {
                    calDay.timeBlocks.map( (timeBlock, index) => {
                        return(
                            <TimeBlock
                                key={timeBlock.id}  
                                id={timeBlock.id}
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

export default CalendarDay;

/*
<TimeBlock status="inactive" relHeight="1"/>
                <TimeBlock status="blocked" relHeight="2" startHour="8:00am" endHour="10:00am"/>
                <TimeBlock status="active" relHeight="1" startHour="10:00am" endHour="11:00am"/>
                <TimeBlock status="active" relHeight="1" startHour="11:00am" endHour="12:00pm"/>
                <TimeBlock status="active" relHeight="1" startHour="12:00pm" endHour="1:00pm"/>
                <TimeBlock status="blocked" relHeight="1" startHour="1:00pm" endHour="2:00pm"/>
                <TimeBlock status="active" relHeight="2" startHour="2:00pm" endHour="4:00pm"/>
                <TimeBlock status="inactive" relHeight="1"/>
*/