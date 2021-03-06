import { DepartmentMinimalType } from "./DepartmentTypes"

export type RoleTypes = "admin" | "user" | "departmentManager" | "vacationManager" | "paymentListManager"

export interface RoleType {
    id: number
    name: RoleTypes
}

export interface UserMinType {
    id: number
    firstName: string
    lastName: string
    isManager: boolean
}

export interface UserType extends UserMinType {
    email: string
    department: DepartmentMinimalType
    isActive: boolean
    dateOfEmployment: string
    roles: Array<RoleType>
}

export interface UserDepartmentAndRoleType {
    departmentId: number
    isManager: boolean
}

export interface UserCreateRequestType {
    firstName: string
    lastName: string
    isManager: boolean
    email: string
    departmentId: DepartmentMinimalType
    dateOfEmployment: string
    roles: Array<RoleType>
}

export interface UserUpdateRequestType {
    firstName: string
    lastName: string
    isManager: boolean
    dateOfEmployment: string
    departmentId: DepartmentMinimalType
    roles: Array<RoleType>
}

export interface UserVacationType {
    id: number
    firstName: string
    lastName: string
}

export interface UserSetVacationDaysRequestType {
    userId: number
    year: number
    numberOfDays: number
}
