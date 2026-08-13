export const dateFormat = (data: Date): string => {
    return Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(data);
};
