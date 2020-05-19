import React, { useState, useEffect } from "react"
import styles from "./AddPaysheetForm.module.scss"
import Card from "../../common_components/containers/Card/Card"
import SideSelect, { SideSelectOptionType } from "../../common_components/inputs/Select/SideSelect"
import { monthNames } from "../../../utils/dateHelpers"
import moment from "moment"
import { useLocation, useParams, useHistory } from "react-router"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { PaysheetType, selectAllPaysheets } from "../../../reducers/PaysheetsReducer"
import Button from "../../common_components/buttons/Button/Button"
import PaysheetsDataAccess from "../../../data_access/PaysheetsDataAccess"
import { useDispatch, useSelector } from "react-redux"
import ConfirmationDialogContent from "../../common_components/containers/ConfirmationDialog/ConfirmationDialogContent"
import Dialog from "../../common_components/containers/Dialog/Dialog"
import Endpoints from "../../../environments/endpoints"
import { setErrorAction } from "../../../reducers/ErrorReducer"
import { selectUsers } from "../../../reducers/UserReducer"
import UserDataAccess from "../../../data_access/UserDataAccess"
import { UserType } from "../../../types/UserTypes"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"

interface AddPaysheetFormProps {}

const AddPaysheetSchema = yup.object().shape({
    userId: yup.string().required(),
    month: yup.number().required(),
    year: yup.number().required(),
    type: yup.string().required(),
    file: yup.boolean().required(),
})

const monthOptions: Array<SideSelectOptionType> = monthNames.map((month, index) => {
    return { label: month, value: index.toString() }
})

const timeLastMonth = moment().subtract(1, "month")
const lastMonth = moment(timeLastMonth).month()
const yearLastMonth = moment(timeLastMonth).year()
const currentYear = moment().year()

var years: Array<SideSelectOptionType> = []

for (let year = 2017; year <= currentYear; year++) {
    years.push({ label: year.toString(), value: year.toString() })
}

