import React, { useEffect } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"
import Endpoints from "../environments/endpoints"
import Header from "./bars/Header/Header"
import Departments from "./screens/Departments/Departments"
import DepartmentDataAccess from "../data_access/DepartmentDataAccess"
import { useDispatch } from "react-redux"

interface AppHolderProps extends RouteComponentProps {}

const AppHolder: React.FC<AppHolderProps> = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        props.history.push(Endpoints.appEndpoints.departments)

        DepartmentDataAccess.getDepartments(dispatch)()
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
