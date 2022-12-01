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
                    <WizardPage pageName="Service selection">
                        <div>Select your service:</div>
                        <SelectField options={services} />
                        
                    </WizardPage>
                    <WizardPage pageName="Time Block selection">
                        <CalendarMonth />
                        <CalendarDay />
                    </WizardPage>
                    <WizardPage pageName="Enter name">
                        <div>What's your name?:</div>
                        <InputField type="text" name="name" placeholder="Your name"  required={true}/>
                    </WizardPage>
                    <WizardPage pageName="Enter mobile">
                        <div>What's your phone number?:</div>
                        <InputField type="tel" name="phone" placeholder="+1 111 111 1111"  required={true}/>
                    </WizardPage>
                    <WizardPage pageName="Summary & Submit"><div>Page 5</div></WizardPage>
                    <WizardPage pageName="Confirmation"><div>Finish</div></WizardPage>
                </WizardForm>
            </Modal>
            
        </React.Fragment>
    );
}

export default App;