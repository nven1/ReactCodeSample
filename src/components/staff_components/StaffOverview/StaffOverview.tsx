import React from "react"
import styles from "./StaffOverview.module.scss"
import Card from "../../common_components/containers/Card/Card"
import { UserType } from "../../../types/UserTypes"
import Title from "../../common_components/text/Title/Title"
import { Link } from "react-router-dom"
import { goTo } from "../../../utils/navHelpers"

interface StaffOverviewProps {
    users: Array<UserType>
    linkTo: string
}

const StaffOverview: React.FC<StaffOverviewProps> = (props) => {
    return (
        <Card>
            <Title>Staff</Title>
            <ul className={styles.content}>
                {props.users.map((user) => (
                    <Link to={goTo(props.linkTo, user.id.toString())} key={user.id} className={styles.user}>
                        {`${user.firstName} ${user.lastName}`}
                    </Link>
                ))}
            </ul>
        </Card>
    )
}
export default StaffOverview
