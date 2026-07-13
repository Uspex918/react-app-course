import cls from "./HomePage.module.css";
import { Fragment, useState, useEffect, useMemo } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortSelectValue, setSortSelectValue] = useState("");

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
    // console.log(searchValue);
    // console.log(typeof searchValue);
    const cards = useMemo(() => {
        return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
    }, [questions, searchValue]);

    // console.log(cards);

    useEffect(() => {
        getQuestions(`react?${sortSelectValue}`);
    }, [sortSelectValue]);

    // const testRefHandler = () => {
    //     console.dir(inputRef.current.value);
    // };

    const onSearchChangeHandler = (e) => {
        // console.log(e.target.value);
        setSearchValue(e.target.value);
    };

    const onSortSelectChangeValue = (e) => {
        console.log(e.target.value);
        setSortSelectValue(e.target.value);
    };

    return (
        <Fragment>
            <div className={cls.controlsContainer}>
                <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
                {/* <input type="text" value={searchValue} onChange={onSearchChangeHandler} /> */}
                <select value={sortSelectValue} onChange={onSortSelectChangeValue} className={cls.select}>
                    <option value="">sort by</option>
                    <hr />
                    <option value="_sort=level">level ASC</option>
                    <option value="_sort=-level">level DESC</option>
                    <option value="_sort=completed">completed ASC</option>
                    <option value="_sort=-completed">completed DESC</option>
                </select>
            </div>
            {/* <button onClick={testRefHandler}>test ref</button> */}
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}

            <QuestionCardList cards={cards} />
        </Fragment>
    );
};
