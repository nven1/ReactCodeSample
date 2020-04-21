import React from "react"
import { Route, RouteComponentProps, withRouter } from "react-router-dom"
import "./NavButton.module.scss"
import Button from "../Button/Button"
import LinkButton from "../LinkButton/LinkButton"

interface NavButtonProps extends RouteComponentProps {
    to: string
    exact?: boolean
    external?: boolean
}

const NavButton: React.FC<NavButtonProps> = (props) => {
    const handleClick = () => {
        window.open(props.to)
    }

    const renderButton = ({ match, location }: any) => (
        <>
            {!props.external && (
                <LinkButton to={props.to} color={match ? "purple" : "grey"} noHover={Boolean(match)}>
                    {props.children}
                </LinkButton>
            )}
            {props.external && (
                <Button color={match ? "purple" : "grey"} noHover={Boolean(match)} onClick={handleClick}>
                    {props.children}
                </Button>
            )}
        </>
    )

    return <Route path={props.to} exact={props.exact} children={renderButton} />
}
export default withRouter(NavButton)
