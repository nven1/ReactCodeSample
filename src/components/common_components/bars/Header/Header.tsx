import React from "react"
import "./Header.style.scss"
import { withRouter, RouteComponentProps } from "react-router"
import NavButton from "../../buttons/NavButton/NavButton"
import Logo from "../../../unique/Logo/Logo"
import NavButtonDropdown from "../../buttons/NavButtonDropdown/NavButtonDropdown"
import Endpoints from "../../../../environments/endpoints"
import Button from "../../buttons/Button/Button"
import { useDispatch, useSelector } from "react-redux"
import UserDataAccess from "../../../../data_access/UserDataAccess"
import { selectMe } from "../../../../reducers/UserReducer"
import { Token } from "../../../../utils/storageKeys"

interface HeaderProps extends RouteComponentProps {
    //
}

const Header: React.FC<HeaderProps> = (props) => {
    const dispatch = useDispatch()

    const me = useSelector(selectMe)

    const handleLogout = () => {
        UserDataAccess.clearUserReducer(dispatch)()
        localStorage.removeItem(Token)
        props.history.push(Endpoints.appEndpoints.root)
    }

    return (
        <nav className="Header">
            <Logo />
            <NavButton to={Endpoints.appEndpoints.departments}>Departments</NavButton>
            <NavButton to={Endpoints.appEndpoints.staff}>Staff</NavButton>
            <NavButton to={Endpoints.appEndpoints.calendar}>Calendar</NavButton>
            <NavButton to={Endpoints.extEndpoints.wiki} external>
                Wiki
            </NavButton>
            <NavButtonDropdown to={Endpoints.appEndpoints.user}>{me?.firstName}</NavButtonDropdown>
            <Button color="red" onClick={handleLogout}>
                Logout
            </Button>
        </nav>
    )
}
export default withRouter(Header)
