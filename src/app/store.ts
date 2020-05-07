import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "../reducers/UserReducer"
import departmentReducer from "../reducers/DepartmentReducer"
import calendarReducer from "../reducers/CalendarReducer"

export const store = configureStore({
    reducer: {
        users: userReducer,
        departments: departmentReducer,
        calendar: calendarReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
