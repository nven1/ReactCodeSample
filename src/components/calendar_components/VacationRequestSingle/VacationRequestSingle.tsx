import React, { useEffect, useState } from "react"
import styles from "./VacationRequestSingle.module.scss"
import Card from "../../common_components/containers/Card/Card"
import { useHistory } from "react-router"
import Endpoints from "../../../environments/endpoints"
import { goTo } from "../../../utils/navHelpers"
import { VacationRequestReviewType } from "../../../types/CalendarTypes"
import CalendarDataAccess from "../../../data_access/CalendarDataAccess"
import { useDispatch } from "react-redux"
import Title from "../../common_components/text/Title/Title"
import Button from "../../common_components/buttons/Button/Button"
import { formatDate } from "../../../utils/formattingHelpers"
import Item from "../../common_components/text/Item/Item"

interface VacationRequestSingleProps {
    request: VacationRequestReviewType
}

const URL = Endpoints.appEndpoints.calendar

const VacationRequestSingle: React.FC<VacationRequestSingleProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [daysRemaining, setDaysRemaining] = useState<number>()

    useEffect(() => {
        CalendarDataAccess.getUserDaysRemaining(dispatch)(props.request.user.id, onSuccessDaysRemaining)
        // eslint-disable-next-line
    }, [])

    const onSuccessDaysRemaining = (days: number) => {
        setDaysRemaining(days)
    }

    const handleClose = () => {
        history.push(goTo(URL, "manage"))
    }

    const onAccept = () => {
        CalendarDataAccess.approveVacation(dispatch)(props.request.id, onSuccessDecision)
    }

    const onDecline = () => {
        CalendarDataAccess.declineVacation(dispatch)(props.request.id, onSuccessDecision)
    }

    const onSuccessDecision = () => {
        history.push(goTo(URL, "manage"))
    }

    return (
        <div className={styles.container}>
            <Card onClose={handleClose}>
                <Title>{props.request.title}</Title>
                <div className={styles.content}>
                    <Item label="Days remaining" bold children={daysRemaining} />
                    <Item label="Days requested" bold children={props.request.daysRequested} />
                    <Item label="From" bold children={formatDate(props.request.start)} />
                    <Item label="To" bold children={formatDate(props.request.end)} />
                    <span className={styles.buttons}>
                        <Button color="red" onClick={onDecline}>
                            REJECT
                        </Button>
                        <Button color="purple" onClick={onAccept}>
                            ACCEPT
                        </Button>
                    </span>
                </div>
            </Card>
        </div>
    )
}
export default VacationRequestSingle
