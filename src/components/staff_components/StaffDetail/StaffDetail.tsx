import React, { useEffect } from "react"
import styles from "./StaffDetail.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import { UserType } from "../../../types/UserTypes"
import { selectIsAdmin, selectMe } from "../../../reducers/UserReducer"
import { useSelector } from "react-redux"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"
import LinkButton from "../../common_components/buttons/LinkButton/LinkButton"
import Endpoints from "../../../environments/endpoints"
import { useParams } from "react-router"
import BackgroundImage from "../../common_components/indicators/Illustration/BackgroundImage"
import { goTo } from "../../../utils/navHelpers"

interface StaffDetailProps {
    user: UserType
}

const URL = Endpoints.appEndpoints.staff

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const StaffDetail: React.FC<StaffDetailProps> = (props) => {
    const isAdmin = useSelector(selectIsAdmin)
    const me = useSelector(selectMe)

    const { mode } = useParams()

    const role = `${props.user.isManager ? "Head of" : "Staff in"} ${props.user.department.name}`

    const from = new Date(props.user.dateOfEmployment)
    const fromText = `Since ${monthNames[from.getMonth()]}, ${from.getFullYear()}`

    return (
        <>
            <Card>
                <div className={styles.content}>
                    <Title>{`${props.user.firstName} ${props.user.lastName}`}</Title>
                    <Subtitle>{role}</Subtitle>
                    <p>{props.user.email}</p>
                    <p>
                        <i>{fromText}</i>
                    </p>
                    <p>
                        <b>{props.user.isActive ? "Active" : "Inactive"}</b>
                    </p>
                </div>
            </Card>

            {(isAdmin || props.user.id === me?.id) && (
                <Card>
                    <div className={styles.manageContent}>
                        <LinkButton to={goTo(URL, mode ?? "", "edit")} color="purple">
                            Edit Info
                        </LinkButton>
                        <LinkButton to={goTo(URL, mode ?? "", "reset")} color="purple">
                            Reset Password
                        </LinkButton>
                        {isAdmin && (
                            <LinkButton to={goTo(URL, mode ?? "", "set_leave")} color="purple">
                                Set Annual Leave
                            </LinkButton>
                        )}
                        <LinkButton to={goTo(URL, mode ?? "", "deactivate")} color="red">
                            Deactivate
                        </LinkButton>
                    </div>
                </Card>
            )}
            <BackgroundImage image={props.user.department.image} />
        </>
    )
}
export default StaffDetail
