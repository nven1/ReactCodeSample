import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { LoginRequest } from "../types/AuthTypes"

interface LoginResponseType {
    token: string
}

const login = (dispatch: Dispatch<any>) => (
    credentials: LoginRequest,
    onSuccess: (token: string) => void,
    onError: () => void
) => {
    axios
        .post<LoginResponseType>(`${Endpoints.apiEndpoint}/auth/login`, credentials)
        .then((response) => onSuccess(response.data.token))
        .catch((e) => onError())
}

export default { login }
