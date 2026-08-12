import cls from "./EditQuestionPage.module.css";
import { useActionState } from "react";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import { delayFn } from "../../helpers/delayFn";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dateFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const editCardAction = async (_previousState, formData) => {
    try {
        await delayFn();
        // console.log("formData", Object.fromEntries(formData));
        // console.log("question", formData.get("question"));

        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.trim();
        const isClearForm = newQuestion.clearForm; //formData.get("clearForm")
        const questionId = newQuestion.questionId;

        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: "PATCH",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: dateFormat(new Date()),
            }),
        });

        if (!response.ok) {
            throw new Error(`Запрос упал со статусом ${response.status}`);
        }

        const question = await response.json();
        toast.success("The question has been successfully edited!");

        return isClearForm ? {} : question;
    } catch (error) {
        toast.error(error.message || "Something went wrong");
        return {};
    }
};

export const EditQuestion = ({ initialState = {} }) => {
    const navigate = useNavigate();
    const [formState, formAction, isPending] = useActionState(editCardAction, {
        ...initialState,
        clearForm: false,
    });
    console.log("is", initialState);
    const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
        await fetch(`${API_URL}/react/${initialState.id}`, { method: "DELETE" });

        toast.success("The question has been successfully removed!");
        navigate("/");
    });

    const onRemoveQuestionHandler = () => {
        const isRemove = confirm("Are you sure?");

        isRemove && removeQuestion();
    };

    return (
        <>
            {(isPending || isQuestionRemoving) && <Loader />}

            <h1 className={cls.formTitle}>Edit question</h1>

            <div className={cls.formContainer}>
                <button className={cls.removeBtn} disabled={isPending || isQuestionRemoving} onClick={onRemoveQuestionHandler}>
                    X
                </button>
                <QuestionForm
                    formAction={formAction}
                    state={formState}
                    isPending={isPending || isQuestionRemoving}
                    submitBtnText="Edit Question"
                />
            </div>
        </>
    );
};
