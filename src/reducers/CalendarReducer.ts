import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { VacationType, CalendarEvent, VacationRequestReviewType } from "../types/CalendarTypes"

export interface CalendarState {
    vacations: Array<VacationType>
    myVacations: Array<VacationType>
}

const initialState: CalendarState = {
    vacations: [],
    myVacations: [],
}

export const slice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getAllVacationsAction: (state, action: PayloadAction<VacationType[]>) => {
            state.vacations = action.payload
        },
        getMyVacationsAction: (state, action: PayloadAction<VacationType[]>) => {
            state.myVacations = action.payload
        },
    },
})

export const { getAllVacationsAction, getMyVacationsAction } = slice.actions

export const selectAllVacations = (state: RootState) =>
    state.calendar.vacations.map((vacation) => {
        return {
            id: vacation.id,
            title: `${vacation.user.firstName} ${vacation.user.lastName}`,
            start: vacation.startingDate,
            end: vacation.endingDate,
            user: vacation.user,
            daysRequested: vacation.numberOfVacationDays,
            status: vacation.status,
        } as VacationRequestReviewType
    })

export const selectMyVacations = (state: RootState) =>
    state.calendar.myVacations.map((vacation) => {
        return {
            id: vacation.id,
            title: `${vacation.user.firstName} ${vacation.user.lastName}`,
            start: vacation.startingDate,
            end: vacation.endingDate,
            user: vacation.user,
            daysRequested: vacation.numberOfVacationDays,
            status: vacation.status,
        } as VacationRequestReviewType
    })

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

export const selectRequestedVacations = (state: RootState) =>
    state.calendar.vacations
        .filter((item) => item.status === "PENDING")
        .map((requested) => {
            return {
                id: requested.id,
                title: `${requested.user.firstName} ${requested.user.lastName}`,
                start: requested.startingDate,
                end: requested.endingDate,
                user: requested.user,
                daysRequested: requested.numberOfVacationDays,
                status: requested.status,
            } as VacationRequestReviewType
        })

// returns list of ids of users with approved vacation (without duplicates)
export const selectApprovedVacationUsersIds = (state: RootState) =>
    Array.from(new Set(state.calendar.vacations.map((user) => user.user.id)))

export default slice.reducer
