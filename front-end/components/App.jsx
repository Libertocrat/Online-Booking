import React, { useState } from "react";
import styles from "./App.module.scss"; //SCSS Modules use example

function App(props) {

    return(
        <React.StrictMode>
            <h1 className={styles['main-header']}>Hello Django, React & Sass!</h1>
        </React.StrictMode>
    );
}

export default App;