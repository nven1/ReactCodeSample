import React, { useState, useEffect } from "react"
import styles from "./StaffAdd.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import Input from "../../common_components/inputs/Input/Input"
import Button from "../../common_components/buttons/Button/Button"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { selectDepartments } from "../../../reducers/DepartmentReducer"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"
import { selectRoles } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import { UserCreateRequestType, UserType, UserUpdateRequestType } from "../../../types/UserTypes"
import { RouteComponentProps, withRouter } from "react-router"
import Endpoints from "../../../environments/endpoints"
import { goTo } from "../../../utils/navHelpers"

interface StaffAddProps extends RouteComponentProps {
    user?: UserType
}

const AddStaffSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    department: yup.number().required(),
    roles: yup.array().of(yup.number()).min(1).required(),
})

type Mode = undefined | "department" | "roles"

const StaffAdd: React.FC<StaffAddProps> = (props) => {
    const dispatch = useDispatch()
    const departments = useSelector(selectDepartments)
    const roles = useSelector(selectRoles)

    const { handleSubmit, errors, control, setValue, getValues } = useForm({
        validationSchema: AddStaffSchema,
    })

    useEffect(() => {
        if (props.user) {
            setValue([
                { firstName: props.user.firstName },
                { lastName: props.user.lastName },
                { email: props.user.email },
                { department: props.user.department.id },
                { roles: props.user.roles.map((role) => role.id) },
            ])
        }

        // eslint-disable-next-line
    }, [props])

    const [modeState, setMode] = useState<Mode>(undefined)

    const onSubmit = (data: any) => {
        if (props.user) {
            const castData: UserUpdateRequestType = {
                firstName: data.firstName,
                lastName: data.lastName,
                departmentId: data.department,
                dateOfEmployment: "2020-04-21", //TODO
                isManager: !!data.roles.filter((role: number) => role === (1 || 2)).length,
                roles: data.roles,
            }
            UserDataAccess.updateUser(dispatch)(props.user.id, castData, onSuccess)
        } else {
            const castData: UserCreateRequestType = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                departmentId: data.department,
                isManager: !!data.roles.filter((role: number) => role === (1 || 2)).length,
                dateOfEmployment: "2020-04-21", //TODO
                roles: data.roles,
            }
            UserDataAccess.createUser(dispatch)(castData, onSuccess)
        }
    }

    const onSuccess = () => {
        if (props.user) {
            props.history.push(goTo(Endpoints.appEndpoints.staff, props.user.id.toString()))
        } else {
            props.history.push(Endpoints.appEndpoints.staff)
        }
    }

    const handleSetMode = (mode: Mode) => {
        if (mode === modeState) {
            setMode(undefined)
        } else if (mode === "department") {
            if (departments.length === 0) {
                DepartmentDataAccess.getDepartments(dispatch)()
            }
            setMode(mode)
        } else if (mode === "roles") {
            if (roles.length === 0) {
                console.log(roles)

                UserDataAccess.getRoles(dispatch)()
            }
            setMode(mode)
        }
    }

    const setDepartment = (id: number) => () => {
        setValue("department", id)
        setMode(undefined)
    }

    const handleSetRoles = (id: number) => () => {
        console.log(getValues().roles.length)

        if (getValues().roles.includes(id)) {
            setValue(
                "roles",
                getValues().roles.filter((item: number) => item !== id)
            )
        } else {
            setValue("roles", [...getValues().roles, id])
        }
    }

    const pickDepartment = (
        <div>
            <Subtitle>Departments</Subtitle>
            <div className={styles.pills}>
                {departments.map((dp) => {
                    return (
                        <Button
                            key={dp.id}
                            color={getValues().department === dp.id ? "purple" : "grey"}
                            onClick={setDepartment(dp.id)}
                        >
                            {dp.name}
                        </Button>
                    )
                })}
            </div>
        </div>
    )

    const pickRoles = (
        <div>
            <Subtitle>Roles</Subtitle>
            <div className={styles.pills}>
                {roles.map((role) => {
                    return (
                        <Button
                            key={role.id}
                            color={getValues().roles.includes(role.id) ? "purple" : "grey"}
                            onClick={handleSetRoles(role.id)}
                        >
                            {role.name}
                        </Button>
                    )
                })}
            </div>
        </div>
    )

    const renderCard = () => {
        if (modeState === "department") {
            return pickDepartment
        } else {
            return pickRoles
        }
    }

    return (
        <div className={styles.container}>
            <Card variation="dynamic">
                <div className={styles.content}>
                    <Title>Add staff</Title>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={<Input label="First Name" error={errors.firstName} />}
                            name="firstName"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            as={<Input label="Last Name" error={errors.lastName} />}
                            name="lastName"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            as={<Input label="Email" error={errors.email} />}
                            name="email"
                            disabled
                            control={control}
                            defaultValue=""
                        />
                        <div className={styles.buttonsContainer}>
                            <Controller
                                as={<Button color={errors.department ? "red" : "purple"}>Department</Button>}
                                name="department"
                                control={control}
                                value=""
                                onClick={() => handleSetMode("department")}
                            />
                            <Controller
                                as={<Button color={errors.roles ? "red" : "purple"}>Roles</Button>}
                                id="roles"
                                name="roles"
                                control={control}
                                defaultValue={[]}
                                onClick={() => handleSetMode("roles")}
                            />
                        </div>

                        <div className={styles.submitContainer}>
                            <Button submit color="purple" size="large">
                                {props.user ? "Update" : "Add"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
            {modeState && <Card onClose={() => handleSetMode(undefined)}>{renderCard()}</Card>}
        </div>
    )
}
export default withRouter(StaffAdd)
