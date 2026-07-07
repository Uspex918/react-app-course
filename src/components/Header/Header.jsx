import { Button } from "../Button";
import cls from "./Header.module.css";
import ReactLogo from "../../assets/react.svg";

export const Header = () => {
    return (
        <header className={cls.header}>
            <p>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>
            <div className={cls.headerButtons}>
                <Button isDisabled>Add</Button>
                <Button>Login</Button>
            </div>
        </header>
    );
};
