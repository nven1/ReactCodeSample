import React, { useEffect, useState } from "react"
import styles from "./CalendarManage.module.scss"
import { useParams, useHistory, Switch, Route } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAdmin } from "../../../reducers/UserReducer"
import Button from "../../common_components/buttons/Button/Button"
import TextButton from "../../common_components/buttons/TextButton/TextButton"
import CalendarCore from "../CalendarCore/CalendarCore"
import CalendarDataAccess from "../../../data_access/CalendarDataAccess"
import {
    selectApprovedVacations,
    selectApprovedVacationUsersIds,
    selectRequestedVacations,
} from "../../../reducers/CalendarReducer"
import { goTo } from "../../../utils/navHelpers"
import RequestList from "../RequestList/RequestList"
import RequestSingle from "../RequestSingle/RequestSingle"
import { CalendarEvent } from "../../../types/CalendarTypes"
import { addDay } from "../../../utils/formattingHelpers"

interface CalendarOverviewProps {}

const URL = Endpoints.appEndpoints.calendar

const CalendarOverview: React.FC<CalendarOverviewProps> = (props) => {
    const dispatch = useDispatch()

    const isAdmin = useSelector(selectIsAdmin)
    const approvedVacations = useSelector(selectApprovedVacations)
    const requestedVacations = useSelector(selectRequestedVacations)
    const approvedVacationUsersIds = useSelector(selectApprovedVacationUsersIds)

    const { id } = useParams()
    const history = useHistory()

    const [selectedUsers, setSelectedUsers] = useState<Array<number>>([])
    const [tempEvent, setTempEvent] = useState<CalendarEvent>()

    useEffect(() => {
        if (isAdmin !== undefined) {
            if (isAdmin) {
                CalendarDataAccess.getVacations(dispatch)()
            } else {
                history.push(goTo(URL, "me"))
            }
        }

        // eslint-disable-next-line
    }, [isAdmin])

    useEffect(() => {
        if (id === undefined) {
            setTempEvent(undefined)
        } else if (id && requestedVacations.length > 0) {
            const request = requestedVacations.filter((rId) => rId.id === Number(id))[0]
            setTempEvent({
                id: request.id,
                title: `${request.user.firstName} ${request.user.lastName}`,
                start: request.start,
                end: addDay(request.end),
                extendedProps: request.user,
            })
        }

        // eslint-disable-next-line
    }, [id, requestedVacations])

    useEffect(() => {
        toggleSelectAll()

        // eslint-disable-next-line
    }, [approvedVacationUsersIds])

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

    const toggleSelectAll = () => {
        if (approvedVacations.length > 0 && selectedUsers.length === 0) {
            setSelectedUsers(approvedVacationUsersIds)
        } else {
            setSelectedUsers([])
        }
    }

    // init   - has a list of ids of users with active vacations
    // step 1 - gets first users vacation (to acces its extended props)
    // setp 2 - fill the button with user info and appropirate actions
    const renderUsersinFilter = () => {
        const list = approvedVacationUsersIds
            .map((userId) => {
                return approvedVacations.find((vacation) => vacation.extendedProps.id === userId)
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

    const renderVacationsOnCalendar = () => {
        return approvedVacations
            .filter((vacation) => selectedUsers.includes(vacation.extendedProps.id))
            .map((vacation) => {
                return { ...vacation, end: addDay(vacation.end) }
            })
    }

    const renderSingleRequest = () => {
        const request = requestedVacations.filter((rId) => rId.id === Number(id))[0]
        if (request) {
            return <RequestSingle request={request} />
        } else {
            history.push(goTo(URL, "manage"))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarFilter}>
                    <Button color={selectedUsers.length > 0 ? "red" : "purple"} size="small" onClick={toggleSelectAll}>
                        {selectedUsers.length > 0 ? "DESELECT ALL" : "SELECT ALL"}
                    </Button>
                    {renderUsersinFilter()}
                </div>
                <div className={styles.calendar}>
                    <CalendarCore events={renderVacationsOnCalendar()} preview={tempEvent} />
                </div>
            </div>

            <div>
                {requestedVacations.length > 0 && (
                    <Switch>
                        <Route
                            exact
                            path={`${URL}/manage/`}
                            render={() => <RequestList requests={requestedVacations} />}
                        />
                        <Route exact path={`${URL}/manage/:id`} render={renderSingleRequest} />
                    </Switch>
                )}
            </div>
        </div>
    )
}
export default CalendarOverview
