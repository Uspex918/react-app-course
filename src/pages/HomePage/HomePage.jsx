// import cls from "./HomePage.module.css";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { Fragment, useState, useEffect } from "react";
import { API_URL } from "../../constants";

export const HomePage = () => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await fetch(`${API_URL}/react`);
            const fetchedQuestions = await response.json();

            setQuestions(fetchedQuestions);

            console.log("fetchedQuestions =>", fetchedQuestions);
            // console.log("пустой массив?", questions);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <Fragment>
            {questions.map((card, index) => {
                return <QuestionCard card={card} key={index} />;
            })}
        </Fragment>
    );
};
