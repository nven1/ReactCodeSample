import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { DepartmentType } from "../types/DepartmentTypes"

export interface DepartmentsState {
    departments: Array<DepartmentType>
}

const initialState: DepartmentsState = {
    departments: [],
}

export const slice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        getAllDepartmentsAction: (state, action: PayloadAction<DepartmentType[]>) => {
            state.departments = action.payload
        },

        addDepartmentAction: (state, action: PayloadAction<DepartmentType[]>) => {
            state.departments = [...state.departments, ...action.payload]
        },
    },
})

export const { addDepartmentAction, getAllDepartmentsAction } = slice.actions

export const selectDepartments = (state: RootState) => state.departments.departments

export default slice.reducer
