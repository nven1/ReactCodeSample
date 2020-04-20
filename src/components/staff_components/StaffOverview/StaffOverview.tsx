import React from "react"
import styles from "./StaffOverview.module.scss"
import Card from "../../common_components/containers/Card/Card"
import { UserType } from "../../../types/UserTypes"
import Title from "../../common_components/text/Title/Title"
import { Link } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"

interface StaffOverviewProps {
    users: Array<UserType>
}

const URL = Endpoints.appEndpoints.staff

const StaffOverview: React.FC<StaffOverviewProps> = (props) => {
    const goTo = (param: string, param2?: string) => () => {
        if (param === undefined) {
            return URL
        } else {
            return `${URL}/${param}/${param2 ?? ""}`
        }
    }
    return (
        <Card>
            <Title>Staff</Title>
            <ul className={styles.content}>
                {props.users.map((user) => (
                    <Link to={goTo(user.id.toString())} key={user.id} className={styles.user}>
                        {`${user.firstName} ${user.lastName}`}
                    </Link>
                ))}
            </ul>
        </Card>
    )
}
export default StaffOverview
