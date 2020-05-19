import { Token } from "./storageKeys"

export const AuthHeader = (contentType?: string) => {
    const token = localStorage.getItem(Token)
    if (contentType) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": contentType,
            },
        }
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}
