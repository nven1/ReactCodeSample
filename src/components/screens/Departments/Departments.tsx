import React, { useState, useEffect } from "react"
import styles from "./Departments.module.scss"
import Toolbar from "../../bars/Toolbar/Toolbar"

const departments = [
    {
        id: 0,
        name: "Frontend",
        members: ["Neven", "Matej", "Nino"]
    },
    {
        id: 1,
        name: "Backend",
        members: ["Luka", "Kec", "Matija"]
    }
]

interface DepartmentsProps {}

const Departments: React.FC<DepartmentsProps> = props => {
    const [activeTab, setActiveTab] = useState<number | undefined>(undefined)

    const handleClick = (index?: number) => {
        setActiveTab(index)
    }

    const renderView = () => {
        if (activeTab === undefined) {
            return "All departments"
        }
        return departments[activeTab].members
    }

    return (
        <div className={styles.Departments}>
            <Toolbar buttons={departments} indexActive={activeTab} onClick={handleClick} />
            {renderView()}
        </div>
    )
}
export default Departments
