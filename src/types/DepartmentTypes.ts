import { UserMinType } from "./UserTypes"
import { DepartmentImage } from "../utils/getImage"

export interface DepartmentMinimalType {
    id: number
    name: string
    image: DepartmentImage
}

export interface DepartmentType extends DepartmentMinimalType {
    members: Array<UserMinType>
}

export interface DepartmentRequestType {
    name: string
    image: DepartmentImage
}
