import React from "react"
import styles from "./IllustrationButton.module.scss"

interface IllustrationButtonProps {
    illustration: string
}

const IllustrationButton: React.FC<IllustrationButtonProps> = props => {
    return <div className={styles.container}>{props.children}</div>
}
export default IllustrationButton
