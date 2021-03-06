import React from "react"
import styles from "./Calendar.module.scss"
import { useParams, Route } from "react-router"
import Endpoints from "../../../environments/endpoints"
import CalendarManage from "../../calendar_components/CalendarManage/CalendarManage"
import AddVacationForm from "../../calendar_components/AddVacationForm/AddVacationForm"
import Toolbar, { ToolbarButtonItemType } from "../../common_components/bars/Toolbar/Toolbar"
import { isNum } from "../../../utils/navHelpers"
import { useSelector } from "react-redux"
import { selectIsVacationManager } from "../../../reducers/UserReducer"
import CalendarMe from "../../calendar_components/CalendarMe/CalendarMe"
import GuardedSwitch from "../../common_components/navigation/GuardedSwitch/GuardedSwitch"
import IfRoute from "../../common_components/navigation/IfRoute/IfRoute"
interface CalendarProps {}

const URL = Endpoints.appEndpoints.calendar

const Calendar: React.FC<CalendarProps> = (props) => {
    const { mode } = useParams()
    const isVacationManager = useSelector(selectIsVacationManager)

    const toolbarButtons: Array<ToolbarButtonItemType> = [
        { key: "me", text: "Me" },
        { key: "manage", text: "Manage" },
    ]

    const userTypeHome = isVacationManager ? "manage" : "me"

    return (
        <div className={styles.container}>
            <Toolbar
                url={URL}
                label="Calendar"
                actionLabel={mode === "add" ? "" : "Add leave"}
                onAction="add"
                buttons={isVacationManager ? toolbarButtons : [toolbarButtons[0]]}
            />
            <div className={styles.page}>
                <GuardedSwitch redirectTo={{ url: URL, to: userTypeHome }}>
                    <IfRoute
                        if={isVacationManager}
                        exact
                        path={`${URL}/manage/:id${isNum}?`}
                        component={CalendarManage}
                    />
                    <Route exact path={`${URL}/me`} component={CalendarMe} />
                    <Route exact path={`${URL}/add`} component={AddVacationForm} />
                    <Route path="*">404</Route>
                </GuardedSwitch>
            </div>
        </div>
    )
}
export default Calendar
