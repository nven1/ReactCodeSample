import React from "react"
//import styles from "./LinkButton.module.scss"
import { Link } from "react-router-dom"
import Button from "../Button/Button"
import { ButtonProps } from "../../../../types/ElementProps"

interface LinkButtonProps extends ButtonProps {
    to: string
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
    return (
        <Link to={props.to}>
            <Button {...props}>{props.children}</Button>
        </Link>
    )
}
export default LinkButton
