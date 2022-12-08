import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

function InputField(props) {

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
    }

    return(
        <React.Fragment>
            <input 
                type={props.type} 
                name={props.name}  
                placeholder={props.placeholder} 
                value={state.input}
                onChange={onChangeHandler}/>
            <p>{state.input}</p>
        </React.Fragment>
    );
}

export default InputField;