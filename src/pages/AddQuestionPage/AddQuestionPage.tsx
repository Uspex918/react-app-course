/* eslint-disable prettier/prettier */
import { toast } from "react-toastify";
// import { Button } from "../../components/Button";
import { delayFn } from "../../helpers/delayFn";
import cls from "./AddQuestionPage.module.css";
import { useActionState } from "react";
import { API_URL } from "../../constants/global.constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import type { IQuestionCardState } from "../../types/global.types";

const createCardAction = async (
    _previousState: Partial<IQuestionCardState>,
    formData: FormData,
): Promise<Partial<IQuestionCardState>> => {
    try {
        await delayFn();
        // console.log("formData", Object.fromEntries(formData));
        // console.log("question", formData.get("question"));

        const newQuestion = Object.fromEntries(formData);
        const resources = (newQuestion.resources as string).trim();
        const isClearForm = Boolean(newQuestion.clearForm); //formData.get("clearForm")

        const response = await fetch(`${API_URL}/react`, {
            method: "POST",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: undefined,
            }),
        });

        if (!response.ok) {
            throw new Error(`Запрос упал со статусом ${response.status}`);
        }

        const question = (await response.json()) as Partial<IQuestionCardState>;
        toast.success("A new question has been successfully created!");

        return isClearForm ? {} : question;
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
        return {};
    }
};

const AddQuestionPage = () => {
    const [formState, formAction, isPending] = useActionState<Partial<IQuestionCardState>, FormData>(createCardAction, {
        clearForm: true,
    });

    console.log("formState", formState);

    return (
        <>
            {isPending && <Loader />}

            <h1 className={cls.formTitle}>Add new question</h1>

            <div className={cls.formContainer}>
                <QuestionForm
                    formAction={formAction}
                    cardState={formState}
                    isPending={isPending}
                    submitBtnText="Add Question"
                />
            </div>
        </>
    );
};

export default AddQuestionPage;
