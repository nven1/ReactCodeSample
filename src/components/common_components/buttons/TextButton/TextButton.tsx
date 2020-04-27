import React from "react"
import styles from "./TextButton.module.scss"
import { ButtonProps } from "../../../../types/ElementProps"
import classnames from "classnames"

interface TextButtonProps extends ButtonProps {
    bold?: boolean
}

const TextButton: React.FC<TextButtonProps> = (props) => {
    const classProps: string = classnames(styles.container, styles[props.color], styles[props.size ?? "normal"], {
        [styles[`hover--${props.color}`]]: !props.noHover,
        [styles.transition]: !props.noTransition,
        [styles.bold]: props.bold,
    })

    return (
        <button className={classProps} onClick={props.onClick}>
            <span>{props.children}</span>
        </button>
    )
}
export default TextButton
