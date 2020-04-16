import React from "react"
import styles from "./Card.module.scss"
import classnames from "classnames"
import CloseButton from "../../buttons/CloseButton/CloseButton"

export interface CardProps {
    variation?: "double" | "dynamic"
    onClose?: () => void
}

const Card: React.FC<CardProps> = (props) => {
    const classProps: string = classnames(styles.container, {
        [styles.containerWithClose]: props.onClose,
        [styles.double]: props.variation === "double",
        [styles.dynamic]: props.variation === "dynamic",
    })

    return (
        <div className={classProps}>
            {props.onClose && (
                <div className={styles.closeContainer}>
                    <CloseButton onClick={props.onClose} />
                </div>
            )}
            <div>{props.children}</div>
        </div>
    )
}
export default Card
