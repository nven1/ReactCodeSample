import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { getMyUserAction, clearUserReducerAction, getUsersAction, getRolesAction } from "../reducers/UserReducer"
import {
    UserDepartmentAndRoleType,
    UserType,
    RoleType,
    UserCreateRequestType,
    UserUpdateRequestType,
    UserSetVacationDaysRequestType,
} from "../types/UserTypes"
import DepartmentDataAccess from "./DepartmentDataAccess"
import { AuthHeader } from "../utils/authHeader"
import { ResetPasswordType } from "../components/staff_components/StaffDetail/StaffDetail"
import { showError } from "./ErrorDataAccess"

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
        .catch((error) => showError(dispatch)(error))
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
        .catch((error) => showError(dispatch)(error))
}

const updateUser = (dispatch: Dispatch<any>) => (id: number, user: UserUpdateRequestType, onSuccess: () => void) => {
    axios
        .put(`${Endpoints.apiEndpoint}/users/${id}`, user, AuthHeader())
        .then((response) => {
            getUsers(dispatch)()
            DepartmentDataAccess.getDepartments(dispatch)()
            onSuccess()
        })
        .catch((error) => showError(dispatch)(error))
}

const deactivateUser = (dispatch: Dispatch<any>) => (id: number, onSuccess: () => void) => {
    axios
        .put(`${Endpoints.apiEndpoint}/users/deactivate/${id}`, {}, AuthHeader())
        .then((response) => {
            getUsers(dispatch)()
            DepartmentDataAccess.getDepartments(dispatch)()
            onSuccess()
        })
        .catch()
}

const resetPassword = (dispatch: Dispatch<any>) => (email: ResetPasswordType, onSuccess: () => void) => {
    axios
        .post(`${Endpoints.apiEndpoint}/auth/password-reset`, email, AuthHeader())
        .then((response) => {
            getUsers(dispatch)()
            DepartmentDataAccess.getDepartments(dispatch)()
            onSuccess()
        })
        .catch()
}

const setNumberOfVacationDays = (dispatch: Dispatch<any>) => (
    data: UserSetVacationDaysRequestType,
    onSuccess: () => void
) => {
    axios
        .post(`${Endpoints.apiEndpoint}/vacation-days`, data, AuthHeader())
        .then((response) => {
            getUsers(dispatch)()
            onSuccess()
        })
        .catch((error) => {
            showError(dispatch)(error)
        })
}

export default {
    getMyUser,
    reassignUser,
    clearUserReducer,
    getUsers,
    getRoles,
    createUser,
    updateUser,
    deactivateUser,
    resetPassword,
    setNumberOfVacationDays,
}
