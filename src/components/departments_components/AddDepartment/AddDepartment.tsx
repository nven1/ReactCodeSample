import React, { useState } from "react"
import styles from "./AddDepartment.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import Input from "../../common_components/inputs/Input/Input"
import { useForm, Controller } from "react-hook-form"
import Button from "../../common_components/buttons/Button/Button"
import { departmentImages, DepartmentImage } from "../../../utils/getImage"
import SquareButton from "../SquareButton/SquareButton"
import BackgroundImage from "../../common_components/indicators/Illustration/BackgroundImage"
import * as yup from "yup"
import DepartmentDataAccess from "../../../data_access/DepartmentDataAccess"
import { DepartmentRequestType } from "../../../types/DepartmentTypes"
import { useDispatch } from "react-redux"

interface AddDepartmentProps {
    onSubmit: () => void
}

const AddDepartmentSchema = yup.object().shape({
    name: yup.string().required(),
    image: yup.string().required(),
})

const AddDepartment: React.FC<AddDepartmentProps> = (props) => {
    const dispatch = useDispatch()
    const { handleSubmit, errors, control, setValue, getValues } = useForm({
        validationSchema: AddDepartmentSchema,
    })
    const [imageMode, setImageMode] = useState<boolean>(false)

    const onSubmit = (data: any) => {
        DepartmentDataAccess.createDepartment(dispatch)(data as DepartmentRequestType, props.onSubmit)
    }

    const handleImageChange = (image: DepartmentImage) => {
        setImageMode(!imageMode)
        setValue("image", image)
    }

    const handleImageMode = () => {
        setImageMode(!imageMode)
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
                        as={<Button color={errors.image ? "red" : "purple"}>Choose icon</Button>}
                        name="image"
                        control={control}
                        value=""
                        onClick={handleImageMode}
                    />

                    <Button color="purple" submit>
                        Submit
                    </Button>
                </form>
            </Card>
            {imageMode && (
                <Card onClose={handleImageMode}>
                    <div className={styles.imagesContainer}>
                        {departmentImages.map((image, index) => (
                            <SquareButton key={index} image={image} onClick={handleImageChange} />
                        ))}
                    </div>
                </Card>
            )}
            {getValues().image && <BackgroundImage image={getValues().image} />}
        </div>
    )
}
export default AddDepartment
