import React, { useState, useEffect, ChangeEvent } from "react"
import styles from "./Departments.module.scss"
import Toolbar from "../../bars/Toolbar/Toolbar"
import Button from "../../buttons/Button/Button"
import { useSelector, useDispatch } from "react-redux"
import { selectDepartments, editDepartment } from "../../../reducers/DepartmentReducer"
import Department from "../../subscreens/Department/Department"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import OverflowButton from "../../buttons/OverflowButton/OverflowButton"

interface DepartmentsProps {}

type Mode = "edit" | "single" | "all" | "add"

const Departments: React.FC<DepartmentsProps> = (props) => {
    const departments = useSelector(selectDepartments)
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState<number | undefined>(undefined)
    const [input, setInput] = useState<string>("")
    const [mode, setMode] = useState<Mode>("all")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    const dispatchActions = {
        addDepartment: () => {
            if (input.length > 2) {
                DepartmentDataAccess.getDepartments(dispatch)()
            }
        },

        editDepartment: () => {
            dispatch(editDepartment({ targetId: 0, department: { id: 0, name: "ayy lmao", image: "", members: [] } }))
        },
    }

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
                    return <Department department={departments[activeTab]} edit={mode === "edit"} />
                } else {
                    setMode("all")
                    break
                }

            case "add":
                return (
                    <>
                        <input value={input} onChange={handleInput} />
                        <Button color="purple" onClick={dispatchActions.addDepartment}>
                            Add departments
                        </Button>
                        <Button color="purple" onClick={dispatchActions.editDepartment}>
                            Edit Frontend
                        </Button>
                    </>
                )
            default:
                break
        }
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
        switch (mode) {
            case "edit":
                return "Stop editing"
            case "single":
                return "Edit department"
            case "all":
                return "Add department"
            default:
                return undefined
        }
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
