import React, { useState, useEffect } from "react"
import styles from "./Department.module.scss"
import { DepartmentType } from "../../../types/DepartmentTypes"
import Card from "../../common_components/containers/Card/Card"
import { UserMinType } from "../../../types/UserTypes"
import Circle from "../../common_components/indicators/Circle/Circle"
import BackgroundImage from "../../common_components/indicators/Illustration/BackgroundImage"
import Button from "../../common_components/buttons/Button/Button"
import Dialog from "../../common_components/containers/Dialog/Dialog"
import DepartmentDialog from "../DepartmentDialog/DepartmentDialog"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import { goTo } from "../../../utils/navHelpers"

interface DepartmentProps {
    department: DepartmentType
    edit?: boolean
}

export interface ReassignDialogProps {
    open: boolean
    user?: UserMinType
    rootDepartmentId?: number
    targetDepartmentId?: number
    onClose: () => void
}

const URL_STAFF = Endpoints.appEndpoints.staff

const Department: React.FC<DepartmentProps> = (props) => {
    const { mode } = useParams()

    const [heads, setHeads] = useState<Array<UserMinType>>([])
    const [staff, setStaff] = useState<Array<UserMinType>>([])

    const handleDialogClose = () => {
        setDialogState((prev) => {
            return { ...prev, open: false }
        })
    }

    const [dialogState, setDialogState] = useState<ReassignDialogProps>({
        open: false,
        onClose: handleDialogClose,
    })

    useEffect(() => {
        let staff: Array<UserMinType> = []
        let heads: Array<UserMinType> = []

        props.department.members.map((member) => {
            return member.isManager ? heads.push(member) : staff.push(member)
        })

        setStaff(staff)
        setHeads(heads)

        // eslint-disable-next-line
    }, [props.department])

    const renderPeople = (people: Array<UserMinType>) => {
        if (props.edit) {
            return people.map((person) => (
                <div key={person.id} className={styles.personEdit}>
                    <Link to={goTo(URL_STAFF, person.id.toString())}>{`${person.firstName} ${person.lastName}`}</Link>
                    <Button color="red" size="small" onClick={handleReassignDialog(person)}>
                        Reassign
                    </Button>
                </div>
            ))
        }
        return people.map((person) => (
            <Link
                to={goTo(URL_STAFF, person.id.toString())}
                key={person.id}
                className={styles.person}
            >{`${person.firstName} ${person.lastName}`}</Link>
        ))
    }

    const handleReassignDialog = (person: UserMinType) => () => {
        setDialogState((prev) => {
            return {
                ...prev,
                open: true,
                user: person,
                rootDepartmentId: Number(mode),
            }
        })
    }

    return (
        <>
            <div className={styles.container}>
                <Card>
                    <div className={styles.title}>
                        {props.department.name}
                        <Circle color="red">{props.department.members.length}</Circle>
                    </div>
                    {heads.length > 0 && <div className={styles.subtitle}>Heads</div>}
                    {renderPeople(heads)}
                </Card>

                {staff.length > 0 && (
                    <Card>
                        <div className={styles.subtitle}>Staff</div>
                        {renderPeople(staff)}
                    </Card>
                )}

                <BackgroundImage image={props.department.image} />
            </div>
            <Dialog open={dialogState.open} onClose={handleDialogClose}>
                <DepartmentDialog {...dialogState} />
            </Dialog>
        </>
    )
}
export default Department
