import { useState } from "react";
import { Button } from "./components/Button/Button";

// export const Counter = () => {
//     let count = 1
//     return (
//         <button type="button" onClick={() => ++count}>
//             Count is {count}
//         </button>
//     )
// }

export const Counter = () => {
    const [count, setCount] = useState(0);

    console.log("Рендер компонента");

    const setCounterHandler = () => {
        // setCount(count + 1)
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
    };

    return (
        <Button type="button" onClick={setCounterHandler}>
            Count is {count} 3-кнопка
        </Button>
    );
};
