import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";
import { memo, type FC } from "react";
import type { IQuestionCard } from "../../types/global.types";

export interface IQuestionCardListProps {
    cards: IQuestionCard[];
}

export const QuestionCardList: FC<IQuestionCardListProps> = memo(({ cards }) => {
    return (
        <div className={cls.cardList}>
            {cards.map((card, index) => {
                return <QuestionCard card={card} key={index} />;
            })}
        </div>
    );
});
