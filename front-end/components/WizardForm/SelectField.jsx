import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";
import {WizardFormContext} from "./WizardForm.jsx";

function SelectField(props) {

    const formCtx = useContext(WizardFormContext);

    const [state,setState] = useState(
        {
            value: '',
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
        formCtx.onDataChange(props.name, event.target.value);

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
            <select onChange={onChangeHandler} placeholder="Please choose a service" data-isvalid={state.isValid}>
                {
                    props.options.map((option,i) => {
                        return(<option value={option.value} key={i} >{option.name}</option>);
                    })
                }
            </select>
        </React.Fragment>
    );
}

export default SelectField;