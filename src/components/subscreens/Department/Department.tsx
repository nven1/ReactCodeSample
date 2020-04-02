import React from "react"
import styles from "./Department.module.scss"
import { DepartmentType } from "../../../types/DepartmentTypes"

interface DepartmentProps {
    department: DepartmentType
}

const Department: React.FC<DepartmentProps> = props => {
    return (
        <>
            {props.department && (
                <div className={styles.container}>
                    {props.department.id}
                    {props.department.name}
                    {props.department.image}
                </div>
            )}
        </>
    )
}
export default Department
