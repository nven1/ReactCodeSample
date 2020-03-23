import React from "react"
import styles from "./Button.module.scss"
import { ButtonProps } from "../../../types/ElementProps"
import { buttonClassName } from "../../../utils/classNameHelpers"

const Button: React.FC<ButtonProps> = props => {
    const classProps: string = buttonClassName(styles, props)

    return (
        <button className={classProps} onClick={props.onClick}>
            <span>{props.children}</span>
        </button>
    )
}

export default Button
