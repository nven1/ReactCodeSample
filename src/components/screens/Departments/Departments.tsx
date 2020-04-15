import React, { useState } from "react"
import styles from "./Departments.module.scss"
import Toolbar from "../../bars/Toolbar/Toolbar"
import { useSelector } from "react-redux"
import { selectDepartments } from "../../../reducers/DepartmentReducer"
import Department from "../../subscreens/Department/Department"
import OverflowButton from "../../buttons/OverflowButton/OverflowButton"
import AddDepartment from "../../subscreens/AddDepartment/AddDepartment"
import { selectIsAdmin } from "../../../reducers/UserReducer"

interface DepartmentsProps {}

type Mode = "edit" | "single" | "all" | "add"

const Departments: React.FC<DepartmentsProps> = (props) => {
    const departments = useSelector(selectDepartments)
    const isAdmin = useSelector(selectIsAdmin)

    const [activeTab, setActiveTab] = useState<number | undefined>(undefined)
    const [mode, setMode] = useState<Mode>("all")

    const setTab = (index?: number) => {
        setActiveTab(index)

        if (index === undefined) {
            setMode("all")
        } else {
            setMode("single")
        }
    }

    const renderView = () => {
        switch (mode) {
            case "all":
                const dpButtons = departments.map((dp, index) => (
                    <OverflowButton key={dp.id} index={index} department={dp} onClick={setTab} />
                ))
                return <div className={styles.all}>{dpButtons}</div>
            case "edit":
            case "single":
                if (activeTab !== undefined) {
                    return <Department department={departments[activeTab]} edit={mode === "edit"} index={activeTab} />
                } else {
                    setMode("all")
                    break
                }

            case "add":
                return <AddDepartment onSubmit={handleAddDepartment} />
            default:
                break
        }
    }

    const handleAddDepartment = () => {
        setActiveTab(departments.length)
        setMode("single")
    }

    const toolbarResolver = {
        edit: () => {
            setMode("single")
        },
        single: () => {
            setMode("edit")
        },
        all: () => {
            setMode("add")
        },
        add: () => {
            setMode("all")
        },
    }

    const toolbarActionButtonLabel = (): string | undefined => {
        if (isAdmin) {
            switch (mode) {
                case "all":
                    return "Add department"
                case "single":
                    return "Edit department"
                case "edit":
                    return "Stop editing"
                default:
                    return undefined
            }
        }
        return undefined
    }

    return (
        <div className={styles.Departments}>
            <Toolbar
                label="Departments"
                actionLabel={toolbarActionButtonLabel()}
                buttons={departments}
                indexActive={activeTab}
                onClick={setTab}
                onAction={toolbarResolver[mode]}
            />
            <div className={styles.content}>{renderView()}</div>
        </div>
    )
}
export default Departments
