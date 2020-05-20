import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { UserType, RoleType } from "../types/UserTypes"

export interface UsersState {
    me: UserType | undefined
    users: Array<UserType>
    roles: Array<RoleType>
}

const initialState: UsersState = {
    me: undefined,
    users: [],
    roles: [],
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
        getRolesAction: (state, action: PayloadAction<Array<RoleType>>) => {
            state.roles = action.payload
        },
    },
})

export const { getMyUserAction, clearUserReducerAction, getUsersAction, getRolesAction } = slice.actions

export const selectMe = (state: RootState) => state.users.me

export const selectIsAdmin = (state: RootState) =>
    !!state.users.me?.roles.filter((role) => role.name === "admin").length

export const selectIsDepartmentManager = (state: RootState) =>
    !!state.users.me?.roles.filter((role) => role.name === ("departmentManager" || "admin")).length

export const selectIsVacationManager = (state: RootState) =>
    !!state.users.me?.roles.filter((role) => role.name === ("vacationManager" || "admin")).length

export const selectIsPaysheetManager = (state: RootState) =>
    !!state.users.me?.roles.filter((role) => role.name === ("paymentListManager" || "admin")).length

export const selectUsers = (state: RootState) => state.users.users

export const selectRoles = (state: RootState) => state.users.roles

export default slice.reducer
