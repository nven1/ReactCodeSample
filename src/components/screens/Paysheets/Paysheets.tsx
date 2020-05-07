import React from "react"
import styles from "./Paysheets.module.scss"
import { useSelector } from "react-redux"
import { selectIsAdmin, selectMe } from "../../../reducers/UserReducer"
import { mockPaysheets } from "../../paysheet_components/paysheets.mock"
import Toolbar, { ToolbarButtonItemType } from "../../common_components/bars/Toolbar/Toolbar"
import Endpoints from "../../../environments/endpoints"
import { Switch, Route, Redirect } from "react-router"
import UserPaysheets from "../../paysheet_components/UserPaysheets/UserPaysheets"

interface PaysheetsProps {
    //
}

const URL = Endpoints.appEndpoints.paysheets

const Paysheets: React.FC<PaysheetsProps> = (props) => {
    const isAdmin = useSelector(selectIsAdmin)
    const me = useSelector(selectMe)

    const toolbarButtons: Array<ToolbarButtonItemType> = [
        { key: "me", text: "Me" },
        { key: "manage", text: "Manage" },
    ]

    const userTypeHome = isAdmin ? "manage" : "me"

    const renderSwitch = () => {
        if (me && isAdmin !== undefined) {
            return (
                <Switch>
                    <Route exact path={`${URL}`} render={() => <Redirect to={`${URL}/${userTypeHome}`} />} />
                    <Route exact path={`${URL}/me`} render={renderMyPaysheets} />
                    {/* <Route exact path={`${URL}/me`} component={CalendarMe} />
                    <Route exact path={`${URL}/add`} component={CalendarAdd} />
                    <Route exact path={`${URL}/manage/:id${isNum}?`} component={CalendarManage} /> */}
                </Switch>
            )
        }
    }

    const renderMyPaysheets = () => {
        if (me) {
            const paysheets = mockPaysheets.filter((paysheet) => paysheet.userId === me.id)
            return <UserPaysheets me paysheets={paysheets} />
        }
    }

    return (
        <div className={styles.container}>
            <Toolbar label="Paysheets" url={URL} buttons={isAdmin ? toolbarButtons : [toolbarButtons[0]]} />
            <div className={styles.page}>{renderSwitch()}</div>
            {/* div.accordion>Item*3+h1.title */}
        </div>
    )
}
export default Paysheets
