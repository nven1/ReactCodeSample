import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { getMyUserAction, clearUserReducerAction } from "../reducers/UserReducer"
import { UserDepartmentAndRoleType, UserMeType } from "../types/UserTypes"
import DepartmentDataAccess from "./DepartmentDataAccess"

const getMyUser = (dispatch: Dispatch<any>) => () => {
    axios
        .get<UserMeType>(`${Endpoints.apiEndpoint}/users/me`)
        .then((response) => {
            dispatch(getMyUserAction(response.data))
            sessionStorage.setItem("UserId", response.data.id.toString())
        })
        .catch((error) => {})
}

const reassignUser = (dispatch: Dispatch<any>) => (
    userId: number,
    userDepartmentAndRole: UserDepartmentAndRoleType,
    onSuccess: () => void
) => {
    axios
        .post(`${Endpoints.apiEndpoint}/users/${userId}`, userDepartmentAndRole)
        .then((response) => {
            DepartmentDataAccess.getDepartments(dispatch)
            onSuccess()
        })
        .catch((error) => {})
}

const clearUserReducer = (dispatch: Dispatch<any>) => () => {
    dispatch(clearUserReducerAction())
}

export default { getMyUser, reassignUser, clearUserReducer }
