import React from "react"
import "./App.scss"
import AppHolder from "./components/AppHolder"
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom"
import Endpoints from "./environments/endpoints"

function App() {
    const renderApp = (props: RouteComponentProps) => {
        let isAuthenticated = false
        const token = localStorage.getItem("token")
        if (token !== null) {
            isAuthenticated = true
        }

        return <AppHolder {...props} authenticated={isAuthenticated} />
    }

    return (
        <BrowserRouter>
            <Route path={Endpoints.appEndpoints.root} render={renderApp} />
        </BrowserRouter>
    )
}

export default App
