import React from "react"
import styles from "./Paysheets.module.scss"
import { useSelector } from "react-redux"
import { selectIsAdmin, selectMe } from "../../../reducers/UserReducer"
import { mockPaysheets } from "../../paysheet_components/paysheets.mock"
import Toolbar, { ToolbarButtonItemType } from "../../common_components/bars/Toolbar/Toolbar"
import Endpoints from "../../../environments/endpoints"
import { Route } from "react-router"
import UserPaysheets from "../../paysheet_components/UserPaysheets/UserPaysheets"
import { isNum } from "../../../utils/navHelpers"
import GuardedSwitch from "../../common_components/navigation/GuardedSwitch/GuardedSwitch"
import IfRoute from "../../common_components/navigation/IfRoute/IfRoute"

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

    const renderMyPaysheets = () => {
        if (me) {
            const paysheets = mockPaysheets.filter((paysheet) => paysheet.userId === me.id)
            return <UserPaysheets me paysheets={paysheets} />
        }
    }

    return (
        <div className={styles.container}>
            <Toolbar label="Paysheets" url={URL} buttons={isAdmin ? toolbarButtons : [toolbarButtons[0]]} />
            <div className={styles.page}>
                <GuardedSwitch redirectTo={{ url: URL, to: userTypeHome }}>
                    <Route exact path={`${URL}/me`} render={renderMyPaysheets} />
                    <IfRoute if={isAdmin} exact path={`${URL}/manage/:id${isNum}?`} render={renderMyPaysheets} />
                    <Route path="*">404</Route>
                </GuardedSwitch>
            </div>
        </div>
    )
}
export default Paysheets
