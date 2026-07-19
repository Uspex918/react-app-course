import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header/Header";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    return (
        <Fragment>
            <div className={cls.mainLayout}>
                <Header />
                <div className={cls.mainWrapper}>
                    {/* <main className={cls.main}>main</main> */}
                    <Outlet />
                    <footer className={cls.footer}>
                        React Question Cards Application | {currentMonth}/{currentYear} <br />
                        by Gio Bar
                    </footer>
                </div>
            </div>

            <ToastContainer />
        </Fragment>
    );
};
