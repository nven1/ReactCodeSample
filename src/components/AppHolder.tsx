import React, { useEffect } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"
import Endpoints from "../environments/endpoints"
import Home from "./screens/Home/Home"
import Header from "./unique/Header/Header"

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
                <Route exact path={Endpoints.appEndpoints.departments} component={Home} />
            </Switch>
        </>
    )
}
export default AppHolder
