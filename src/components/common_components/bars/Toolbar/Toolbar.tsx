import React from "react"
import styles from "./Toolbar.module.scss"
import Button from "../../buttons/Button/Button"
import HierarchyArrow from "../../indicators/HierarchyArrow/HierarchyArrow"
import { Link, RouteComponentProps, withRouter, useParams } from "react-router-dom"
import TextButton from "../../buttons/TextButton/TextButton"
import { goTo } from "../../../../utils/navHelpers"

export interface ToolbarButtonItemType {
    key: string
    name: string
}

interface ToolbarProps extends RouteComponentProps {
    url: string
    label: string
    actionLabel?: string
    buttons?: Array<ToolbarButtonItemType>
    onAction?: string
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { mode } = useParams()

    const renderButtons = () => {
        const buttons = props.buttons?.map((button, index) => {
            const isActive = mode === String(button.key)
            return (
                <Link to={goTo(props.url, button.key.toString())} key={button.key}>
                    <TextButton color={isActive ? "purple" : "grey"} noHover={isActive} bold>
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
                <Link to={goTo(props.url, props.onAction)}>
                    <Button color="purple" size="small">
                        {props.actionLabel}
                    </Button>
                </Link>
            )
        }
    }

    return (
        <div className={styles.container}>
            <Link to={goTo(props.url)}>
                <TextButton color="purple" bold>
                    {props.label} {props.buttons && <HierarchyArrow />}
                </TextButton>
            </Link>

            {renderButtons()}
            {renderActionButton()}
        </div>
    )
}
export default withRouter(Toolbar)
