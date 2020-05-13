import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { addDepartmentAction, getAllDepartmentsAction } from "../reducers/DepartmentReducer"
import { DepartmentRequestType, DepartmentType } from "../types/DepartmentTypes"
import { AuthHeader } from "../utils/authHeader"
import { showError } from "../utils/errorHandlers"

const getDepartments = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<DepartmentType>>(`${Endpoints.apiEndpoint}/departments`, AuthHeader())
        .then((response) => {
            dispatch(getAllDepartmentsAction(response.data))
        })
        .catch((error) => {})
}

const createDepartment = (dispatch: Dispatch<any>) => (department: DepartmentRequestType, onSuccess: () => void) => {
    axios
        .post<DepartmentType>(`${Endpoints.apiEndpoint}/departments`, department, AuthHeader())
        .then((response) => {
            dispatch(addDepartmentAction(response.data))
            onSuccess()
        })
        .catch((error) => showError(dispatch)(error))
}

export default { getDepartments, createDepartment }
