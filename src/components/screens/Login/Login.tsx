import React, { useState } from "react"
import styles from "./Login.module.scss"
import Button from "../../common_components/buttons/Button/Button"
import Endpoints from "../../../environments/endpoints"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import Input from "../../common_components/inputs/Input/Input"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import AuthDataAccess from "../../../data_access/AuthDataAccess"
import { useDispatch } from "react-redux"
import { Token } from "../../../utils/storageKeys"
import { useHistory } from "react-router"

interface LoginProps {}

const LoginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
})

const Login: React.FC<LoginProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { handleSubmit, errors, control } = useForm({
        validationSchema: LoginSchema,
    })

    const [loginError, setLoginError] = useState<string | undefined>()

    const onSubmit = (data: any) => {
        AuthDataAccess.login(dispatch)({ email: data.email, password: data.password }, onSuccess, onError)
    }

    const onSuccess = (token: string) => {
        if (loginError) {
            setLoginError(undefined)
        }

        localStorage.setItem(Token, token)
        history.push(Endpoints.appEndpoints.root)
    }

    const onError = () => {
        setLoginError("Failed login")
    }

    const loginErrorMessage = <div className={styles.loginError}>{loginError}</div>

    return (
        <div className={styles.container}>
            <Card>
                <div className={styles.content}>
                    <Title align="center">Login</Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={<Input label="Email" error={errors.email} />}
                            name="email"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            as={<Input label="Password" error={errors.password} />}
                            name="password"
                            type="password"
                            control={control}
                            defaultValue=""
                        />
                        {loginError && loginErrorMessage}

                        <Button color="purple" size="large" submit>
                            Login
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
export default Login
