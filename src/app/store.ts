import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import userReducer from "../features/test/testSlice"
import departmentReducer from "../reducers/DepartmentReducer"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: userReducer,
        departments: departmentReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
