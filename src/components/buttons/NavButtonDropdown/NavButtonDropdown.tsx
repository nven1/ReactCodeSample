import React from "react"
import "./NavButtonDropdown.style.scss"
import RedDot from "../../indicators/RedDot/RedDot"
import NavButton from "../NavButton/NavButton"

interface NavButtonDropdownProps {
    to: string
    darkMode?: boolean
}

const NavButtonDropdown: React.FC<NavButtonDropdownProps> = (props) => {
    return (
        <NavButton to="/ayyLmao">
            <span>
                {props.children} <RedDot />
            </span>
        </NavButton>
    )
}
export default NavButtonDropdown
