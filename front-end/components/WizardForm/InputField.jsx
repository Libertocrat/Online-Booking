import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function InputField(props) {

    // WizardForm context variables
    const formCtx = useContext(WizardFormContext);

    // Default input value. If no default is passed by props, it'll be set to an empty input
    const defInput = props.default != undefined ? props.default : '';
    // REGEX Input validator. Default is any character, accepts empty fields as well
    let validator = props.validator != undefined ? props.validator : /\w*/

    const [state,setState] = useState(
        {
            input: formatInput(defInput),
            defInput: defInput,
            validator: validator,
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

    // Validate field everytime its value changes & lift both up to Form Context
    useEffect(() => {

        // Validate current input value
        const isValid = validateInput(state.input);

        // Lift the validation status up into Form Context, if status changed
        if (state.isValid != isValid) {
            formCtx.onFieldValidate(props.name, isValid);
        }

        // Lift new value up into Form Context
        formCtx.onDataChange(props.name, state.input);

        // Update valid status
        setState((prevState) => {
            return {
            ...prevState,
            isValid: isValid
            };
        });

    }, [state.input]);

    // Set default value if Form is reset
    useEffect(() => {

        // If form has been submitted, reset the field value
        if (formCtx.isFormSubmitted) {
            setState((prevState) => {
                return {
                    ...prevState,
                    input: formatInput(prevState.defInput),
                    isValid: false
                };
            });

            // Lift valid status up as false
            formCtx.onFieldValidate(props.name, false);
        }

    }, [formCtx.isFormSubmitted]);

    function onChangeHandler(event) {

        /*
        // Check if input is valid, by calling props passed function
        const isValid = validateInput(event.target.value);
        // Lift the validation status up into Form Context, if status changed
        if (state.isValid != isValid) {
            formCtx.onFieldValidate(props.name, isValid);
        }

        // Lift new value up into Form Context
        formCtx.onDataChange(props.name, event.target.value);
        */
        setState((prevState) => {
            return {
            ...prevState,
            input: formatInput(event.target.value)
            };
        });

    }

    function formatInput(value) {

        switch (props.type) {
            case "tel":
                return normalizePhone(value);
            default:
                return (value);
        }
    }

    function normalizePhone(value) {
        // return nothing if no value
        if (!value) return value;

        // only allows 0-9 inputs
        const currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;

        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue;

        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

        // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }

    function validateInput(value) {

        const regex = state.validator;
        return regex.test(value);

    }

    return(
        <React.Fragment>
            <div className={styles['field-wrap']}>
                <span className={`${styles['icon']} material-icons`}>{props.icon}</span>
                <input
                    className={styles['input-field']}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={state.input}
                    data-isvalid={state.isValid}
                    onChange={onChangeHandler}/>
            </div>
        </React.Fragment>
    );
}

export default InputField;