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

interface StaffProps extends RouteComponentProps {}

const URL = Endpoints.appEndpoints.staff

const Staff: React.FC<StaffProps> = (props) => {
    const dispatch = useDispatch()

    const users = useSelector(selectUsers)
    const isAdmin = useSelector(selectIsAdmin)

    let { mode } = useParams()

    useEffect(() => {
        UserDataAccess.getUsers(dispatch)()

        // eslint-disable-next-line
    }, [])

    /*     const handleAddStaff = () => {
        //
    } */

    const goTo = (param: string, param2?: string) => () => {
        if (param === undefined) {
            props.history.push(URL)
        } else {
            props.history.push(`${URL}/${param}/${param2 ?? ""}`)
        }
    }

    const renderView = () => {
        if (mode === "all") {
            return <StaffOverview users={users} />
        } else if (users.length > 0 && mode !== undefined && !isNaN(Number(mode)) && Number(mode) <= users.length) {
            const user = users.filter((user) => user.id === Number(mode))[0]
            return <StaffDetail user={user} />
        } else if (mode === "add") {
            //
        } else if (users.length > 0 && Number(mode) > users.length) {
            goTo("all")()
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
