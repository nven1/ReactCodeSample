export const goTo = (url: String, ...params: string[]) => {
    return `${url}/${params.join("/")}`
}

export const isNum = "(\\d+)"
