import cls from "./HomePage.module.css";
import { Fragment, useState, useEffect, useRef } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchValue, setSearchValue] = useState([]);

    // const inputRef = useRef();

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const fetchedQuestions = await response.json();

        if (!response.ok) {
            throw new Error(fetchedQuestions?.message || `Ошибка ${response.status}`);
        }

        if (!Array.isArray(fetchedQuestions)) {
            throw new Error("Неверный формат ответа API");
        }

        setQuestions(fetchedQuestions);
        return fetchedQuestions;
    });

    // const _getQuestions = async () => {
    //     try {
    //         setIsLoading(true);
    //         await delayFn(350);
    //         const response = await fetch(`${API_URL}/react`);
    //         const fetchedQuestions = await response.json();

    //         setQuestions(fetchedQuestions);

    //         console.log("fetchedQuestions =>", fetchedQuestions);
    //         // console.log("пустой массив?", questions);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    useEffect(() => {
        getQuestions("react");
    }, []);

    // const testRefHandler = () => {
    //     console.dir(inputRef.current.value);
    // };

    const onSearchChangeHandler = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
    };

    return (
        <Fragment>
            <div className={cls.controlsContainer}>
                <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
                {/* <input type="text" value={searchValue} onChange={onSearchChangeHandler} /> */}
            </div>
            {/* <button onClick={testRefHandler}>test ref</button> */}

            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </Fragment>
    );
};
