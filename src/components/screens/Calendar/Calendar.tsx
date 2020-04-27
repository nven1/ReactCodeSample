import React from "react"
import styles from "./Calendar.module.scss"
import { RouteComponentProps, useParams, withRouter, Switch, Route, Redirect } from "react-router"
import Endpoints from "../../../environments/endpoints"
import CalendarOverview from "../../calendar_components/CalendarOverview/CalendarOverview"
import CalendarAdd from "../../calendar_components/CalendarAdd/CalendarAdd"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"

interface CalendarProps extends RouteComponentProps {}

const URL = Endpoints.appEndpoints.calendar

const Calendar: React.FC<CalendarProps> = (props) => {
    const { mode } = useParams()

    const renderRequest = () => {
        if (!isNaN(Number(mode))) {
            return <CalendarOverview />
        } else {
            return <Redirect to={URL} />
        }
    }

    return (
        <div className={styles.container}>
            <Toolbar url={URL} label="Calendar" actionLabel={mode === "add" ? "" : "Add leave"} onAction="add" />
            <Switch>
                <Route exact path={URL} component={CalendarOverview} />
                <Route exact path={`${URL}/add`} component={CalendarAdd} />
                <Route path={`${URL}/:mode?`} render={renderRequest} />
            </Switch>
        </div>
    )
}
export default withRouter(Calendar)
