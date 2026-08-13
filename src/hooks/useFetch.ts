import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
// import { toast } from "react-toastify";

export const useFetch = (callback: (...args: any[]) => void): [(...args: any[]) => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchFn = async (...args: any[]) => {
        try {
            setIsLoading(true);
            setError("");

            await delayFn(350);

            const response = await callback(...args);
            // toast("OK");
            return response;
            // const fetchedQuestions = await response.json();

            // setQuestions(fetchedQuestions);

            // console.log("fetchedQuestions =>", fetchedQuestions);
            // console.log("пустой массив?", questions);
        } catch (error: any) {
            setError(error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetchFn, isLoading, error];
};
