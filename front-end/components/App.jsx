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

function App(props) {

    const appCtx = useContext(AppContext);

    // Added for test purposes. Services' list must be provided by backend server as initial app context
    const services =[
        {name:"--Please choose a service--", value: ''},
        {name:"Hair Cut with Blow Dry", value: 0},
        {name:"Mens Hair Cut", value: 1},
        {name:"Formal Hair Design", value: 2},
        {name:"Basic Tint", value: 3},
        {name:"Conditioning Treatment", value: 4}
    ];

    return(
        <React.Fragment>
            <h1 className={styles['main-header']}>Online Booking App</h1>
            <div className={styles['calendar-button']}>
                <Button icon="event_available" onClickHandler={appCtx.onShowWizard}/>
            </div>

            {/* Booking wizard */}
            <Modal display={appCtx.displayWizard} onClickHandler={appCtx.onHideWizard}>
                <WizardForm title="Booking form" displayWizard={true} csrfToken={appCtx.csrfToken}>
                    <WizardPage pageNum={1} pageName="Service selection" title="Select your service:">
                        <SelectField options={services} name="service" required={true} onDataChange={appCtx.onServiceChange}/>
                    </WizardPage>
                    <WizardPage pageNum={2} pageName="Time Block selection">
                        <CalendarMonth />
                        <CalendarDay name="timeblock"/>
                    </WizardPage>
                    <WizardPage pageNum={3} pageName="Enter name" title="What's your name?:">
                        <InputField type="text" name="name" placeholder="Your name"  required={true}/>
                    </WizardPage>
                    <WizardPage pageNum={4} pageName="Enter mobile" title="What's your phone number?:">
                        <InputField type="tel" name="phone" placeholder="+1 111 111 1111"  required={true}/>
                    </WizardPage>
                    <WizardPage pageNum={5} pageName="Summary & Submit" title="Summary & Submit" submit={true}></WizardPage>
                    <WizardPage pageNum={6} pageName="Confirmation" title="Confirmation" ></WizardPage>
                </WizardForm>
            </Modal>

        </React.Fragment>
    );
}

export default App;