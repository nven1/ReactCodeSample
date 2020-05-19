import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { AuthHeader } from "../utils/authHeader"
import { getAllPaysheetsAction, PaysheetType, getMyPaysheetsAction } from "../reducers/PaysheetsReducer"
import { showError } from "../utils/errorHandlers"

const getAllPaysheets = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<PaysheetType>>(`${Endpoints.apiEndpoint}/payment-list/all`, AuthHeader())
        .then((response) => {
            dispatch(getAllPaysheetsAction(response.data))
        })
        .catch((error) => {})
}

const getMyPaysheets = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<PaysheetType>>(`${Endpoints.apiEndpoint}/payment-list`, AuthHeader())
        .then((response) => {
            dispatch(getMyPaysheetsAction(response.data))
        })
        .catch((error) => {})
}

const downloadPDF = (dispatch: Dispatch<any>) => (paysheetId: number) => {
    axios
        .get(`${Endpoints.apiEndpoint}/payment-list/${paysheetId}`, { ...AuthHeader(), responseType: "blob" })
        .then((response) => {
            const url = URL.createObjectURL(response.data)
            window.open(url, "blank")
        })
        .catch((error) => {
            showError(dispatch)(error)
            console.log(error.response)
        })
}

const uploadPDF = (dispatch: Dispatch<any>) => (paysheet: any, onSuccess: () => void) => {
    axios
        .post(`${Endpoints.apiEndpoint}/payment-list/`, paysheet, AuthHeader("multipart/form-data"))
        .then((response) => {
            onSuccess()
        })
        .catch((error) => {
            showError(dispatch)(error)
            console.log(error.response)
        })
}

export default {
    getAllPaysheets,
    getMyPaysheets,
    downloadPDF,
    uploadPDF,
}
