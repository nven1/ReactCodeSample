import React, { useState } from "react"
import styles from "./DepartmentList.module.scss"
import { ReassignDialogProps } from "../Department/Department"
import { useSelector, useDispatch } from "react-redux"
import { selectDepartments } from "../../../reducers/DepartmentReducer"
import Button from "../../buttons/Button/Button"
import Card from "../../containers/Card/Card"
import { UserDepartmentAndRoleType } from "../../../types/UserTypes"
import UserDataAccess from "../../../data_access/UserDataAccess"

const DepartmentList: React.FC<ReassignDialogProps> = (props) => {
    const dispatch = useDispatch()
    const departments = useSelector(selectDepartments)

    const [targetDepartment, setTargetDepartment] = useState<UserDepartmentAndRoleType>()

    const handleRolePick = (departmentId: number, isManager: boolean) => () => {
        setTargetDepartment({ departmentId: departmentId, isManager: isManager })
    }

    const handleConfirm = () => {
        if (props.user && targetDepartment) {
            UserDataAccess.reassignUser(dispatch)(props.user?.id, targetDepartment, props.onClose)
        }
    }

    const handleClose = () => {
        props.onClose()
    }

    const renderList = departments.map((department, index) => {
        return (
            <div key={department.id} className={styles.item}>
                <div>{department.name}</div>
                <div>
                    {!(props.rootDepartmentId === index && props.user?.isManager) && (
                        <Button color="red" size="small" onClick={handleRolePick(department.id, true)}>
                            Head
                        </Button>
                    )}
                </div>
                <div>
                    {!(props.rootDepartmentId === index && !props.user?.isManager) && (
                        <Button color="purple" size="small" onClick={handleRolePick(department.id, false)}>
                            Staff
                        </Button>
                    )}
                </div>
            </div>
        )
    })

    const renderConfirm = () => {
        if (targetDepartment !== undefined) {
            const chosenDepartment = departments.filter((department) => department.id === targetDepartment.departmentId)
            return (
                <div className={styles.confirm}>
                    <div>
                        {`Move ${props.user?.firstName} ${props.user?.lastName}
                        to ${chosenDepartment[0].name} department as
                        ${targetDepartment.isManager ? "Head" : "Staff"}`}
                    </div>

                    <Button color="purple" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </div>
            )
        }
    }

    return (
        <Card onClose={handleClose}>
            <div className={targetDepartment ? styles.layoutPicked : styles.layout}>
                <div className={styles.list}>
                    <div className={styles.title}>{`${props.user?.firstName} ${props.user?.lastName}`}</div>
                    {renderList}
                </div>
                {renderConfirm()}
            </div>
        </Card>
    )
}

export default DepartmentList
