import React from "react"
import styles from "./Subtitle.module.scss"
import CloseButton from "../../buttons/CloseButton/CloseButton"

interface SubtitleProps {
    onClose?: () => void
}

const Subtitle: React.FC<SubtitleProps> = (props) => {
    return (
        <div className={styles.container}>
            {props.children}
            {props.onClose && <CloseButton onClick={props.onClose} />}
        </div>
    )
}
export default Subtitle
