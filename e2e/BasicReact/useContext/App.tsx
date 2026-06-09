import React from "react";
import {ThemeProvider} from "./ThemeContext";

const App = () =>{
    return(
        <ThemeProvider>
            <h1>Hello I am an app</h1>
        </ThemeProvider>
    );
};