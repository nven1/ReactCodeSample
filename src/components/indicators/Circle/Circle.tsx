import React from "react"
import styles from "./Circle.module.scss"
import classnames from "classnames"

interface CircleProps {
    color: "purple" | "red" | "grey"
}

const Circle: React.FC<CircleProps> = (props) => {
    const classProps: string = classnames(styles.container, styles[props.color])

    return (
        <div className={classProps}>
            <span>{props.children}</span>
        </div>
    )
}
export default Circle
