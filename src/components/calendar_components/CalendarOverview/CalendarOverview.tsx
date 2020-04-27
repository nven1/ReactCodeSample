import React, { useEffect, useState } from "react"
import styles from "./CalendarOverview.module.scss"
import "./Calendar.style.scss"
import { Link, useParams } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import { goTo } from "../../../utils/navHelpers"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers, selectIsAdmin } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import Card from "../../common_components/containers/Card/Card"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import Button from "../../common_components/buttons/Button/Button"
import TextButton from "../../common_components/buttons/TextButton/TextButton"
import { UserType } from "../../../types/UserTypes"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"

interface CalendarOverviewProps {}

const URL = Endpoints.appEndpoints.calendar

const CalendarOverview: React.FC<CalendarOverviewProps> = (props) => {
    const dispatch = useDispatch()

    const isAdmin = useSelector(selectIsAdmin)
    const users = useSelector(selectUsers)

    const { mode } = useParams()

    const [selected, setSelected] = useState<Array<number>>([])

    const calendarComponentRef = React.createRef<FullCalendar>()

    useEffect(() => {
        console.log(isAdmin)
        console.log(users)

        if (users.length === 0) {
            UserDataAccess.getUsers(dispatch)()
        }

        if (isAdmin && users.length !== 0) {
            setSelected(users.map((user) => user.id))
        }

        // eslint-disable-next-line
    }, [users])

    const handleUserFilterClick = (id: number) => () => {
        const isSelected: boolean = selected.includes(id)
        if (isSelected) {
            setSelected(selected.filter((selectedId) => selectedId !== id))
        } else {
            setSelected((prev) => {
                return [...prev, id]
            })
        }
    }

    const handleDeselectAll = () => {
        setSelected([])
    }

    const handleDateClick = (e: any) => {
        console.log(e)
    }

    const renderUsers = () => {
        const list = users.map((user) => (
            <TextButton
                key={user.id}
                color="purple"
                onClick={handleUserFilterClick(user.id)}
                bold={selected.includes(user.id)}
            >{`${user.firstName} ${user.lastName}`}</TextButton>
        ))
        return list
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
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={false}
                        aspectRatio={1.8}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={calendarComponentRef}
                        weekends={true}
                        eventLimit
                        views={{
                            timegrid: {
                                eventLimit: 3,
                            },
                        }}
                        events={[
                            // initial event data
                            { title: "Event Now", start: "2020-04-22", end: "2020-04-25" },
                            { title: "Event Now", start: new Date(), end: "2020-24-04" },
                        ]}
                        dateClick={handleDateClick}
                    />
                </div>
            </div>
            <div>
                <Card>2</Card>
            </div>
        </div>
    )
}
export default CalendarOverview
