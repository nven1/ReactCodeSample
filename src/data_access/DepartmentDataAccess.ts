import { Dispatch } from "redux"

const departments = [
    {
        id: 0,
        name: "Frontend",
        members: ["Neven", "Matej", "Nino"]
    },
    {
        id: 1,
        name: "Backend",
        members: ["Luka", "Kec", "Matija"]
    }
]

const getDepartments = (dispath: Dispatch<any>) => () => {}

export default { getDepartments }
