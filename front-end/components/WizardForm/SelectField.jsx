import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function SelectField(props) {

    const formCtx = useContext(WizardFormContext);
    // Default selected value. If no default is passed by props, it'll be set to an empty value
    const defValue = props.default != undefined ? props.default : '';

    const [state,setState] = useState(
        {
            value: defValue,
            defValue: defValue,
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

    // Set selector default value if Form is reset
    useEffect(() => {

        const defValue = state.defValue;

        // Get default label
        let defLabel = "";
        const labels = props.options.filter((option) => {return(option.value === defValue);});
        if (labels.length >0) {
            defLabel = labels[0].name;
        }


        // If form has been submitted, reset the field value
        if (formCtx.isFormSubmitted) {

            // Update state with default values
            setState((prevState) => {
                return {
                    ...prevState,
                    value: defValue,
                    isValid: false
                };
            });

            // Reset timeblock value & validation status
            formCtx.onDataChange(props.name+"-value", defValue);
            formCtx.onDataChange(props.name+"-label", defLabel);
            formCtx.onFieldValidate(props.name, false);
        }

    }, [formCtx.isFormSubmitted]);

    function onChangeHandler(event) {

        // Validate field
        const isValid = validateSelect(event);

        // Lift the validation status up into Form Context, if status changed
        if (state.isValid != isValid) {
            formCtx.onFieldValidate(props.name, isValid);
        }

        setState((prevState) => {

            return {
            ...prevState,
            value: event.target.value,
            isValid: isValid
            };
        });

        // Lift the new value up into Form Context
        formCtx.onDataChange(props.name+"-value", event.target.value);
        // Lift the new value up into Form Context
        const optionLabel = event.target.options[event.target.selectedIndex].text;
        formCtx.onDataChange(props.name+"-label", optionLabel);

        // Lift the new value up into App Context
        props.onDataChange(event.target.value);
    }

    function validateSelect(event) {
        if (event.target.value != "") {
            return true;
        }
        else {
            return false;
        }
    }

    return(
        <React.Fragment>
            <div className={styles['field-wrap']}>
                <span className={`${styles['icon']} material-icons`}>{props.icon}</span>
                <select className={styles['select-field']} value={state.value} onChange={onChangeHandler} placeholder="Please choose a service" data-isvalid={state.isValid}>
                    {
                        props.options.map((option,i) => {
                            return(<option value={option.value} key={i} >{option.name}</option>);
                        })
                    }
                </select>
            </div>
        </React.Fragment>
    );
}

export default SelectField;