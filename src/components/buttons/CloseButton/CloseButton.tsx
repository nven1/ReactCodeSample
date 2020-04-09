import React from "react"
import styles from "./CloseButton.module.scss"

interface CloseButtonProps {
    onClick: () => void
}

const CloseButton: React.FC<CloseButtonProps> = (props) => {
    return (
        <button className={styles.container} onClick={props.onClick}>
            x
        </button>
    )
}
export default CloseButton
