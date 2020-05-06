export const formatDate = (date: string) => {
    const fullDate = new Date(date)
    return `${fullDate.getDate()}.${fullDate.getMonth() + 1}.${fullDate.getFullYear()}`
}

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
