import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { UserVacationType } from "../types/UserTypes"
import { CalendarEvent } from "../components/calendar_components/CalendarCore/CalendarCore"

export interface VacationType {
    id: number
    startingDate: string
    endingDate: string
    created: string
    status: VacationStatusType
    numberOfVacationDays: number
    user: UserVacationType
}

export type VacationStatusType = "APPROVED" | "DECLINED" | "PENDING"

export interface CalendarState {
    vacations: Array<VacationType>
}

const initialState: CalendarState = {
    vacations: [],
}

export const slice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getAllVacationsAction: (state, action: PayloadAction<VacationType[]>) => {
            state.vacations = action.payload
        },
    },
})

export const { getAllVacationsAction } = slice.actions

export const selectApprovedVacations = (state: RootState) =>
    state.calendar.vacations
        .filter((item) => item.status === "APPROVED")
        .map((approved) => {
            return {
                id: approved.id,
                title: `${approved.user.firstName} ${approved.user.lastName}`,
                start: approved.startingDate,
                end: approved.endingDate,
                extendedProps: approved.user,
            } as CalendarEvent
        })

//returns list of ids without duplicates of users with approved vacation
export const selectApprovedVacationUsers = (state: RootState) =>
    Array.from(new Set(state.calendar.vacations.map((user) => user.user.id)))

export default slice.reducer
