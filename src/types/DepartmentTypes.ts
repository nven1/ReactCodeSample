import { UserTypeResponse } from "./UserTypes"
import { ImageType } from "../utils/getImage"

export interface DepartmentMinimalType {
    id: number
    name: string
    image: ImageType
}

export interface DepartmentType extends DepartmentMinimalType {
    members: Array<UserTypeResponse>
}

export interface DepartmentRequestType {
    name: string
    image: ImageType
}
