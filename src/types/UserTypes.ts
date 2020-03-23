export interface UserTypeResponse {
    id: number
    firstName: string
    lastName: string
    email: string
    profilePhoto: string | null
    since: string
    bio: string
    roles?: string[]
}
