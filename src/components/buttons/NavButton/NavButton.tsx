import React from "react"
import { Route, RouteComponentProps, withRouter } from "react-router-dom"
import "./NavButton.module.scss"
import Button from "../Button/Button"

interface NavButtonProps extends RouteComponentProps {
    to: string
    exact?: boolean
    external?: boolean
}

const NavButton: React.FC<NavButtonProps> = props => {
    const handleClick = () => {
        if (props.external) {
            window.open(props.to)
        } else {
            props.history.push(props.to)
        }
    }

    const renderButton = ({ match, location }: any) => (
        <Button variation={match ? "purple" : "grey"} noHover={Boolean(match)} onClick={handleClick}>
            {props.children}
        </Button>
    )

    return <Route path={props.to} exact={props.exact} children={renderButton} />
}
export default withRouter(NavButton)
