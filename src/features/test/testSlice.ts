import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"

export interface CounterState {
    users: Array<string>
}

const initialState: CounterState = {
    users: ["Neven", "Paola"]
}

/* const addUser: CaseReducer<CounterState, PayloadAction<Array<string>>> = (state, action) => {
    state.users = [...state.users, ...action.payload]
} */

export const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addUser: (state, action: PayloadAction<Array<string>>) => {
            state.users = [...state.users, ...action.payload]
        }
    }
})

export const { addUser } = slice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => dispatch => {
    setTimeout(() => {
        dispatch(addUser(["Joselito"]))
    }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: RootState) => state.users.users

export default slice.reducer