const AddPaysheetForm: React.FC<AddPaysheetFormProps> = (props) => {
    const dispatch = useDispatch()

    const paysheets = useSelector(selectAllPaysheets)
    const users = useSelector(selectUsers)

    const location = useLocation()
    const history = useHistory()
    const { id } = useParams()

    const [file, setFile] = useState<any>()
    const [dialogState, setDialogState] = useState<boolean>(false)
    const [confirmedSubmit, setConfirmedSubmit] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")

    useEffect(() => {
        const urlData: Array<PaysheetType> = location.state as Array<PaysheetType>
        if (urlData) {
            setValue([{ month: urlData[0].month }, { year: urlData[0].year }, { type: urlData[0].type }])
        } else {
            setValue([{ month: lastMonth }, { year: yearLastMonth }, { type: "PAYCHECK" }])
        }
        setValue("userId", id)

        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (file) {
            setValue("file", true)
        } else {
            setValue("file", "")
        }

        //eslint-disable-next-line
    }, [file])

    useEffect(() => {
        if (users.length === 0) {
            UserDataAccess.getUsers(dispatch)()
        } else if (users.length > 0) {
            const user: UserType = users.filter((user) => user.id.toString() === id)[0]
            setUserName(`${user.firstName} ${user.lastName}`)
        }

        //eslint-disable-next-line
    }, [users])

    useEffect(() => {
        if (paysheets.length === 0) {
            PaysheetsDataAccess.getAllPaysheets(dispatch)()
        }

        //eslint-disable-next-line
    }, [paysheets])

    useEffect(() => {
        if (confirmedSubmit) {
            handleSubmit(onSubmit)()
        }

        //eslint-disable-next-line
    }, [confirmedSubmit])

    const { handleSubmit, errors, control, setValue, getValues, watch } = useForm({
        validationSchema: AddPaysheetSchema,
    })

    const onSubmit = (data: any) => {
        const errorFuture = isInFuture(data.month, data.year)
        const errorPaysheetExists = doesExist(data)
        if (!errorFuture) {
            if (confirmedSubmit || !errorPaysheetExists) {
                const formData = new FormData()
                formData.append("file", file)
                formData.append("month", data.month)
                formData.append("type", data.type)
                formData.append("year", data.year)
                formData.append("userId", data.userId)
                console.log(data)

                PaysheetsDataAccess.uploadPDF(dispatch)(formData, onSuccess)
            } else {
                toggleDialogOpen()
            }
        } else {
            dispatch(setErrorAction("Time period can't be in the future"))
        }
    }

    const isInFuture = (month: string, year: string) => {
        if (Number(year) === moment().year()) {
            if (Number(month) >= moment().month()) {
                return true
            }
        }
        return false
    }

    const doesExist = (data: any) => {
        const list = paysheets
            .map((paysheet) => {
                if (
                    paysheet.month === +data.month &&
                    paysheet.year === +data.year &&
                    paysheet.userId === +data.userId &&
                    paysheet.type === data.type
                ) {
                    return paysheet
                }
                return undefined
            })
            .filter((item) => item !== undefined)
        return !!list.length
    }

    const onSuccess = () => {
        history.push(Endpoints.appEndpoints.paysheets)
    }

    const handleMonthSelect = (month: number) => {
        setValue("month", month)
    }

    const handleYearSelect = (year: number) => {
        setValue("year", year)
    }

    const handleTypeSelect = (type: "PAYCHECK" | "BONUS") => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setValue("type", type)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.currentTarget.files) {
            setFile(e.currentTarget.files[0])
        }
    }

    const toggleDialogOpen = () => {
        setDialogState(!dialogState)
    }

    const handleConfirmOverwrite = () => {
        setConfirmedSubmit(true)
        toggleDialogOpen()
    }

    const getYearIndex = () => {
        const yearIndex = years
            .map((year, index) => {
                if (Number(year.value) === getValues().year) {
                    return index
                }
                return undefined
            })
            .filter((year) => year !== undefined)[0]

        return yearIndex
    }

    watch("file")
    watch("type")

    return (
        <div className={styles.container}>
            <Card>
                <form className={styles.form}>
                    <Subtitle>{userName ?? "Users Name"}</Subtitle>
                    <Controller
                        as={
                            <SideSelect
                                label="Month"
                                options={monthOptions}
                                cardFit
                                selectedIndex={getValues().month}
                                onSelect={handleMonthSelect}
                            />
                        }
                        name="month"
                        control={control}
                    />

                    <Controller
                        as={
                            <SideSelect
                                label="Year"
                                options={years}
                                cardFit
                                selectedIndex={getYearIndex()}
                                onSelect={handleYearSelect}
                            />
                        }
                        name="year"
                        control={control}
                    />

                    <Controller
                        as={
                            <div className={styles.dualButton}>
                                <div>
                                    <Button
                                        onClick={handleTypeSelect("PAYCHECK")}
                                        color={getValues().type === "PAYCHECK" ? "purple" : "grey"}
                                    >
                                        PAYCHECK
                                    </Button>
                                    <Button
                                        onClick={handleTypeSelect("BONUS")}
                                        color={getValues().type === "BONUS" ? "purple" : "grey"}
                                    >
                                        BONUS
                                    </Button>
                                </div>
                            </div>
                        }
                        name="type"
                        value={getValues().type}
                        control={control}
                    />
                    <Controller
                        as={
                            <div className={errors.file ? styles.errorUpload : styles.uploadSection}>
                                <label htmlFor="fileInput">
                                    UPLOAD
                                    <input type="file" id="fileInput" onChange={handleFileSelect} value={""} />
                                </label>
                                <span>{file ? file.name.replace("C:\\fakepath\\", "") : "No file selected"}</span>
                            </div>
                        }
                        name="file"
                        control={control}
                    />

                    <Controller as={<div />} name="userId" control={control} />

                    <div className={styles.submit} onClick={handleSubmit(onSubmit)}>
                        <Button color="purple" submit>
                            SUBMIT
                        </Button>
                    </div>
                </form>
            </Card>

            <Dialog open={dialogState} onClose={toggleDialogOpen}>
                <ConfirmationDialogContent confirmAction={handleConfirmOverwrite} onClose={toggleDialogOpen}>
                    Overwrite?
                </ConfirmationDialogContent>
            </Dialog>
        </div>
    )
}
export default AddPaysheetForm
