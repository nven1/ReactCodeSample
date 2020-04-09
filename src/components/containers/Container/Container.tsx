import React from "react"
import styles from "./Container.module.scss"
import classnames from "classnames"
import CloseButton from "../../buttons/CloseButton/CloseButton"

export interface ContainerProps {
    variation?: "double" | "dynamic"
    onClose?: () => void
}

const Container: React.FC<ContainerProps> = (props) => {
    const classProps: string = classnames(styles.container, {
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
            {props.children}
        </div>
    )
}
export default Container
