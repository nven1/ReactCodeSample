import React from "react"
import styles from "./Toolbar.module.scss"
import TextButton from "../../buttons/TextButton/TextButton"
import Button from "../../buttons/Button/Button"
import HierarchyArrow from "../../indicators/HierarchyArrow/HierarchyArrow"

interface ToolbarProps {
    label: string
    actionLabel?: string
    buttons: Array<any>
    indexActive?: number
    onClick: (index?: number) => void
    onAction?: () => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const handleButtonClick = (index?: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick(index)
    }

    const handleActionClick = () => {
        if (props.onAction) {
            props.onAction()
        }
    }

    const renderButtons = () => {
        const buttons = props.buttons.map((button, index) => {
            const isActive = props.indexActive === index
            return (
                <TextButton
                    key={index}
                    variation={isActive ? "purple" : "grey"}
                    onClick={handleButtonClick(index)}
                    noHover={isActive}
                >
                    {button.name}
                </TextButton>
            )
        })
        return <div>{buttons}</div>
    }

    const renderActionButton = () => {
        if (props.onAction && props.actionLabel) {
            return (
                <Button variation="purple" size="small" onClick={handleActionClick}>
                    {props.actionLabel}
                </Button>
            )
        }
    }

    return (
        <div className={styles.container}>
            <TextButton variation="purple" onClick={handleButtonClick()}>
                {props.label} <HierarchyArrow />
            </TextButton>

            {renderButtons()}
            {renderActionButton()}
        </div>
    )
}
export default Toolbar
