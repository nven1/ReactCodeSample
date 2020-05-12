import React, { useState, useEffect } from "react"
import styles from "./Snack.module.scss"
import { CSSTransition } from "react-transition-group"
import { selectError, setErrorAction } from "../../../../reducers/ErrorReducer"
import { useSelector, useDispatch } from "react-redux"

const duration = 3000

const Snack: React.FC = () => {
    const dispatch = useDispatch()

    const error = useSelector(selectError)

    const [countdown, setCountdown] = useState<NodeJS.Timeout | undefined>(undefined)

    useEffect(() => {
        startCountdown()

        // eslint-disable-next-line
    }, [error])

    const startCountdown = () => {
        if (countdown) {
            clearInterval(countdown)
        }
        setCountdown(
            setTimeout(() => {
                dispatch(setErrorAction(undefined))
            }, duration)
        )
    }

    const stopCountdown = () => {
        if (countdown) {
            clearInterval(countdown)
        }
    }

    return (
        <div className={styles.container}>
            <CSSTransition
                in={!!error}
                timeout={500}
                mountOnEnter
                unmountOnExit
                onEntered={startCountdown}
                classNames={{
                    enter: styles["transition-enter"],
                    enterActive: styles["transition-enter-active"],
                    exit: styles["transition-exit"],
                    exitActive: styles["transition-exit-active"],
                }}
            >
                <div className={styles.snack} onMouseOver={stopCountdown} onMouseLeave={startCountdown}>
                    {error}
                </div>
            </CSSTransition>
        </div>
    )
}
export default Snack
