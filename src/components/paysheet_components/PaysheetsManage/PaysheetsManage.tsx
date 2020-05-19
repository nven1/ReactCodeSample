import React, { useEffect } from "react"
import styles from "./PaysheetsManage.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectUsers } from "../../../reducers/UserReducer"
import StaffOverview from "../../staff_components/StaffOverview/StaffOverview"
import { useParams } from "react-router"
import UserPaysheets from "../UserPaysheets/UserPaysheets"
import { selectAllPaysheets } from "../../../reducers/PaysheetsReducer"
import PaysheetsDataAccess from "../../../data_access/PaysheetsDataAccess"
import Endpoints from "../../../environments/endpoints"

interface PaysheetsManageProps {}

const PaysheetsManage: React.FC<PaysheetsManageProps> = (props) => {
    const dispatch = useDispatch()

    const users = useSelector(selectUsers)
    const paysheets = useSelector(selectAllPaysheets)

    const { id } = useParams()

    useEffect(() => {
        PaysheetsDataAccess.getAllPaysheets(dispatch)()

        // eslint-disable-next-line
    }, [])

    const getPaysheetsById = () => {
        return paysheets.filter((paysheet) => paysheet.userId.toString() === id)
    }

    const getUserName = () => {
        if (id) {
            const user = users.filter((user) => user.id.toString() === id)[0]
            if (user) {
                return `${user.firstName} ${user.lastName}`
            }
        }
    }

    return (
        <div className={styles.container}>
            <StaffOverview users={users} linkTo={`${Endpoints.appEndpoints.paysheets}/manage`} />
            {id && <UserPaysheets paysheets={getPaysheetsById()} title={getUserName()} />}
        </div>
    )
}
export default PaysheetsManage
