import React from "react"
import styles from "./Button.module.scss"
import { ButtonProps } from "../../../types/ElementProps"
import { buttonClassName } from "../../../utils/classNameHelpers"

interface FormButton extends ButtonProps {
    submit?: boolean
}

const Button: React.FC<FormButton> = (props) => {
    const classProps: string = buttonClassName(styles, props)

    return (
        <button className={classProps} onClick={props.onClick} type={props.submit ? "submit" : "button"}>
            <span>{props.children}</span>
        </button>
    )
}

export default Button
