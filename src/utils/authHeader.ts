import { Token } from "./storageKeys"

const token = localStorage.getItem(Token)

export const AuthHeader = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}
