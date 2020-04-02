import React from "react"
import "./Header.style.scss"
import { withRouter } from "react-router"
import NavButton from "../../buttons/NavButton/NavButton"
import Logo from "../../unique/Logo/Logo"
import NavButtonDropdown from "../../buttons/NavButtonDropdown/NavButtonDropdown"
import Endpoints from "../../../environments/endpoints"

interface HeaderProps {
    //
}

const Header: React.FC<HeaderProps> = props => {
    return (
        <nav className="Header">
            <Logo />
            <NavButton to={Endpoints.appEndpoints.departments} exact>
                Departments
            </NavButton>
            <NavButton to={Endpoints.appEndpoints.staff}>Staff</NavButton>
            <NavButton to={Endpoints.appEndpoints.calendar}>Calendar</NavButton>
            <NavButton to={Endpoints.extEndpoints.wiki} external>
                Wiki
            </NavButton>
            <NavButtonDropdown to={Endpoints.appEndpoints.user}>User</NavButtonDropdown>
        </nav>
    )
}
export default withRouter(Header)
