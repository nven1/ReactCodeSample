import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { AuthHeader } from "../utils/authHeader"
import { getAllVacationsAction, getMyVacationsAction } from "../reducers/CalendarReducer"
import { VacationType, UserDaysLeft, CalendarRequestType } from "../types/CalendarTypes"

const getVacations = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<VacationType>>(`${Endpoints.apiEndpoint}/vacation/all`, AuthHeader())
        .then((response) => {
            dispatch(getAllVacationsAction(response.data))
        })
        .catch((error) => {})
}

const getMyVacations = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<VacationType>>(`${Endpoints.apiEndpoint}/vacation`, AuthHeader())
        .then((response) => {
            dispatch(getMyVacationsAction(response.data))
        })
        .catch((error) => {})
}

const getUserDaysRemaining = (dispatch: Dispatch<any>) => (id: number, onSuccess: (days: UserDaysLeft) => void) => {
    axios
        .get<UserDaysLeft>(`${Endpoints.apiEndpoint}/users/${id}/vacationDaysAvailable`, AuthHeader())
        .then((response) => {
            onSuccess(response.data)
        })
        .catch((error) => {})
}

const getMyDaysRemaining = (dispatch: Dispatch<any>) => (onSuccess: (daysRemaining: UserDaysLeft) => void) => {
    axios
        .get<UserDaysLeft>(`${Endpoints.apiEndpoint}/users/me/vacationDaysAvailable`, AuthHeader())
        .then((response) => {
            onSuccess(response.data)
        })
        .catch((error) => {})
}

const approveVacation = (dispatch: Dispatch<any>) => (id: number, onSuccess: () => void) => {
    axios
        .put(`${Endpoints.apiEndpoint}/vacation/${id}/approve`, {}, AuthHeader())
        .then((response) => {
            getVacations(dispatch)()
            onSuccess()
        })
        .catch((error) => {})
}

const declineVacation = (dispatch: Dispatch<any>) => (id: number, onSuccess: () => void) => {
    axios
        .put(`${Endpoints.apiEndpoint}/vacation/${id}/decline`, {}, AuthHeader())
        .then((response) => {
            getVacations(dispatch)()
            onSuccess()
        })
        .catch((error) => {})
}

const requestVacation = (dispatch: Dispatch<any>) => (data: CalendarRequestType, onSuccess: () => void) => {
    axios
        .post(`${Endpoints.apiEndpoint}/vacation`, data, AuthHeader())
        .then((response) => {
            getVacations(dispatch)()
            onSuccess()
        })
        .catch((error) => {
            alert(error.response.data.errorMessage)
        })
}

export default {
    getVacations,
    getMyVacations,
    getUserDaysRemaining,
    approveVacation,
    declineVacation,
    requestVacation,
    getMyDaysRemaining,
}
