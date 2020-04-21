export const goTo = (url: String, ...params: string[]) => {
    return `${url}/${params.join("/")}`
}
