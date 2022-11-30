import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from "./App.module.scss"; //SCSS Modules use example

import AppContext from "./AppContext.jsx";
import CalendarMonth from "./Calendar/CalendarMonth.jsx";
import CalendarDay from "./Calendar/CalendarDay.jsx";
import Modal from "./Modal/Modal.jsx";
import Button from "./Button/Button.jsx";
import WizardForm from "./WizardForm/WizardForm.jsx";
import WizardPage from "./WizardForm/WizardPage.jsx";

function App(props) {

    const appCtx = useContext(AppContext);

    return(
        <React.Fragment>
            <h1 className={styles['main-header']}>Online Booking App</h1>
            <div className={styles['calendar-button']}>
                <Button icon="event_available" onClickHandler={appCtx.onShowWizard}/>
            </div>
            <WizardForm title="Booking form" displayWizard={true} csrfToken={appCtx.csrfToken}>
                <WizardPage pageName="Start"><div>Start</div></WizardPage>
                <WizardPage pageName="Choose day"><div>Page 2</div></WizardPage>
                <WizardPage pageName="Choose time block"><div>Page 3</div></WizardPage>
                <WizardPage pageName="Enter name"><div>Page 4</div></WizardPage>
                <WizardPage pageName="Enter mobile"><div>Page 5</div></WizardPage>
                <WizardPage pageName="Finish"><div>Finish</div></WizardPage>
            </WizardForm>
            <Modal display={appCtx.displayWizard} onClickHandler={appCtx.onHideWizard}>
                <WizardForm title="Booking form" display={true} csrfToken={appCtx.csrfToken}>
                    <CalendarMonth />
                    <CalendarDay />
                </WizardForm>
            </Modal>
            
        </React.Fragment>
    );
}

export default App;