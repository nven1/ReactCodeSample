import React, { useEffect } from "react"
import "./Calendar.style.scss"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { CalendarEvent, CalendarSelectType } from "../../../types/CalendarTypes"
import { useSelector, useDispatch } from "react-redux"
import { selectHolidays } from "../../../reducers/CalendarReducer"
import CalendarDataAccess from "../../../data_access/CalendarDataAccess"
import { previewEventStyle } from "../../../utils/eventStylings"

interface CalendarCoreProps {
    events: Array<CalendarEvent>
    preview?: CalendarEvent
    onSelect?: (data: CalendarSelectType) => void
}

const calendarRange = `${new Date().getFullYear() + 1}-07-01`

const CalendarCore: React.FC<CalendarCoreProps> = (props) => {
    const dispatch = useDispatch()
    const holidays = useSelector(selectHolidays)

    const calendarComponentRef = React.createRef<FullCalendar>()

    useEffect(() => {
        if (holidays.length === 0) {
            CalendarDataAccess.getHolidays(dispatch)()
        }

        // eslint-disable-next-line
    }, [holidays])

    useEffect(() => {
        if (props.preview && calendarComponentRef) {
            calendarComponentRef.current?.getApi().gotoDate(props.preview.start)
        } else {
            calendarComponentRef.current?.getApi().gotoDate(new Date())
        }

        // eslint-disable-next-line
    }, [props])

    const handleSelect = (e: any) => {
        if (props.onSelect && calendarComponentRef) {
            calendarComponentRef.current?.getApi().unselect()
            props.onSelect({ start: e.startStr, end: e.endStr })
        }
    }

    const eventRendererOptions = (info: any) => {
        if (info.event.rendering === "background") {
            info.el.title = info.event.title
        }
    }

    return (
        <FullCalendar
            defaultView="dayGridMonth"
            header={{ left: "title", center: "", right: "prev,next" }}
            aspectRatio={1.8}
            plugins={[dayGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            allDayDefault
            firstDay={1}
            eventLimit
            selectable={!!props.onSelect}
            select={handleSelect}
            eventRender={eventRendererOptions}
            validRange={{
                end: calendarRange,
            }}
            views={{
                timegrid: {
                    eventLimit: 3,
                },
            }}
            events={[...props.events, { ...props.preview, ...previewEventStyle } ?? {}, ...holidays]}
        />
    )
}
export default CalendarCore
