import React, { useState, useEffect, useContext } from "react";
import styles from "./WizardForm.module.scss";

function SelectField(props) {

    return(
        <React.Fragment>
            <select>
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