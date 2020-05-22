import React, { useEffect } from "react"
import styles from "./Paysheets.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectUsers, selectIsPaysheetManager } from "../../../reducers/UserReducer"
import Toolbar, { ToolbarButtonItemType } from "../../common_components/bars/Toolbar/Toolbar"
import Endpoints from "../../../environments/endpoints"
import { Route } from "react-router"
import { isNum } from "../../../utils/navHelpers"
import GuardedSwitch from "../../common_components/navigation/GuardedSwitch/GuardedSwitch"
import IfRoute from "../../common_components/navigation/IfRoute/IfRoute"
import AddPaysheetForm from "../../paysheet_components/AddPaysheetForm/AddPaysheetForm"
import PaysheetsManage from "../../paysheet_components/PaysheetsManage/PaysheetsManage"
import UserDataAccess from "../../../data_access/UserDataAccess"
import PaysheetsMe from "../../paysheet_components/PaysheetsMe/PaysheetsMe"

interface PaysheetsProps {
    //
}

const URL = Endpoints.appEndpoints.paysheets

const toolbarButtons: Array<ToolbarButtonItemType> = [
    { key: "me", text: "Me" },
    { key: "manage", text: "Manage" },
]

const Paysheets: React.FC<PaysheetsProps> = (props) => {
    const dispatch = useDispatch()

    const isPaysheetManager = useSelector(selectIsPaysheetManager)
    const users = useSelector(selectUsers)

    useEffect(() => {
        if (users.length === 0) {
            UserDataAccess.getUsers(dispatch)()
        }

        // eslint-disable-next-line
    }, [])

    const userTypeHome = isPaysheetManager ? "manage" : "me"

    return (
        <div className={styles.container}>
            <Toolbar label="Paysheets" url={URL} buttons={isPaysheetManager ? toolbarButtons : [toolbarButtons[0]]} />
            <div className={styles.page}>
                <GuardedSwitch redirectTo={{ url: URL, to: userTypeHome }}>
                    <Route exact path={`${URL}/me`} component={PaysheetsMe} />
                    <IfRoute
                        if={isPaysheetManager}
                        exact
                        path={`${URL}/manage/:id${isNum}?`}
                        component={PaysheetsManage}
                    />
                    <IfRoute
                        if={isPaysheetManager}
                        exact
                        path={`${URL}/add/:id${isNum}`}
                        render={() => <AddPaysheetForm />}
                    />
                    <Route path="*">404</Route>
                </GuardedSwitch>
            </div>
        </div>
    )
}
export default Paysheets
