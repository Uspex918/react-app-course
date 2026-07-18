import cls from "./QuestionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader, SmallLoader } from "../../components/Loader";

// const card = {
//     id: "2",
//     question: "Что такое JSX?",
//     answer: "JSX — это синтаксическое расширение JavaScript для React.",
//     description:
//         "JSX позволяет писать HTML-подобный код в JavaScript, который затем транспилируется в вызовы `React.createElement`. Он облегчает создание и визуальное представление структуры компонентов.",
//     resources: ["https://react.dev/learn/writing-markup-with-jsx"],
//     level: 10,
//     completed: true,
//     editDate: "03.02.2025, 20:25",
// };

export const QuestionPage = () => {
    const navigate = useNavigate();
    const checkboxId = useId();
    const { id } = useParams();
    const [isChecked, setIsChecked] = useState(false);
    const [card, setCard] = useState(null);

    // console.log(id);

    const levelVariant = () => (card.level === 1 ? "primay" : card.level === 2 ? "warning" : "alert");
    const completedVariant = () => (card.completed ? "success" : "primay");

    const [fetchCard, isCardLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${id}`);
        const fetchedData = await response.json();

        setCard(fetchedData);
    });
    const [updateCard, isCardUpdated] = useFetch(async (isChecked) => {
        const response = await fetch(`${API_URL}/react/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ completed: isChecked }),
        });
        const fetchedData = await response.json();

        setCard(fetchedData);
    });

    useEffect(() => {
        fetchCard();
    }, []);

    useEffect(() => {
        card !== null && setIsChecked(card.completed);
    }, [card]);

    const onCheckboxChangeHandler = () => {
        setIsChecked(!isChecked);
        updateCard(!isChecked);
    };

    return (
        <>
            {isCardLoading && <Loader></Loader>}
            {card !== null && (
                <div className={cls.container}>
                    <div className={cls.cardLabels}>
                        <Badge variant={levelVariant()}>Level: {card.level}</Badge>
                        <Badge variant={completedVariant()}>{card.completed ? "Comleted" : "Not Copleted"}</Badge>

                        {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
                    </div>
                    <h5 className={cls.cardTitle}>{card.question}</h5>
                    <p className={cls.cardDescription}>{card.description}</p>
                    <div className={cls.cardAnswers}>
                        <label>short answer: </label>
                        <p className={cls.cardAnswer}>{card.answer}</p>
                    </div>

                    <ul className={cls.cardLinks}>
                        Resources:
                        {card.resources.map((link, index) => {
                            return (
                                <li key={index}>
                                    <a href={link.trim()} target="_blank" rel="noreferrer">
                                        {link.trim()}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <label htmlFor={checkboxId} className={cls.cardCheckbox}>
                        <input
                            type="checkbox"
                            id={checkboxId}
                            className={cls.checkbox}
                            checked={isChecked}
                            onChange={onCheckboxChangeHandler}
                            disabled={isCardUpdated}
                        />
                        <span>mark question as completed</span>
                        {isCardUpdated && <SmallLoader />}
                    </label>
                    <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdated}>
                        Edit Question
                    </Button>
                    <Button onClick={() => navigate("/")} isDisabled={isCardUpdated}>
                        Back
                    </Button>
                </div>
            )}
        </>
    );
};
