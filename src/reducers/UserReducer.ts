import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { UserType } from "../types/UserTypes"

export interface DepartmentsState {
    me: UserType | undefined
    users: Array<UserType>
}

const initialState: DepartmentsState = {
    me: undefined,
    users: [],
}

export const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getMyUserAction: (state, action: PayloadAction<UserType>) => {
            state.me = action.payload
        },
        clearUserReducerAction: (state, action: PayloadAction<undefined>) => {
            state.me = action.payload
        },
        getUsersAction: (state, action: PayloadAction<Array<UserType>>) => {
            state.users = action.payload
        },
    },
})

export const { getMyUserAction, clearUserReducerAction, getUsersAction } = slice.actions

export const selectMe = (state: RootState) => state.users.me
export const selectIsAdmin = (state: RootState) => state.users.me?.roles.filter((role) => role.name === "Admin").length
export const selectUsers = (state: RootState) => state.users.users

export default slice.reducer
