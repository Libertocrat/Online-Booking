import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from "./App.module.scss"; //SCSS Modules use example

import GlobalContext, {GlobalContextProvider} from "./Context/GlobalContext.jsx";
import CalendarMonth from "./Calendar/CalendarMonth.jsx";
import CalendarDay from "./Calendar/CalendarDay.jsx";
import Modal from "./Modal/Modal.jsx";
import Button from "./Button/Button.jsx";

function App(props) {

    const globalCtx = useContext(GlobalContext);

    return(
        <React.Fragment>
            <h1 className={styles['main-header']}>Online Booking App</h1>
            <div className={styles['calendar-button']}>
                <Button icon="event_available" onClickHandler={globalCtx.onShowWizard}/>
            </div>
            <Modal display={globalCtx.displayWizard} onClickHandler={globalCtx.onHideWizard}>
                <CalendarMonth />
                <CalendarDay />
            </Modal>
        </React.Fragment>
    );
}

export default App;