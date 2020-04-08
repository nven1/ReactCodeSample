import React from "react"
import styles from "./Container.module.scss"
import classnames from "classnames"

export interface ContainerProps {
    variation?: "double" | "dynamic"
}

const Container: React.FC<ContainerProps> = (props) => {
    const classProps: string = classnames(styles.container, {
        [styles.double]: props.variation === "double",
        [styles.dynamic]: props.variation === "dynamic",
    })

    return <div className={classProps}>{props.children}</div>
}
export default Container
