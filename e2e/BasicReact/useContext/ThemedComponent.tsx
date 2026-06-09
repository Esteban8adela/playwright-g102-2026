import React, {useContext} from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemedComponent = () => {
    const theme = useContext(ThemeContext);
    return(
        <div>
            <h1>Hello I am an app</h1>
            <p>Current theme: {theme}</p>
        </div>
    )
}