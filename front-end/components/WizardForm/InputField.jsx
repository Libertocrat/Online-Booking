import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function InputField(props) {

    const formCtx = useContext(WizardFormContext);

    const [state,setState] = useState(
        {
            input: '',
            isValid: false
        }
    );

    // Initial rendering actions
    useEffect(() => {

        // Set validation to false
        setState((prevState) => {
            return { ...prevState,
                isValid: false
            }
        });

        // Lift initial field validation status into Form Context
        formCtx.onFieldValidate(props.name, false);

    }, []);

    function onChangeHandler(event) {

        // Check if input is valid, by calling props passed function
        const isValid = validateInput(event);
        // Lift the validation status up into Form Context, if status changed
        if (state.isValid != isValid) {
            formCtx.onFieldValidate(props.name, isValid);
        }

        setState((prevState) => {
            return {
            ...prevState,
            input: event.target.value,
            isValid: isValid
            };
        });

        // Lift new value up into Form Context
        formCtx.onDataChange(props.name, event.target.value);
    }

    function validateInput(event) {
        if (event.target.value != "") {
            return true;
        }
        else {
            return false;
        }
    }

    return(
        <React.Fragment>
            <input
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={state.input}
                data-isvalid={state.isValid}
                onChange={onChangeHandler}/>
        </React.Fragment>
    );
}

export default InputField;