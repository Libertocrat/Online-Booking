import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

function InputField(props) {

    return(
        <React.Fragment>
            <input type={props.type} name={props.name}  placeholder={props.placeholder} />
        </React.Fragment>
    );
}

export default InputField;