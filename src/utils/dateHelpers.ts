import moment from "moment"

export const formatDate = (date: string) => moment(date).format("DD.MM.YYYY")

export const addDay = (date: string) => moment(date).add(1, "day").toISOString()

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
