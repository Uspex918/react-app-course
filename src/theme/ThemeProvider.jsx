import { createContext, useEffect, useState } from "react";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const sevedTheme = localStorage.getItem(THEME_STORAGE) || "light";
    const [theme, setTheme] = useState(sevedTheme);

    useEffect(() => {
        const detectTheme = () => {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            if (isDark) {
                setTheme("dark");
                document.body.classList.remove("darkLayout");
            } else {
                sevedTheme === "dark" && document.body.classList.add("darkLayout");
                setTheme(sevedTheme);
            }
        };
        detectTheme();

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        // console.log("mediaQuery", mediaQuery);
        mediaQuery.addEventListener("change", detectTheme);

        return () => {
            mediaQuery.removeEventListener("change", detectTheme);
        };
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
