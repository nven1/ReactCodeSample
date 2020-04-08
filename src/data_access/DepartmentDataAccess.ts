import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { addDepartment } from "../reducers/DepartmentReducer"

const getDepartments = (dispatch: Dispatch<any>) => () => {
    axios
        .get(`${Endpoints.apiEndpoint}/departments`)
        .then((response) => {
            console.log(response)
            dispatch(addDepartment(response.data))
        })
        .catch((error) => {})
}

export default { getDepartments }
