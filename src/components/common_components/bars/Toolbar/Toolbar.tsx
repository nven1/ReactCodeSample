import React from "react"
import styles from "./Toolbar.module.scss"
import Button from "../../buttons/Button/Button"
import HierarchyArrow from "../../indicators/HierarchyArrow/HierarchyArrow"
import { Link, RouteComponentProps, withRouter, useParams } from "react-router-dom"
import TextButton from "../../buttons/TextButton/TextButton"

interface ToolbarProps extends RouteComponentProps {
    url: string
    label: string
    actionLabel?: string
    buttons?: Array<any>
    onClick?: (index?: number) => void
    onAction?: string
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { mode } = useParams()

    const goTo = (param: string) => {
        return `${props.url}/${param}/`
    }

    const renderButtons = () => {
        const buttons = props.buttons?.map((button, index) => {
            const isActive = mode === String(button.id)
            return (
                <Link to={goTo(button.id)} key={button.id}>
                    <TextButton color={isActive ? "purple" : "grey"} noHover={isActive}>
                        {button.name}
                    </TextButton>
                </Link>
            )
        })
        return <div>{buttons}</div>
    }

    const renderActionButton = () => {
        if (props.onAction && props.actionLabel) {
            return (
                <Link to={goTo(props.onAction)}>
                    <Button color="purple" size="small">
                        {props.actionLabel}
                    </Button>
                </Link>
            )
        }
    }

    return (
        <div className={styles.container}>
            <Link to={goTo("all")}>
                <TextButton color="purple">
                    {props.label} {props.buttons && <HierarchyArrow />}
                </TextButton>
            </Link>

            {renderButtons()}
            {renderActionButton()}
        </div>
    )
}
export default withRouter(Toolbar)
