import { toast } from "react-toastify";
// import { Button } from "../../components/Button";
import { delayFn } from "../../helpers/delayFn";
import cls from "./AddQuestionPage.module.css";
import { useActionState } from "react";
import { API_URL } from "../../constants/global.constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

const createCardAction = async (_previousState, formData) => {
    try {
        await delayFn();
        // console.log("formData", Object.fromEntries(formData));
        // console.log("question", formData.get("question"));

        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.trim();
        const isClearForm = newQuestion.clearForm; //formData.get("clearForm")

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

        const question = await response.json();
        toast.success("A new question has been successfully created!");

        return isClearForm ? {} : question;
    } catch (error) {
        toast.error(error.message || "Something went wrong");
        return {};
    }
};

const AddQuestionPage = () => {
    const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });

    console.log("formState", formState);

    return (
        <>
            {isPending && <Loader />}

            <h1 className={cls.formTitle}>Add new question</h1>

            <div className={cls.formContainer}>
                <QuestionForm
                    formAction={formAction}
                    state={formState}
                    isPending={isPending}
                    submitBtnText="Add Question"
                />
            </div>
        </>
    );
};

export default AddQuestionPage;
