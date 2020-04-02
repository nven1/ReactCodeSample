import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { DepartmentType, DepartmentEditAction } from "../types/DepartmentTypes"

export interface DepartmentsState {
    departments: Array<DepartmentType>
}

const initialState: DepartmentsState = {
    departments: [
        {
            id: 0,
            name: "Frontend",
            image: "",
            members: []
        },
        {
            id: 1,
            name: "Backend",
            image: "",
            members: []
        },
        {
            id: 2,
            name: "Human Resources",
            image: "",
            members: []
        },
        {
            id: 3,
            name: "Backend",
            image: "",
            members: []
        },
        {
            id: 4,
            name: "Frontend",
            image: "",
            members: []
        },
        {
            id: 5,
            name: "Frontend",
            image: "",
            members: []
        }
    ]
}

export const slice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        addDepartment: (state, action: PayloadAction<DepartmentType[]>) => {
            state.departments = [...state.departments, ...action.payload]
        },
        editDepartment: (state, action: PayloadAction<DepartmentEditAction>) => {
            state.departments[action.payload.targetId] = action.payload.department
        }
    }
})

export const { addDepartment, editDepartment } = slice.actions

export const selectDepartments = (state: RootState) => state.departments.departments

export default slice.reducer
