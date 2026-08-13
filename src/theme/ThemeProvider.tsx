import { createContext, useEffect, useState, type FC, type ReactNode } from "react";
import { THEME_STORAGE } from "../constants";
import { THEME_ENUM, type IThemeContext } from "../types/global.types";

export const ThemeContext = createContext<IThemeContext>({
    theme: THEME_ENUM.LIGHT,
    setTheme: () => {},
});

export interface IThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
    const sevedTheme = (localStorage.getItem(THEME_STORAGE) as THEME_ENUM) || THEME_ENUM.LIGHT;
    const [theme, setTheme] = useState<THEME_ENUM>(sevedTheme);

    useEffect(() => {
        const detectTheme = (): void => {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            if (isDark) {
                setTheme(THEME_ENUM.DARK);
                document.body.classList.remove("darkLayout");
            } else {
                sevedTheme === THEME_ENUM.DARK && document.body.classList.add("darkLayout");
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
