import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function SelectField(props) {

    const formCtx = useContext(WizardFormContext);

    const [state,setState] = useState(
        {
            value: ''
        }
    );

    function onChangeHandler(event) {

        setState((prevState) => {
            return {
            ...prevState,
            value: event.target.value
            };
        });

        formCtx.onDataChange(props.name, event.target.value);
    }

    return(
        <React.Fragment>
            <select onChange={onChangeHandler} placeholder="Please choose a service">
                {
                    props.options.map((option,i) => {
                        return(<option value={option.value} key={i} >{option.name}</option>);
                    })
                }
            </select>
            <div>{state.value}</div>
        </React.Fragment>
    );
}

export default SelectField;