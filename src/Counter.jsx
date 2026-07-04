import { useState } from "react"

// export const Counter = () => {
//     let count = 1
//     return (
//         <button type="button" onClick={() => ++count}>
//             Count is {count}
//         </button>
//     )
// }

export const Counter = () => {
    const [count, setCount] = useState(0)

    console.log("Рендер компонента")

    return (
        <button type="button" onClick={() => setCount(count + 1)}>
            Count is {count}
        </button>
    )
}
