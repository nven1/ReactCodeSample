import React, { useEffect } from "react"
import styles from "./Staff.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers, selectIsAdmin } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"
import { useParams, RouteComponentProps, withRouter, Switch, Route } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import StaffOverview from "../../staff_components/StaffOverview/StaffOverview"
import StaffDetail from "../../staff_components/StaffDetail/StaffDetail"
import StaffAdd from "../../staff_components/StaffAdd/StaffAdd"
import StaffSetLeave from "../../staff_components/StaffSetLeave/StaffSetLeave"
import { isNum } from "../../../utils/navHelpers"

interface StaffProps extends RouteComponentProps {}

const URL = Endpoints.appEndpoints.staff

const Staff: React.FC<StaffProps> = (props) => {
    const dispatch = useDispatch()

    const users = useSelector(selectUsers)
    const isAdmin = useSelector(selectIsAdmin)

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

    const getUserById = () => {
        return users.filter((user) => user.id === Number(mode))[0]
    }

    return (
        <div className={styles.container}>
            <Toolbar url={URL} label="Staff" actionLabel={toolbarActionButtonLabel()} onAction={"add"} />
            <div className={styles.content}>
                <Switch>
                    <Route exact path={URL} render={() => <StaffOverview users={users} />} />
                    <Route exact path={`${URL}/add`} component={StaffAdd} />
                    {users.length > 0 && (
                        <>
                            <Route
                                exact
                                path={`${URL}/:mode${isNum}`}
                                render={() => <StaffDetail user={getUserById()} />}
                            />
                            <Route
                                exact
                                path={`${URL}/:mode${isNum}/edit`}
                                render={() => <StaffAdd user={getUserById()} />}
                            />
                            <Route
                                exact
                                path={`${URL}/:mode${isNum}/set_leave`}
                                render={() => <StaffSetLeave user={getUserById()} />}
                            />
                        </>
                    )}
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Staff)
