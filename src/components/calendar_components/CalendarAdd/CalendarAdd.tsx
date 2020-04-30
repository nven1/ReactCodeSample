import React, { useState, useEffect } from "react"
import styles from "./CalendarAdd.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectMe } from "../../../reducers/UserReducer"
import CalendarCore from "../CalendarCore/CalendarCore"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import CalendarDataAccess from "../../../data_access/CalendarDataAccess"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"
import Button from "../../common_components/buttons/Button/Button"
import { CalendarSelectType, CalendarEvent, CalendarRequestType } from "../../../types/CalendarTypes"
import { useHistory } from "react-router"
import Endpoints from "../../../environments/endpoints"
import { goTo } from "../../../utils/navHelpers"
import { formatDate } from "../../../utils/formattingHelpers"
import Item from "../../common_components/text/Item/Item"

interface CalendarAddProps {}

const CalendarAdd: React.FC<CalendarAddProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const me = useSelector(selectMe)

    const [daysRemaining, setDaysRemaining] = useState<number>()
    const [selected, setSelected] = useState<CalendarSelectType>()

    useEffect(() => {
        if (me) {
            CalendarDataAccess.getUserDaysRemaining(dispatch)(me.id, onSuccessDaysRemaining)
        }

        // eslint-disable-next-line
    }, [me])

    const onSuccessDaysRemaining = (days: number) => {
        setDaysRemaining(days)
    }

    const handleSelect = (data: CalendarSelectType) => {
        setSelected(data)
    }

    const onSubmit = () => {
        if (me && selected) {
            const data: CalendarRequestType = { userId: me.id, startingDate: selected.start, endingDate: selected.end }
            CalendarDataAccess.requestVacation(dispatch)(data, onSuccess)
        }
    }

    const onSuccess = () => {
        history.push(goTo(Endpoints.appEndpoints.calendar, "me"))
    }

    const getSelectedDates = () => {
        if (selected) {
            return {
                start: selected?.start,
                end: selected?.end,
                extendedProps: {},
                title: "Preview",
            } as CalendarEvent
        }
        return undefined
    }

    return (
        <div className={styles.container}>
            <div className={styles.calendar}>
                <CalendarCore events={[]} preview={getSelectedDates()} onSelect={handleSelect} />
            </div>

            <Card variation="dynamic">
                <Title>Add Vacation</Title>
                <Item bold label="Days remaining" children={daysRemaining} />
                <Subtitle>Request</Subtitle>
                <div className={styles.form}>
                    <Item bold label="From" children={selected ? formatDate(selected.start) : "-"} />
                    <Item bold label="To" children={selected ? formatDate(selected.end) : "-"} />
                    <div className={styles.submitContainer}>
                        <Button color="purple" onClick={onSubmit}>
                            SUBMIT
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default CalendarAdd
