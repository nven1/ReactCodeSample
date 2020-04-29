import React from "react"
import styles from "./CalendarCore.module.scss"
import "./Calendar.style.scss"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { UserVacationType } from "../../../types/UserTypes"

export interface CalendarEvent {
    id: number
    title: string
    start: string
    end: string
    extendedProps: UserVacationType
}

interface CalendarCoreProps {
    events: Array<CalendarEvent>
}

const CalendarCore: React.FC<CalendarCoreProps> = (props) => {
    const calendarComponentRef = React.createRef<FullCalendar>()

    const handleDateClick = (e: any) => {
        console.log(e)
    }

    return (
        <div className={styles.container}>
            <FullCalendar
                defaultView="dayGridMonth"
                header={{ left: "title", center: "", right: "prev,next" }}
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
                events={props.events}
                dateClick={handleDateClick}
            />
        </div>
    )
}
export default CalendarCore
