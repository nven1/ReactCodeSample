import React, { useEffect, useState } from "react"
import styles from "./CalendarMe.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectMyVacations } from "../../../reducers/CalendarReducer"
import { selectMe } from "../../../reducers/UserReducer"
import { VacationRequestReviewType, CalendarEvent, UserDaysLeft } from "../../../types/CalendarTypes"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"
import CalendarDataAccess from "../../../data_access/CalendarDataAccess"
import Card from "../../common_components/containers/Card/Card"
import CalendarCore from "../CalendarCore/CalendarCore"
import { formatDate, addDay } from "../../../utils/dateHelpers"
import Item from "../../common_components/text/Item/Item"

interface CalendarMeProps {}

const CalendarMe: React.FC<CalendarMeProps> = (props) => {
    const dispatch = useDispatch()

    const me = useSelector(selectMe)
    const vacations = useSelector(selectMyVacations)

    const [myVacations, setMyVacations] = useState<Array<VacationRequestReviewType>>([])
    const [daysRemaining, setDaysRemaining] = useState<UserDaysLeft>()

    useEffect(() => {
        if (me) {
            CalendarDataAccess.getMyDaysRemaining(dispatch)(onSuccessDaysRemaining)
            CalendarDataAccess.getMyVacations(dispatch)()
        }

        // eslint-disable-next-line
    }, [me])

    useEffect(() => {
        if (me) {
            const mine = vacations.filter((vacation) => vacation.user.id === me.id && vacation.status !== "DECLINED")
            setMyVacations(mine)
        }

        // eslint-disable-next-line
    }, [vacations])

    const onSuccessDaysRemaining = (days: UserDaysLeft) => {
        setDaysRemaining(days)
    }

    const renderVacationsOnCalendar = () => {
        return vacations.map((vacation) => {
            return {
                id: vacation.id,
                start: vacation.start,
                end: addDay(vacation.end),
                title: vacation.status,
                extendedProps: vacation.user,
            } as CalendarEvent
        })
    }

    const renderRequests = () => {
        if (myVacations.length > 0) {
            return myVacations.map((vacation) => {
                const subtitle = vacation.status === "APPROVED" ? "Approved Leave" : "Requested Leave"
                return (
                    <div key={vacation.id}>
                        <Subtitle>{subtitle}</Subtitle>
                        {vacationInfo(vacation)}
                        {vacation.status === "PENDING" && <span className={styles.status}>Awaiting approval</span>}
                    </div>
                )
            })
        }
        return <span className={styles.status}>No active or requested vacations</span>
    }

    const vacationInfo = (vacation: VacationRequestReviewType) => {
        return (
            <div>
                <Item bold label="Days requested" children={vacation.daysRequested} />
                <Item bold label="From" children={formatDate(vacation.start)} />
                <Item bold label="To" children={formatDate(vacation.end)} />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.calendar}>
                <CalendarCore events={renderVacationsOnCalendar()} />
            </div>
            <Card>
                {me && (
                    <>
                        <Subtitle>{`${me.firstName} ${me.lastName}`}</Subtitle>
                        <Item bold label="2019" children={daysRemaining?.previousYear} />
                        <Item bold label="2020" children={daysRemaining?.currentYear} />
                        <Item bold label="Total days remaining" children={daysRemaining?.total} />

                        <div className={styles.content}>{renderRequests()}</div>
                    </>
                )}
            </Card>
        </div>
    )
}
export default CalendarMe
