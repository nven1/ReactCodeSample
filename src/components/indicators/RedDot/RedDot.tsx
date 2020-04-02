import React from "react"
import styles from "./RedDot.module.scss"

interface RedDotProps {}

const RedDot: React.FC<RedDotProps> = props => {
    return <div className={styles.container}></div>
}
export default RedDot
