import React from "react"
import styles from "./Dialog.module.scss"
import ClickAwayListener from "react-click-away-listener"

export interface DialogProps {
    open: boolean
    onClose: () => void
}

const Dialog: React.FC<DialogProps> = (props) => {
    return (
        <>
            {props.open && (
                <div className={styles.container}>
                    <ClickAwayListener onClickAway={props.onClose}>{props.children}</ClickAwayListener>
                </div>
            )}
        </>
    )
}
export default Dialog
