import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { DepartmentType, DepartmentEditAction } from "../types/DepartmentTypes"

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
        addDepartmentAction: (state, action: PayloadAction<DepartmentType[]>) => {
            state.departments = [...state.departments, ...action.payload]
        },
        editDepartmentAction: (state, action: PayloadAction<DepartmentEditAction>) => {
            state.departments[action.payload.targetId] = action.payload.department
        },
    },
})

export const { addDepartmentAction, editDepartmentAction } = slice.actions

export const selectDepartments = (state: RootState) => state.departments.departments

export default slice.reducer
