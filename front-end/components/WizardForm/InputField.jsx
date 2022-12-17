import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function InputField(props) {

    const formCtx = useContext(WizardFormContext);

    const [state,setState] = useState(
        {
            input: ''
        }
    );

    function onChangeHandler(event) {

        setState((prevState) => {
            return {
            ...prevState,
            input: event.target.value
            };
        });

        formCtx.onDataChange(props.name, event.target.value);
    }

    return(
        <React.Fragment>
            <input
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={state.input}
                onChange={onChangeHandler}/>
        </React.Fragment>
    );
}

export default InputField;