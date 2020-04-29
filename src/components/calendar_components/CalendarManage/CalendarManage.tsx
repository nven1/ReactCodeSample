import React, { useEffect, useState } from "react"
import styles from "./CalendarManage.module.scss"
import { useParams } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers, selectIsAdmin } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import Card from "../../common_components/containers/Card/Card"
import FullCalendar from "@fullcalendar/react"
import Button from "../../common_components/buttons/Button/Button"
import TextButton from "../../common_components/buttons/TextButton/TextButton"
import CalendarCore, { CalendarEvent } from "../CalendarCore/CalendarCore"
import CalendarDataAccess from "../../../data_access/CalendarDataAccess"
import { selectApprovedVacations, selectApprovedVacationUsers, VacationType } from "../../../reducers/CalendarReducer"
import { UserVacationType } from "../../../types/UserTypes"

interface CalendarOverviewProps {}

const URL = Endpoints.appEndpoints.calendar

const CalendarOverview: React.FC<CalendarOverviewProps> = (props) => {
    const dispatch = useDispatch()

    const isAdmin = useSelector(selectIsAdmin)
    const approvedVacations = useSelector(selectApprovedVacations)
    const approvedVacationUsers = useSelector(selectApprovedVacationUsers)

    const { mode } = useParams()

    const [selectedUsers, setSelectedUsers] = useState<Array<number>>([])

    const calendarComponentRef = React.createRef<FullCalendar>()

    useEffect(() => {
        CalendarDataAccess.getVacations(dispatch)()

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setSelectedUsers(approvedVacationUsers)

        // eslint-disable-next-line
    }, [approvedVacationUsers])

    const handleUserFilterClick = (id: number) => () => {
        const isSelected: boolean = selectedUsers.includes(id)
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter((selectedId) => selectedId !== id))
        } else {
            setSelectedUsers((prev) => {
                return [...prev, id]
            })
        }
    }

    const handleDeselectAll = () => {
        setSelectedUsers([])
    }

    /* const handleDateClick = (e: any) => {
        console.log(e)
    } */

    const renderUsers = () => {
        const list = approvedVacationUsers
            .map((user) => {
                return approvedVacations.find((id) => id.extendedProps.id === user)
            })
            .map((vacation) => {
                if (vacation) {
                    return (
                        <TextButton
                            key={vacation.extendedProps.id}
                            color="purple"
                            onClick={handleUserFilterClick(vacation.extendedProps.id)}
                            bold={selectedUsers.includes(vacation.extendedProps.id)}
                        >{`${vacation.extendedProps.firstName} ${vacation.extendedProps.lastName}`}</TextButton>
                    )
                }
                return ""
            })
        return list
    }

    const renderVacations = () => {
        return approvedVacations.filter((vacation) => selectedUsers.includes(vacation.extendedProps.id))
    }

    return (
        <div className={styles.container}>
            <div className={styles.calendarContainer}>
                {isAdmin && (
                    <div className={styles.calendarFilter}>
                        <Button color="red" size="small" onClick={handleDeselectAll}>
                            DESELECT ALL
                        </Button>
                        {renderUsers()}
                    </div>
                )}
                <div className={styles.calendar}>
                    <CalendarCore events={renderVacations()} />
                </div>
            </div>
            <div>
                <Card>2</Card>
            </div>
        </div>
    )
}
export default CalendarOverview
