import React, { useState } from "react"
import styles from "./AddDepartment.module.scss"
import Card from "../../containers/Container/Card"
import Title from "../../text/Title/Title"
import Input from "../../inputs/Input/Input"
import { useForm, Controller } from "react-hook-form"
import Button from "../../buttons/Button/Button"
import { imageTypes, ImageType } from "../../../utils/getImage"
import SquareButton from "../../buttons/SquareButton/SquareButton"
import BackgroundImage from "../../indicators/Illustration/BackgroundImage"
import * as yup from "yup"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import { DepartmentRequestType } from "../../../types/DepartmentTypes"
import { useDispatch } from "react-redux"

interface AddDepartmentProps {
    onSubmit: () => void
}

const AddDepartmentSchema = yup.object().shape({
    name: yup.string().required(),
    picture: yup.string().required(),
})

const AddDepartment: React.FC<AddDepartmentProps> = (props) => {
    const dispatch = useDispatch()
    const { handleSubmit, errors, control, setValue, getValues } = useForm({
        validationSchema: AddDepartmentSchema,
    })
    const [pictureMode, setPictureMode] = useState<boolean>(false)

    const onSubmit = (data: any) => {
        DepartmentDataAccess.createDepartment(dispatch)(data as DepartmentRequestType, props.onSubmit)
    }

    const handlePictureChange = (image: ImageType) => {
        setPictureMode(!pictureMode)
        setValue("picture", image)
    }

    const handlePictureMode = () => {
        setPictureMode(!pictureMode)
    }

    return (
        <div className={styles.container}>
            <Card variation="dynamic">
                <Title>Add department</Title>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input label="Name" error={errors.name} />}
                        name="name"
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        as={<Button color={errors.picture ? "red" : "purple"}>Choose icon</Button>}
                        name="picture"
                        control={control}
                        value=""
                        onClick={handlePictureMode}
                    />

                    <Button color="purple" submit>
                        Submit
                    </Button>
                </form>
            </Card>
            {pictureMode && (
                <Card onClose={handlePictureMode}>
                    <div className={styles.imagesContainer}>
                        {imageTypes.map((image, index) => (
                            <SquareButton key={index} image={image} onClick={handlePictureChange} />
                        ))}
                    </div>
                </Card>
            )}
            {getValues().picture && <BackgroundImage image={getValues().picture} />}
        </div>
    )
}
export default AddDepartment
