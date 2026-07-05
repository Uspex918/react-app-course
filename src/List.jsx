import {} from "react";

const items = [
    {
        task: "Выучить Реакт",
        icon: "👨🏻‍💻",
        isCompleted: true,
    },
    {
        task: "Закрепить JavaScript",
        icon: "✨",
        isCompleted: true,
    },
    {
        task: "Не забивать на англиский",
        icon: "🦄",
        isCompleted: false,
    },
];

export const List = () => {
    return (
        <div>
            {items.map((item, index) => {
                // console.log(
                //     <section key={index}>
                //         <span>{item.icon}</span>
                //         <h4>{item.task}</h4>
                //     </section>,
                // )
                return (
                    <section key={index} className={item.isCompleted ? "completed" : ""}>
                        <span>{item.icon}</span>
                        <h4>{item.task}</h4>
                    </section>
                );
            })}
        </div>
    );
};
