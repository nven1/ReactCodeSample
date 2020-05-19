import React, { useEffect } from "react"
import styles from "./Staff.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers, selectIsAdmin, selectMe } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"
import { useParams, Route } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import StaffOverview from "../../staff_components/StaffOverview/StaffOverview"
import StaffDetail from "../../staff_components/StaffDetail/StaffDetail"
import AddStaffForm from "../../staff_components/AddStaffForm/AddStaffForm"
import SetVacationDaysForm from "../../staff_components/SetVacationDaysForm/SetVacationDaysForm"
import { isNum } from "../../../utils/navHelpers"
import IfRoute from "../../common_components/navigation/IfRoute/IfRoute"
import GuardedSwitch from "../../common_components/navigation/GuardedSwitch/GuardedSwitch"

interface StaffProps {}

const URL = Endpoints.appEndpoints.staff

const Staff: React.FC<StaffProps> = (props) => {
    const dispatch = useDispatch()

    const users = useSelector(selectUsers)
    const isAdmin = useSelector(selectIsAdmin)
    const me = useSelector(selectMe)

    const { mode } = useParams()

    useEffect(() => {
        UserDataAccess.getUsers(dispatch)()

        // eslint-disable-next-line
    }, [])

    const toolbarActionButtonLabel = (): string | undefined => {
        if (isAdmin) {
            if (mode !== "add") {
                return "Add staff"
            } else {
                return ""
            }
        }
        return undefined
    }

    const user = users.filter((user) => user.id === Number(mode))[0]
    const isAdminOrCurrentUser: boolean = isAdmin || me?.id === Number(mode)

    return (
        <div className={styles.container}>
            <Toolbar url={URL} label="Staff" actionLabel={toolbarActionButtonLabel()} onAction={"add"} />
            <div className={styles.content}>
                <GuardedSwitch>
                    <Route exact path={URL} render={() => <StaffOverview users={users} linkTo={URL} />} />
                    <IfRoute if={isAdmin} exact path={`${URL}/add`} component={AddStaffForm} />
                    <IfRoute
                        if={!!user}
                        exact
                        path={`${URL}/:mode${isNum}`}
                        render={() => <StaffDetail user={user} />}
                    />
                    <IfRoute
                        if={!!user && isAdminOrCurrentUser}
                        exact
                        path={`${URL}/:mode${isNum}/edit`}
                        render={() => <AddStaffForm user={user} />}
                    />
                    <IfRoute
                        if={!!user && isAdmin}
                        exact
                        path={`${URL}/:mode${isNum}/set_leave`}
                        render={() => <SetVacationDaysForm user={user} />}
                    />
                    <Route path="*">insert 404 here</Route>
                </GuardedSwitch>
            </div>
        </div>
    )
}

export default Staff
