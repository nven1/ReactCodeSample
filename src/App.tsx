import React from "react"
import "./App.scss"
import AppHolder from "./components/AppHolder"
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom"
import Endpoints from "./environments/endpoints"
import { Token } from "./utils/storageKeys"

function App() {
    const renderApp = (props: RouteComponentProps) => {
        const token = localStorage.getItem(Token)
        const isAuthenticated = token !== null

        return <AppHolder {...props} authenticated={isAuthenticated} />
    }

    return (
        <BrowserRouter>
            <Route path={Endpoints.appEndpoints.root} render={renderApp} />
        </BrowserRouter>
    )
}

export default App
