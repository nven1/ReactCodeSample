import React from "react"
import styles from "./TextButton.module.scss"
import { ButtonProps } from "../../../types/ElementProps"
import { buttonClassName } from "../../../utils/classNameHelpers"

const TextButton: React.FC<ButtonProps> = (props) => {
    const classProps = buttonClassName(styles, props)

    return (
        <button className={classProps} onClick={props.onClick}>
            <span>{props.children}</span>
        </button>
    )
}
export default TextButton
