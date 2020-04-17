import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { UserMeType } from "../types/UserTypes"

export interface DepartmentsState {
    me: UserMeType | undefined
}

const initialState: DepartmentsState = {
    me: undefined,
}

export const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getMyUserAction: (state, action: PayloadAction<UserMeType>) => {
            state.me = action.payload
        },
        clearUserReducerAction: (state, action: PayloadAction<undefined>) => {
            state.me = action.payload
        },
    },
})

export const { getMyUserAction, clearUserReducerAction } = slice.actions

export const selectMe = (state: RootState) => state.users.me
export const selectIsAdmin = (state: RootState) => state.users.me?.roles.filter((role) => role.name === "Admin").length

export default slice.reducer
