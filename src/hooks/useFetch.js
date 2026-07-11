import { useState } from "react";
import { delayFn } from "../helpers/delayFn";

export const useFetch = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchFn = async (arg) => {
        try {
            setIsLoading(true);
            setError("");

            await delayFn(350);

            const response = await callback(arg);
            return response;
            // const fetchedQuestions = await response.json();

            // setQuestions(fetchedQuestions);

            // console.log("fetchedQuestions =>", fetchedQuestions);
            // console.log("пустой массив?", questions);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetchFn, isLoading, error];
};
