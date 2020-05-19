import { Token } from "./storageKeys"

export const AuthHeader = (formData?: boolean) => {
    const token = localStorage.getItem(Token)
    if (formData) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
            },
        }
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}
