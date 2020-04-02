export interface DepartmentType {
    id: number
    name: string
    image: string
    members: Array<any>
}

export interface DepartmentEditAction {
    targetId: number
    department: DepartmentType
}
