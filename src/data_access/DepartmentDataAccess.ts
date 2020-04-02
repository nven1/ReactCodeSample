import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { addDepartment } from "../reducers/DepartmentReducer"

const getDepartments = (dispath: Dispatch<any>) => () => {
    axios
        .get("")
        .then(response => {})
        .catch(error => {})
}

export default { getDepartments }
