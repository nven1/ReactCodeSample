import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { getMyUserAction, clearUserReducerAction, getUsersAction, getRolesAction } from "../reducers/UserReducer"
import { UserDepartmentAndRoleType, UserType, RoleType, UserCreateRequestType } from "../types/UserTypes"
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
        .put(`${Endpoints.apiEndpoint}/users/${userId}/reassign`, userDepartmentAndRole, AuthHeader())
        .then((response) => {
            DepartmentDataAccess.getDepartments(dispatch)()
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

const getRoles = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<RoleType>>(`${Endpoints.apiEndpoint}/roles`, AuthHeader())
        .then((response) => {
            dispatch(getRolesAction(response.data))
        })
        .catch()
}

const createUser = (dispatch: Dispatch<any>) => (user: UserCreateRequestType, onSuccess: () => void) => {
    axios
        .post(`${Endpoints.apiEndpoint}/users`, user, AuthHeader())
        .then((response) => {
            getUsers(dispatch)()
            DepartmentDataAccess.getDepartments(dispatch)()
            onSuccess()
        })
        .catch()
}

export default { getMyUser, reassignUser, clearUserReducer, getUsers, getRoles, createUser }
