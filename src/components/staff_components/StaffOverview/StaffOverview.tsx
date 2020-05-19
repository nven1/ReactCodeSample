import React from "react"
import styles from "./StaffOverview.module.scss"
import Card from "../../common_components/containers/Card/Card"
import { UserType } from "../../../types/UserTypes"
import Title from "../../common_components/text/Title/Title"
import { Link, useRouteMatch } from "react-router-dom"
import Endpoints from "../../../environments/endpoints"
import { goTo } from "../../../utils/navHelpers"

interface StaffOverviewProps {
    users: Array<UserType>
}

const URL_STAFF = Endpoints.appEndpoints.staff
const URL_PAYSHEETS = `${Endpoints.appEndpoints.paysheets}/manage`

const StaffOverview: React.FC<StaffOverviewProps> = (props) => {
    const isPaysheets = useRouteMatch({
        path: URL_PAYSHEETS,
    })

    return (
        <Card>
            <Title>Staff</Title>
            <ul className={styles.content}>
                {props.users.map((user) => (
                    <Link
                        to={goTo(isPaysheets ? URL_PAYSHEETS : URL_STAFF, user.id.toString())}
                        key={user.id}
                        className={styles.user}
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </Link>
                ))}
            </ul>
        </Card>
    )
}
export default StaffOverview
