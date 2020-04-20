import React from "react"
import { Route, RouteComponentProps, withRouter, Link } from "react-router-dom"
import "./NavButton.module.scss"
import Button from "../Button/Button"

interface NavButtonProps extends RouteComponentProps {
    to: string
    exact?: boolean
    external?: boolean
    color?: "grey" | "purple" | "red"
}

const NavButton: React.FC<NavButtonProps> = (props) => {
    const handleClick = () => {
        window.open(props.to)
    }

    const renderButton = ({ match, location }: any) => (
        <>
            {!props.external && (
                <Link to={props.to}>
                    <Button color={match ? "purple" : "grey"} noHover={Boolean(match)}>
                        {props.children}
                    </Button>
                </Link>
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
