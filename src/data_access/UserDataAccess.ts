import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { getMyUserAction, clearUserReducerAction, getUsersAction } from "../reducers/UserReducer"
import { UserDepartmentAndRoleType, UserType } from "../types/UserTypes"
import DepartmentDataAccess from "./DepartmentDataAccess"
import { AuthHeader } from "../utils/authHeader"

const getMyUser = (dispatch: Dispatch<any>) => () => {
    axios
        .get<UserType>(`${Endpoints.apiEndpoint}/users/me`, AuthHeader())
        .then((response) => {
            dispatch(getMyUserAction(response.data))
        })
        .catch((error) => {})
}

const reassignUser = (dispatch: Dispatch<any>) => (
    userId: number,
    userDepartmentAndRole: UserDepartmentAndRoleType,
    onSuccess: () => void
) => {
    axios
        .post(`${Endpoints.apiEndpoint}/users/${userId}`, userDepartmentAndRole, AuthHeader())
        .then((response) => {
            DepartmentDataAccess.getDepartments(dispatch)
            onSuccess()
        })
        .catch((error) => {})
}

const clearUserReducer = (dispatch: Dispatch<any>) => () => {
    dispatch(clearUserReducerAction())
}

const getUsers = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<UserType>>(`${Endpoints.apiEndpoint}/users`, AuthHeader())
        .then((response) => {
            dispatch(getUsersAction(response.data))
        })
        .catch()
}

export default { getMyUser, reassignUser, clearUserReducer, getUsers }
