import React from "react"
import styles from "./Title.module.scss"

interface TitleProps {}

const Title: React.FC<TitleProps> = (props) => {
    return <div className={styles.container}>{props.children}</div>
}
export default Title
