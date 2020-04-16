import React from "react"
import styles from "./Input.module.scss"
import classNames from "classnames"

interface InputProps {
    label: string
    error: boolean
}

const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = (props) => {
    const classProps = classNames(styles.container, { [styles.error]: props.error })
    return (
        <div className={classProps}>
            <label>{props.label}</label>
            <input {...props} />
        </div>
    )
}
export default Input
