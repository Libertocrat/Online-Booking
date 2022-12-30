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
import InputField from "./WizardForm/InputField.jsx";
import SelectField from "./WizardForm/SelectField.jsx";
import SummaryPage from "./WizardForm/SummaryPage.jsx";

function App(props) {

    const appCtx = useContext(AppContext);

    return(
        <React.Fragment>
            <h1 className={styles['main-header']}>{appCtx.business.name}</h1>
            <h2 className={styles['main-tagline']}>{appCtx.business.tagline}</h2>
            <div className={styles['calendar-button']}>
                <Button icon="event_available" onClickHandler={appCtx.onShowWizard}/>
            </div>

            {/* Booking wizard */}
            <Modal display={appCtx.displayWizard} onClickHandler={appCtx.onHideWizard}>
                <WizardForm
                    title="Booking form"
                    displayWizard={true}
                    csrfToken={appCtx.csrfToken}
                    onHideWizard={appCtx.onHideWizard}
                >
                    <WizardPage pageNum={1} pageName="Service selection" title="Select your service:">
                        <SelectField options={appCtx.services} name="service" default="" icon="verified" onDataChange={appCtx.onServiceChange}/>
                    </WizardPage>
                    <WizardPage pageNum={2} pageName="Time Block selection">
                        <CalendarMonth />
                        <CalendarDay name="timeblock" required={true}/>
                    </WizardPage>
                    <WizardPage pageNum={3} pageName="Enter name" title="What's your name?:">
                        <InputField type="text" name="name" placeholder="Your name" default="" icon="person" validator={/^[a-z]{2,}/i}/>
                    </WizardPage>
                    <WizardPage pageNum={4} pageName="Enter mobile" title="What's your phone number?:">
                        <InputField type="tel" name="phone" placeholder="(XXX) XXX-XXXX" default="" icon="phone_android" validator={/^\(\d{3}\)\s\d{3}-\d{4}$/}/>
                    </WizardPage>
                    <WizardPage pageNum={5} pageName="Summary & Submit" title="Please confirm your request & submit:" submit={true}>
                        <SummaryPage />
                    </WizardPage>
                </WizardForm>
            </Modal>

        </React.Fragment>
    );
}

export default App;