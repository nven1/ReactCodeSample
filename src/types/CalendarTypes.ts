import { UserVacationType } from "./UserTypes"

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

export interface CalendarEvent {
    id: number
    title: string
    start: string
    end: string
    extendedProps: UserVacationType
}

export interface VacationRequestReviewType {
    id: number
    title: string
    start: string
    end: string
    user: UserVacationType
    daysRequested: number
    status: VacationStatusType
}

export interface UserDaysLeft {
    currentYear: number
    previousYear: number
    total: number
}

export interface CalendarSelectType {
    start: string
    end: string
}

export interface CalendarRequestType {
    startingDate: string
    endingDate: string
}
