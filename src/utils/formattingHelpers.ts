import moment from "moment"

export const formatDate = (date: string) => {
    const fullDate = new Date(date)
    return `${fullDate.getDate()}.${fullDate.getMonth() + 1}.${fullDate.getFullYear()}`
}

export const addDay = (date: string) => {
    return moment(date).add(1, "day").toISOString()
}
