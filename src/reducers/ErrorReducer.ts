import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface UsersState {
    error: string | undefined
}

const initialState: UsersState = {
    error: undefined,
}

export const slice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setErrorAction: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload
        },
    },
})

export const { setErrorAction } = slice.actions

export const selectError = (state: RootState) => state.error.error

export default slice.reducer
