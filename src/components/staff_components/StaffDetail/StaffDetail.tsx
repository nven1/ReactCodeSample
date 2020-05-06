import React, { useState } from "react"
import styles from "./StaffDetail.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import { UserType } from "../../../types/UserTypes"
import { selectIsAdmin, selectMe } from "../../../reducers/UserReducer"
import { useSelector, useDispatch } from "react-redux"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"
import LinkButton from "../../common_components/buttons/LinkButton/LinkButton"
import Endpoints from "../../../environments/endpoints"
import { useParams, withRouter, RouteComponentProps } from "react-router"
import BackgroundImage from "../../common_components/indicators/Illustration/BackgroundImage"
import { goTo } from "../../../utils/navHelpers"
import Dialog from "../../common_components/containers/Dialog/Dialog"
import Button from "../../common_components/buttons/Button/Button"
import UserDataAccess from "../../../data_access/UserDataAccess"
import { Token } from "../../../utils/storageKeys"
import { monthNames } from "../../../utils/dateHelpers"

interface StaffDetailProps extends RouteComponentProps {
    user: UserType
}

const URL = Endpoints.appEndpoints.staff

type DialogMode = undefined | "reset" | "deactivate"

export interface ResetPasswordType {
    email: string
}

const StaffDetail: React.FC<StaffDetailProps> = (props) => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(selectIsAdmin)
    const me = useSelector(selectMe)

    const { mode } = useParams()

    const [dialogState, setDialogState] = useState<DialogMode>()

    const handleSetDialogState = (state: DialogMode) => () => {
        setDialogState(state)
    }

    const handleDeactivate = () => {
        UserDataAccess.deactivateUser(dispatch)(props.user.id, onSuccess)
    }

    const handleResetPassword = () => {
        UserDataAccess.resetPassword(dispatch)({ email: props.user.email } as ResetPasswordType, onSuccess)
    }

    const onSuccess = () => {
        if (me && props.user.id === me.id) {
            UserDataAccess.clearUserReducer(dispatch)()
            localStorage.removeItem(Token)
            props.history.push(Endpoints.appEndpoints.root)
        } else {
            props.history.push(URL, "all")
        }
    }

    const renderDialog = () => {
        if (dialogState === "reset") {
            return resetPasswordContent
        } else {
            return deactivateContent
        }
    }

    const resetPasswordContent = (
        <div className={styles.dialog}>
            <Subtitle>{`Reset password for ${props.user.firstName} ${props.user.lastName}?`}</Subtitle>
            <Button color="red" onClick={handleResetPassword}>
                CONFIRM
            </Button>
        </div>
    )

    const deactivateContent = (
        <div className={styles.dialog}>
            <Subtitle>{`Deactivate ${props.user.firstName} ${props.user.lastName}?`}</Subtitle>
            <Button color="red" onClick={handleDeactivate}>
                CONFIRM
            </Button>
        </div>
    )

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
                        <div className={styles.buttonAdjust}>
                            <Button color="purple" onClick={handleSetDialogState("reset")}>
                                Reset Password
                            </Button>
                        </div>
                        {isAdmin && (
                            <LinkButton to={goTo(URL, mode ?? "", "set_leave")} color="purple">
                                Set Annual Leave
                            </LinkButton>
                        )}
                        <div className={styles.buttonAdjust}>
                            <Button color="red" onClick={handleSetDialogState("deactivate")}>
                                Deactivate
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
            <BackgroundImage image={props.user.department.image} />
            <Dialog open={!!dialogState} onClose={handleSetDialogState(undefined)}>
                <Card onClose={handleSetDialogState(undefined)}>{renderDialog()}</Card>
            </Dialog>
        </>
    )
}
export default withRouter(StaffDetail)
