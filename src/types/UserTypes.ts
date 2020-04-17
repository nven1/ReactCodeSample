import { DepartmentMinimalType } from "./DepartmentTypes"

export type RoleTypes = "Admin" | "User"

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
