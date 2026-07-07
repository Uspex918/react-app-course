import { Button } from "../Button";
import cls from "./QuestionCard.module.css";

export const QuestionCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <div>Level: 1</div>
                <div>Not Compited</div>
            </div>
            <h5 className={cls.cardTitle}>Что такое JSX?</h5>
            <div className={cls.cardAnswers}>
                <label>short answer: </label>
                <p className={cls.cardAnswer}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, delectus.
                </p>
            </div>
            <Button
                onClick={() => {
                    console.log("click");
                }}
            >
                View
            </Button>
        </div>
    );
};
