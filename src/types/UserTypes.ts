import { DepartmentMinimalType } from "./DepartmentTypes"

export type RoleTypes = "Admin" | "User"

export interface RoleType {
    id: number
    name: RoleTypes
}

export interface UserTypeResponse {
    id: number
    firstName: string
    lastName: string
    isManager: boolean
}

export interface UserMeType extends UserTypeResponse {
    email: string
    department: DepartmentMinimalType
    isActive: boolean
    dateOfEmployment: string
    roles: Array<RoleType>
}
