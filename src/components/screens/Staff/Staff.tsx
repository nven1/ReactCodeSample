import React, { useEffect } from "react"
import styles from "./Staff.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers, selectIsAdmin } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"
import { useParams, RouteComponentProps, withRouter } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import StaffOverview from "../../staff_components/StaffOverview/StaffOverview"
import StaffDetail from "../../staff_components/StaffDetail/StaffDetail"
import { goTo } from "../../../utils/navHelpers"
import StaffAdd from "../../staff_components/StaffAdd/StaffAdd"

interface StaffProps extends RouteComponentProps {}

const URL = Endpoints.appEndpoints.staff

const Staff: React.FC<StaffProps> = (props) => {
    const dispatch = useDispatch()

    const users = useSelector(selectUsers)
    const isAdmin = useSelector(selectIsAdmin)

    const { mode, action } = useParams()

    useEffect(() => {
        UserDataAccess.getUsers(dispatch)()

        // eslint-disable-next-line
    }, [])

    //TODO
    /*     const handleAddStaff = () => {
        //
    } 
    */
    const navigate = (param: string) => () => {
        props.history.push(goTo(URL, param))
    }

    const renderView = () => {
        if (mode === "all") {
            return <StaffOverview users={users} />
        } else if (users.length > 0 && !isNaN(Number(mode))) {
            const user = users.filter((user) => user.id === Number(mode))[0]
            if (user) {
                if (action === "edit") {
                    return <StaffAdd user={user} />
                }
                return <StaffDetail user={user} />
            } else {
                navigate("all")()
            }
        } else if (mode === "add") {
            return <StaffAdd />
        }
    }

    const toolbarActionButtonLabel = (): string | undefined => {
        if (isAdmin) {
            if (mode === "all") {
                return "Add staff"
            } else {
                return ""
            }
        }
        return undefined
    }

    return (
        <div className={styles.container}>
            <Toolbar url={URL} label="Staff" actionLabel={toolbarActionButtonLabel()} onAction={"add"} />
            <div className={styles.content}>{renderView()}</div>
        </div>
    )
}

export default withRouter(Staff)
