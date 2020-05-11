import React from "react"
import styles from "./SetVacationDaysForm.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import { UserType, UserSetVacationDaysRequestType } from "../../../types/UserTypes"
import Input from "../../common_components/inputs/Input/Input"
import Button from "../../common_components/buttons/Button/Button"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import Endpoints from "../../../environments/endpoints"
import UserDataAccess from "../../../data_access/UserDataAccess"
import { useDispatch } from "react-redux"
import { goTo } from "../../../utils/navHelpers"
import { useHistory } from "react-router"

interface SetVacationDaysFormProps {
    user: UserType
}

const currentYear = new Date().getFullYear()

const SetLeaveSchema = yup.object().shape({
    year: yup
        .number()
        .required()
        .min(currentYear - 1)
        .max(currentYear + 1),
    days: yup.number().required().min(0),
})

const SetVacationDaysForm: React.FC<SetVacationDaysFormProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { handleSubmit, errors, control } = useForm({
        validationSchema: SetLeaveSchema,
    })

    const onSubmit = (data: any) => {
        const submitData: UserSetVacationDaysRequestType = {
            userId: props.user.id,
            numberOfDays: data.days,
            year: data.year,
        }
        UserDataAccess.setNumberOfVacationDays(dispatch)(submitData, onSuccess)
    }

    const onSuccess = () => {
        history.push(goTo(Endpoints.appEndpoints.staff))
    }

    return (
        <div className={styles.container}>
            <Card variation="dynamic">
                <Title>Set Annual Leave</Title>
                <span className={styles.user}>{`${props.user.firstName} ${props.user.lastName}`}</span>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input label="Year" error={errors.year} />}
                        name="year"
                        control={control}
                        defaultValue={currentYear}
                        min={currentYear - 1}
                        max={currentYear + 1}
                        type="number"
                    />

                    <Controller
                        as={<Input label="Days" error={errors.year} />}
                        name="days"
                        control={control}
                        defaultValue={20}
                        min={0}
                        type="number"
                    />
                    <Button color="purple" submit>
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    )
}
export default SetVacationDaysForm
