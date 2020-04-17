import React, { useEffect } from "react"
import { Switch, Route, RouteComponentProps, Redirect } from "react-router-dom"
import Endpoints from "../environments/endpoints"
import Header from "./bars/Header/Header"
import Departments from "./screens/Departments/Departments"
import { useDispatch } from "react-redux"
import UserDataAccess from "../data_access/UserDataAccess"
import Login from "./screens/Login/Login"
import Staff from "./screens/Staff/Staff"

interface AppHolderProps extends RouteComponentProps {
    authenticated: boolean
}

const AppHolder: React.FC<AppHolderProps> = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.authenticated) {
            UserDataAccess.getMyUser(dispatch)()
        }

        // eslint-disable-next-line
    }, [props.authenticated])

    const notLoggedIn = (
        <>
            <Redirect to={Endpoints.appEndpoints.login} />
            <Route exact path={Endpoints.appEndpoints.login} component={Login} />
        </>
    )
    const loggedIn = (
        <>
            <Route exact path="/">
                <Redirect to={Endpoints.appEndpoints.departments} />
            </Route>
            <Route exact path={Endpoints.appEndpoints.departments} component={Departments} />
            <Route exact path={Endpoints.appEndpoints.staff} component={Staff} />
        </>
    )

    return (
        <>
            {props.authenticated && <Header />}
            <Switch>{props.authenticated ? loggedIn : notLoggedIn}</Switch>
        </>
    )
}
export default AppHolder
