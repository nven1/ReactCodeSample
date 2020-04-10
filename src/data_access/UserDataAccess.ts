import { Dispatch } from "redux"
import axios from "axios"
import Endpoints from "../environments/endpoints"
import { getMyUserAction } from "../reducers/UserReducer"

const getMyUser = (dispatch: Dispatch<any>) => () => {
    axios
        .get(`${Endpoints.apiEndpoint}/users/me`)
        .then((response) => {
            dispatch(getMyUserAction(response.data))
        })
        .catch((error) => {})
}

export default { getMyUser }
