import React from "react"
import styles from "./Illustration.module.scss"
import businessMan from "../../../assets/illustration_businessman.svg"

interface IllustrationProps {}

const Illustration: React.FC<IllustrationProps> = (props) => {
    return (
        <div className={styles.container}>
            <img src={businessMan} alt="Department illustration" />
        </div>
    )
}
export default Illustration
