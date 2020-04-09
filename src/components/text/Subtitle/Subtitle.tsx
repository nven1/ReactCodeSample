import React from "react"
import styles from "./Subtitle.module.scss"

interface SubtitleProps {}

const Subtitle: React.FC<SubtitleProps> = (props) => {
    return <div className={styles.container}>{props.children}</div>
}
export default Subtitle
