import React, { useEffect } from "react"
import styles from "./Profile.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectMe } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import StaffDetail from "../../staff_components/StaffDetail/StaffDetail"
import Toolbar from "../../common_components/bars/Toolbar/Toolbar"
import Endpoints from "../../../environments/endpoints"

interface ProfileProps {}

const URL = Endpoints.appEndpoints.user

const Profile: React.FC<ProfileProps> = (props) => {
    const dispatch = useDispatch()

    const me = useSelector(selectMe)

    useEffect(() => {
        console.log(me)

        if (!me) {
            UserDataAccess.getMyUser(dispatch)()
        }

        // eslint-disable-next-line
    }, [me])

    return (
        <>
            <Toolbar label="Profile" url={URL} />
            <div className={styles.container}>{me && <StaffDetail user={me} />}</div>
        </>
    )
}
export default Profile
