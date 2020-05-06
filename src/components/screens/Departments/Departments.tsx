import React, { useEffect } from "react"
import styles from "./Departments.module.scss"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"
import { useSelector, useDispatch } from "react-redux"
import { selectDepartments } from "../../../reducers/DepartmentReducer"
import Department from "../../departments_components/Department/Department"
import OverflowButton from "../../departments_components/OverflowButton/OverflowButton"
import AddDepartmentForm from "../../departments_components/AddDepartmentForm/AddDepartmentForm"
import { selectIsAdmin } from "../../../reducers/UserReducer"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import { useParams, Switch, Route, useHistory } from "react-router"
import Endpoints from "../../../environments/endpoints"
import { goTo, isNum } from "../../../utils/navHelpers"

interface DepartmentsProps {}

const URL = Endpoints.appEndpoints.departments

const Departments: React.FC<DepartmentsProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const departments = useSelector(selectDepartments)
    const isAdmin = useSelector(selectIsAdmin)

    const { mode, edit } = useParams()

    useEffect(() => {
        DepartmentDataAccess.getDepartments(dispatch)()

        // eslint-disable-next-line
    }, [])

    const navigate = (param: string) => () => {
        history.push(goTo(URL, param))
    }

    const renderAll = () => {
        const dpButtons = departments.map((dp, index) => (
            <OverflowButton key={dp.id} index={index} department={dp} onClick={navigate(dp.id.toString())} />
        ))
        return <div className={styles.all}>{dpButtons}</div>
    }
    const renderSingle = () => {
        const dp = departments.filter((dp) => dp.id === Number(mode))[0]
        if (dp) {
            return <Department department={dp} edit={Boolean(edit)} />
        }
    }

    const handleAddDepartment = () => {
        navigate(departments.length.toString())()
    }

    const toolbarResolver = (): string => {
        if (!mode) {
            return "add"
        } else if (mode !== undefined && !isNaN(Number(mode))) {
            return edit ? mode : `${mode}/edit`
        }
        return URL
    }

    const toolbarActionButtonLabel = (): string | undefined => {
        if (isAdmin) {
            if (!mode) {
                return "Add department"
            } else if (!isNaN(Number(mode))) {
                return edit ? "Stop editing" : "Edit Department"
            }
        }
        return undefined
    }

    const buttons = departments.map((dp) => {
        return { key: dp.id.toString(), text: dp.name }
    })

    return (
        <div className={styles.container}>
            <Toolbar
                url={URL}
                label="Departments"
                actionLabel={toolbarActionButtonLabel()}
                buttons={buttons}
                onAction={toolbarResolver()}
            />
            <div className={styles.content}>
                <Switch>
                    <Route exact path={URL} render={renderAll} />
                    <Route path={`${URL}/:mode${isNum}`} render={renderSingle} />
                    {isAdmin && (
                        <Route
                            exact
                            path={`${URL}/add`}
                            render={() => <AddDepartmentForm onSubmit={handleAddDepartment} />}
                        />
                    )}
                    {departments.length > 0 && <Route path="*">Insert a 404 screen</Route>}
                </Switch>
            </div>
        </div>
    )
}
export default Departments
