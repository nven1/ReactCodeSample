import { UserTypeResponse } from "./UserTypes"

export interface DepartmentType {
    id: number
    name: string
    image: string
    members: Array<UserTypeResponse>
}

export interface DepartmentEditAction {
    targetId: number
    department: DepartmentType
}
