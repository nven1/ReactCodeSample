import React from "react"
import styles from "./OverflowButton.module.scss"
import { DepartmentType } from "../../../types/DepartmentTypes"
import businessMan from "../../../assets/illustration_businessman.svg"

interface OverflowButtonProps {
    department: DepartmentType
    index: number
    onClick: (id?: number) => void
}

const OverflowButton: React.FC<OverflowButtonProps> = (props) => {
    const handleClick = () => {
        props.onClick(props.index)
    }
    return (
        <div className={styles.container} onClick={handleClick}>
            <img className={styles.image} src={businessMan} alt="" />
            <div className={styles.content}>
                <span className={styles.title}>{props.department.name}</span>
                <span className={styles.description}>Members: {props.department.members.length}</span>
            </div>
        </div>
    )
}
export default OverflowButton
