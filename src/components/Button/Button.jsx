import {} from "react"
import cls from "./Button.module.css"

console.log(cls)

// const inlineStyles = {
//     color: "lightsalmon",
//     backgroundColor: "#ccc",
// }

const isPrimery = true

export const Button = (props) => {
    const { onClick, children } = props
    console.log("пропс", props)
    // return <button className={isPrimery ? cls.primary : cls.btn}>кнопка</button>
    return (
        <button
            className={`${cls.btn} ${isPrimery ? cls.primary : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
