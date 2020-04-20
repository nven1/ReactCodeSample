import React, { useEffect } from "react"
import styles from "./Departments.module.scss"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"
import { useSelector, useDispatch } from "react-redux"
import { selectDepartments } from "../../../reducers/DepartmentReducer"
import Department from "../../departments_components/Department/Department"
import OverflowButton from "../../departments_components/OverflowButton/OverflowButton"
import AddDepartment from "../../departments_components/AddDepartment/AddDepartment"
import { selectIsAdmin } from "../../../reducers/UserReducer"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import { RouteComponentProps, useParams } from "react-router"
import Endpoints from "../../../environments/endpoints"

interface DepartmentsProps extends RouteComponentProps {}

const URL = Endpoints.appEndpoints.departments

const Departments: React.FC<DepartmentsProps> = (props) => {
    const dispatch = useDispatch()

    const departments = useSelector(selectDepartments)
    const isAdmin = useSelector(selectIsAdmin)

    let { mode, edit } = useParams()

    useEffect(() => {
        DepartmentDataAccess.getDepartments(dispatch)()

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // eslint-disable-next-line
    }, [props.location])

    const goTo = (param: string, param2?: string) => () => {
        if (param === undefined) {
            props.history.push(URL)
        } else {
            props.history.push(`${URL}/${param}/${param2 ?? ""}`)
        }
    }

    const renderView = () => {
        if (mode === "all") {
            return renderAll()
        } else if (
            departments.length > 0 &&
            mode !== undefined &&
            !isNaN(Number(mode)) &&
            Number(mode) <= departments.length
        ) {
            return renderSingle()
        } else if (mode === "add") {
            return <AddDepartment onSubmit={handleAddDepartment} />
        } else if (departments.length > 0 && Number(mode) > departments.length) {
            goTo("all")()
        }
    }

    const renderAll = () => {
        const dpButtons = departments.map((dp, index) => (
            <OverflowButton key={dp.id} index={index} department={dp} onClick={goTo(dp.id.toString())} />
        ))
        return <div className={styles.all}>{dpButtons}</div>
    }
    const renderSingle = () => {
        const dp = departments.filter((dp) => dp.id === Number(mode))[0]
        return <Department department={dp} edit={Boolean(edit)} />
    }

    const handleAddDepartment = () => {
        goTo(departments.length.toString())()
    }

    const toolbarResolver = (): string => {
        if (mode === "all") {
            return "add"
        } else if (mode !== undefined && !isNaN(Number(mode))) {
            return edit ? mode : `${mode}/edit`
        }
        return URL
    }

    const toolbarActionButtonLabel = (): string | undefined => {
        if (isAdmin) {
            if (mode === "all") {
                return "Add department"
            } else if (!isNaN(Number(mode))) {
                return edit ? "Stop editing" : "Edit Department"
            }
        }
        return undefined
    }

    return (
        <div className={styles.container}>
            <Toolbar
                url={URL}
                label="Departments"
                actionLabel={toolbarActionButtonLabel()}
                buttons={departments}
                onAction={toolbarResolver()}
            />
            <div className={styles.content}>{renderView()}</div>
        </div>
    )
}
export default Departments
