import React, { useState } from "react"
import styles from "./AddDepartment.module.scss"
import Container from "../../containers/Container/Container"
import Title from "../../text/Title/Title"
import Input from "../../inputs/Input/Input"
import { useForm, Controller } from "react-hook-form"
import Button from "../../buttons/Button/Button"

interface AddDepartmentProps {}

const AddDepartment: React.FC<AddDepartmentProps> = (props) => {
    const { register, handleSubmit, watch, errors, control, setValue } = useForm()
    const [pictureMode, setPictureMode] = useState<boolean>(false)

    const onSubmit = (data: any) => {
        console.log(data)
    }

    console.log(watch("picture"))

    const handlePictureChange = () => {
        setValue("picture", "businessman")
    }

    const handlePictureMode = () => {
        setPictureMode(!pictureMode)
    }

    return (
        <div className={styles.container}>
            <Container variation="dynamic">
                <Title>Add department</Title>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller as={<Input label="Name" />} name="name" control={control} defaultValue="" />
                    <Controller
                        as={<Button color="purple">Choose icon</Button>}
                        name="picture"
                        control={control}
                        value=""
                        onClick={handlePictureMode}
                    />

                    <Button color="purple" submit>
                        Submit
                    </Button>
                </form>
            </Container>
            {pictureMode && <Container onClose={handlePictureMode}></Container>}
        </div>
    )
}
export default AddDepartment
