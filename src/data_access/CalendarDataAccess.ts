import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { AuthHeader } from "../utils/authHeader"
import { VacationType, getAllVacationsAction } from "../reducers/CalendarReducer"

const getVacations = (dispatch: Dispatch<any>) => () => {
    axios
        .get<Array<VacationType>>(`${Endpoints.apiEndpoint}/vacation/all`, AuthHeader())
        .then((response) => {
            dispatch(getAllVacationsAction(response.data))
        })
        .catch((error) => {})
}

export default { getVacations }
