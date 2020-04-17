import React, { useEffect } from "react"
import styles from "./Staff.module.scss"
import Card from "../../containers/Card/Card"
import Title from "../../text/Title/Title"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"

interface StaffProps {}

const Staff: React.FC<StaffProps> = (props) => {
    const dispatch = useDispatch()
    const users = useSelector(selectUsers)

    useEffect(() => {
        UserDataAccess.getUsers(dispatch)()
        // eslint-disable-next-line
    }, [])

    const userList = users.map((user) => <span className={styles.user}>{`${user.firstName} ${user.lastName}`}</span>)
    return (
        <div className={styles.container}>
            <Card>
                <Title>Staff</Title>
                {userList}
            </Card>
        </div>
    )
}
export default Staff
