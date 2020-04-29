import React from "react"
import styles from "./Calendar.module.scss"
import { RouteComponentProps, useParams, withRouter, Switch, Route, Redirect } from "react-router"
import Endpoints from "../../../environments/endpoints"
import CalendarManage from "../../calendar_components/CalendarManage/CalendarManage"
import CalendarAdd from "../../calendar_components/CalendarAdd/CalendarAdd"
import Toolbar, { ToolbarButtonItemType } from "../../common_components/bars/Toolbar/Toolbar"
import { isNum } from "../../../utils/navHelpers"
import { useSelector } from "react-redux"
import { selectIsAdmin } from "../../../reducers/UserReducer"

interface CalendarProps extends RouteComponentProps {}

const URL = Endpoints.appEndpoints.calendar

const Calendar: React.FC<CalendarProps> = (props) => {
    const { mode } = useParams()
    const isAdmin = useSelector(selectIsAdmin)

    const toolbarButtons: Array<ToolbarButtonItemType> = [
        { key: "me", name: "Me" },
        { key: "manage", name: "Manage" },
    ]

    const userTypeHome = isAdmin ? "manage" : "me"

    return (
        <div className={styles.container}>
            <Toolbar
                url={URL}
                label="Calendar"
                actionLabel={mode === "add" ? "" : "Add leave"}
                onAction="add"
                buttons={isAdmin ? toolbarButtons : [toolbarButtons[0]]}
            />
            <Switch>
                <Route exact path={`${URL}`} render={() => <Redirect to={`${URL}/${userTypeHome}`} />} />
                <Route exact path={`${URL}/me`} component={CalendarManage} />
                <Route exact path={`${URL}/add`} component={CalendarAdd} />
                <Route exact path={`${URL}/manage/:id${isNum}?`} component={CalendarManage} />
            </Switch>
        </div>
    )
}
export default withRouter(Calendar)
