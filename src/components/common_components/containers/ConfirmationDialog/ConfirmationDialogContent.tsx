import React from "react"
import styles from "./ConfirmationDialogContent.module.scss"
import Button from "../../buttons/Button/Button"
import Subtitle from "../../text/Subtitle/Subtitle"
import CloseButton from "../../buttons/CloseButton/CloseButton"

interface ConfirmationDialogContentProps {
    confirmAction: () => void
    onClose?: () => void
}

const ConfirmationDialogContent: React.FC<ConfirmationDialogContentProps> = (props) => {
    return (
        <div className={styles.container}>
            {props.onClose && (
                <div className={styles.closeContainer}>
                    <CloseButton onClick={props.onClose} />
                </div>
            )}
            <Subtitle>{props.children}</Subtitle>
            <Button color="red" onClick={props.confirmAction}>
                CONFIRM
            </Button>
        </div>
    )
}
export default ConfirmationDialogContent
