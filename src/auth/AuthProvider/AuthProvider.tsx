import { createContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import { AUTH_STORAGE } from "../../constants";

export const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    setIsAuth: () => {},
});

export interface IAuthProviderProps {
    children: ReactNode;
}
export interface IAuthContext {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) || "false");

    const [isAuth, setIsAuth] = useState<boolean>(isLogin);

    return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};
