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
export const selectUsers = (state: RootState) => state.users.users
export const selectRoles = (state: RootState) => state.users.roles

export const selectIsAdmin = (state: RootState) => checkIfExists(state, "")
export const selectIsDepartmentManager = (state: RootState) => checkIfExists(state, "departmentManager")
export const selectIsVacationManager = (state: RootState) => checkIfExists(state, "vacationManager")
export const selectIsPaysheetManager = (state: RootState) => checkIfExists(state, "paymentListManager")

const checkIfExists = (state: RootState, param: string): boolean => {
    return !!state.users.me?.roles.some((role) => role.name === param || role.name === "admin")
}

export default slice.reducer
