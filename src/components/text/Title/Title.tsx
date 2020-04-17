import React from "react"
import styles from "./Title.module.scss"
import classNames from "classnames"

interface TitleProps {
    align?: "center" | "right"
}

const Title: React.FC<TitleProps> = (props) => {
    const classProps = classNames(styles.container, [styles[props.align ?? ""]])

    return <div className={classProps}>{props.children}</div>
}
export default Title
