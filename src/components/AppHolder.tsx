import React, { useEffect } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"
import Endpoints from "../environments/endpoints"
import Header from "./bars/Header/Header"
import Departments from "./screens/Departments/Departments"

interface AppHolderProps extends RouteComponentProps {}

const AppHolder: React.FC<AppHolderProps> = props => {
    useEffect(() => {
        props.history.push(Endpoints.appEndpoints.departments)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Header />
            <Switch>
                <Route exact path={Endpoints.appEndpoints.departments} component={Departments} />
            </Switch>
        </>
    )
}
export default AppHolder
