import React, { useState } from "react";
import styles from "./CalendarMonth.module.scss"; //SCSS Modules use example

import CalendarDay from "./CalendarDay.jsx";
//import calendarMonth from "../../backend-test.js";

function CalendarMonth (props) {

    const calendarMonth = JSON.parse(document.getElementById('calendar-month').textContent);

    /*
    console.log(calendarMonth.currentDate);
    console.log(calendarMonth.monthDays[15].date);
    console.log(calendarMonth.monthDays[15].weekDay);
    console.log(calendarMonth.monthDays[15].status);
    */

    return (
        <div className={styles['month']}>
            <div className={styles['title']}>{calendarMonth.titleMonth} {calendarMonth.titleYear}</div>
        
                <div className={styles['week'] + " " + styles['week__labels']} key="week-label">
                {
                    calendarMonth.weekDayLabels.map( dayLabel => {
                        return(<div key={dayLabel}>{dayLabel}</div>);
                    })
                }
                </div>
                
                {
                    calendarMonth.monthDays.map((week, weekNum) => {
                        return(
                            <div className={styles['week']} key={weekNum}>
                                {
                                    week.map( (monthDay, index) => {
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
                        );
                    })
                }
            
        </div>
        
    );

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