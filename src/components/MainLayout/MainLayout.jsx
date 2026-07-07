import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header/Header";

export const MainLayout = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    return (
        <div className={cls.mainLayout}>
            <Header />
            <div className={cls.mainWrapper}>
                <main className={cls.main}></main>
                <Outlet />
                <footer className={cls.footer}>
                    React Question Cards Application | {currentMonth}/{currentYear} <br />
                    by Gio Bar
                </footer>
            </div>
        </div>
    );
};
