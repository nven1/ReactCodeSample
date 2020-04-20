import { Token } from "./storageKeys"

export const AuthHeader = () => {
    const token = localStorage.getItem(Token)

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}
