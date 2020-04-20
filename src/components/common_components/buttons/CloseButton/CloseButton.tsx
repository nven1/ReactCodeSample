import React from "react"
import styles from "./CloseButton.module.scss"
import { IoIosCloseCircle } from "react-icons/io"

interface CloseButtonProps {
    onClick: () => void
}

const CloseButton: React.FC<CloseButtonProps> = (props) => {
    return <IoIosCloseCircle className={styles.container} onClick={props.onClick} />
}
export default CloseButton
