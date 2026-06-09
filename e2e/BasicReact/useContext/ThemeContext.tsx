import React, { createContext } from "react";

export const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = 'light';
    return(
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}