import { Dispatch } from "redux"
import { setErrorAction } from "../reducers/ErrorReducer"

export const showError = (dispatch: Dispatch) => (error: any) => {
    if (error.response.data.errorMessage) {
        dispatch(setErrorAction(error.response.data.errorMessage))
    } else {
        dispatch(setErrorAction("BAD ERROR HANDLING"))
    }
}
