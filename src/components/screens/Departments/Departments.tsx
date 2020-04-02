import React, { useState, useEffect, ChangeEvent } from "react"
import styles from "./Departments.module.scss"
import Toolbar from "../../bars/Toolbar/Toolbar"
import IllustrationButton from "../../buttons/IllustrationButton/IllustrationButton"
import Button from "../../buttons/Button/Button"
import { useSelector, useDispatch } from "react-redux"
import { selectDepartments, addDepartment, editDepartment } from "../../../reducers/DepartmentReducer"
import Department from "../../subscreens/Department/Department"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import OverflowButton from "../../buttons/OverflowButton/OverflowButton"

interface DepartmentsProps {}

const Departments: React.FC<DepartmentsProps> = props => {
    const departments = useSelector(selectDepartments)
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState<number | undefined>(undefined)
    const [viewEdit, setViewEdit] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    const dispatchActions = {
        addDepartment: () => {
            if (input.length > 2) {
                dispatch(addDepartment([{ id: 2, name: input, image: "", members: [] }]))
                //DepartmentDataAccess.getDepartments(dispatch)()
            }
        },

        editDepartment: () => {
            dispatch(editDepartment({ targetId: 0, department: { id: 0, name: "ayy lmao", image: "", members: [] } }))
        }
    }

    const setTab = (index?: number) => {
        setActiveTab(index)
        if (viewEdit) {
            setViewEdit(false)
        }
    }

    const toolbarAction = () => {
        setViewEdit(true)
        setActiveTab(undefined)
    }

    const renderView = () => {
        if (!viewEdit) {
            if (activeTab === undefined) {
                const dpButtons = departments.map(dp => <OverflowButton department={dp} onClick={setTab} />)
                return dpButtons
            }
            return <Department department={departments[activeTab]} />
        }
        return (
            <>
                <input value={input} onChange={handleInput} />
                <Button variation="purple" onClick={dispatchActions.addDepartment}>
                    Add departments
                </Button>
                <Button variation="purple" onClick={dispatchActions.editDepartment}>
                    Edit Frontend
                </Button>
            </>
        )
    }

    return (
        <div className={styles.Departments}>
            <Toolbar
                parent="Departments"
                buttons={departments}
                indexActive={activeTab}
                onClick={setTab}
                onAction={toolbarAction}
            />
            <div className={styles.content}>{renderView()}</div>
        </div>
    )
}
export default Departments
