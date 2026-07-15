import cls from "./HomePage.module.css";
import { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
    const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
    const [questions, setQuestions] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [sortSelectValue, setSortSelectValue] = useState("");
    const [countSelectValue, setCountSelectValue] = useState("");

    const controlsContainerRef = useRef();

    const getActivePageNumber = () => (questions.next === null ? questions.last : questions.next - 1);

    // const inputRef = useRef();

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const fetchedQuestions = await response.json();

        // if (!response.ok) {
        //     throw new Error(fetchedQuestions?.message || `Ошибка ${response.status}`);
        // }

        // if (!Array.isArray(fetchedQuestions)) {
        //     throw new Error("Неверный формат ответа API");
        // }

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
        if (questions?.data) {
            if (searchValue.trim()) {
                return questions.data.filter((d) =>
                    d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
                );
            } else {
                return questions.data;
            }
        }

        return [];
    }, [questions, searchValue]);

    // console.log(cards);

    const pagination = useMemo(() => {
        const totalCardsCount = questions?.pages || 0;

        return Array(totalCardsCount)
            .fill(0)
            .map((_, i) => i + 1);
    }, [questions]);

    useEffect(() => {
        // getQuestions(`react?${sortSelectValue}`);
        // getQuestions(`react?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
        getQuestions(`react${searchParams}${sortSelectValue ? `&${sortSelectValue}` : ""}`);
    }, [searchParams, sortSelectValue]);

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
        setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
    };

    const paginationHandler = (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName === "BUTTON") {
            setSearchParams(`?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`);
            controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const onCountSelectChangeValue = (e) => {
        setCountSelectValue(e.target.value);
        setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
    };

    return (
        <Fragment>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
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
                <select value={countSelectValue} onChange={onCountSelectChangeValue} className={cls.select}>
                    <option disabled>count</option>
                    <hr />
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            {/* <button onClick={testRefHandler}>test ref</button> */}
            {isLoading && <Loader />}
            {error && <p>{error}</p>}

            <QuestionCardList cards={cards} />

            {cards.length === 0 ? (
                <p className={cls.noCardsInfo}>No cards...</p>
            ) : (
                pagination.length > 1 && (
                    <div className={cls.paginationContainer} onClick={paginationHandler}>
                        {pagination.map((value) => {
                            return (
                                <Button key={value} isActive={value === getActivePageNumber()}>
                                    {value}
                                </Button>
                            );
                        })}
                    </div>
                )
            )}
        </Fragment>
    );
};
