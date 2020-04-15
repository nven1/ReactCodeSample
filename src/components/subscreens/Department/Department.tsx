import React, { useState, useEffect } from "react"
import styles from "./Department.module.scss"
import { DepartmentType } from "../../../types/DepartmentTypes"
import Card from "../../containers/Card/Card"
import { UserTypeResponse } from "../../../types/UserTypes"
import Circle from "../../indicators/Circle/Circle"
import BackgroundImage from "../../indicators/Illustration/BackgroundImage"
import Button from "../../buttons/Button/Button"
import Dialog from "../../containers/Dialog/Dialog"
import DepartmentList from "../DepartmentList/DepartmentList"

interface DepartmentProps {
    department: DepartmentType
    index: number
    edit?: boolean
}

export interface ReassignDialogProps {
    open: boolean
    user?: UserTypeResponse
    rootDepartmentId?: number
    targetDepartmentId?: number
    onClose: () => void
}

const Department: React.FC<DepartmentProps> = (props) => {
    const [heads, setHeads] = useState<Array<UserTypeResponse>>([])
    const [staff, setStaff] = useState<Array<UserTypeResponse>>([])

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
        let staff: Array<UserTypeResponse> = []
        let heads: Array<UserTypeResponse> = []

        props.department.members.map((member) => {
            return member.isManager ? heads.push(member) : staff.push(member)
        })

        setStaff(staff)
        setHeads(heads)
        // eslint-disable-next-line
    }, [props.department])

    const renderPeople = (people: Array<UserTypeResponse>) => {
        if (props.edit) {
            return people.map((person) => (
                <div key={person.id} className={styles.personEdit}>
                    <span>{`${person.firstName} ${person.lastName}`}</span>
                    <Button color="red" size="small" onClick={handleReassignDialog(person)}>
                        Reassign
                    </Button>
                </div>
            ))
        }
        return people.map((person) => (
            <div key={person.id} className={styles.person}>{`${person.firstName} ${person.lastName}`}</div>
        ))
    }

    const handleReassignDialog = (person: UserTypeResponse) => () => {
        setDialogState((prev) => {
            return {
                ...prev,
                open: true,
                user: person,
                rootDepartmentId: props.index,
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

                <BackgroundImage image="git" />
            </div>
            <Dialog open={dialogState.open} onClose={handleDialogClose}>
                <DepartmentList {...dialogState} />
            </Dialog>
        </>
    )
}
export default Department
