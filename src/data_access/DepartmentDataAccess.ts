import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { addDepartmentAction, getAllDepartmentsAction } from "../reducers/DepartmentReducer"
import { DepartmentRequestType } from "../types/DepartmentTypes"

const getDepartments = (dispatch: Dispatch<any>) => () => {
    axios
        .get(`${Endpoints.apiEndpoint}/departments`)
        .then((response) => {
            dispatch(getAllDepartmentsAction(response.data))
        })
        .catch((error) => {})
}

const createDepartment = (dispatch: Dispatch<any>) => (department: DepartmentRequestType, onSuccess?: () => void) => {
    axios
        .post(`${Endpoints.apiEndpoint}/departments`, department)
        .then((response) => {
            dispatch(addDepartmentAction([response.data]))
            if (onSuccess) {
                onSuccess()
            }
        })
        .catch((error) => {})
}

export default { getDepartments, createDepartment }

/* 
    
*/
