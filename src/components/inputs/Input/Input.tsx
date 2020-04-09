import React from "react"
import styles from "./Input.module.scss"

interface InputProps {
    label: string
}

const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <div className={styles.container}>
            <span>{props.label}</span>
            <input {...props} />
        </div>
    )
}
export default Input
