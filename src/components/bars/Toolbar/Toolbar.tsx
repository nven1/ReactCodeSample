import React from "react"
import styles from "./Toolbar.module.scss"
import TextButton from "../../buttons/TextButton/TextButton"
import Button from "../../buttons/Button/Button"
import HierarchyArrow from "../../indicators/HierarchyArrow/HierarchyArrow"

interface ToolbarProps {
    parent: string
    buttons: Array<any>
    indexActive?: number
    onClick: (index?: number) => void
    onAction?: () => void
}

const Toolbar: React.FC<ToolbarProps> = props => {
    const handleButtonClick = (index?: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick(index)
    }

    const handleActionClick = () => {
        if (props.onAction) {
            props.onAction()
        }
    }

    const renderButtons = () => {
        const buttons = props.buttons.map(button => {
            const isActive = props.indexActive === button.id
            return (
                <TextButton
                    key={button.id}
                    variation={isActive ? "purple" : "grey"}
                    onClick={handleButtonClick(button.id)}
                    noHover={isActive}
                >
                    {button.name}
                </TextButton>
            )
        })
        return buttons
    }

    return (
        <div className={styles.Toolbar}>
            <TextButton variation="purple" onClick={handleButtonClick()}>
                {props.parent} <HierarchyArrow />
            </TextButton>

            {renderButtons()}
            {props.onAction && (
                <Button variation="purple" size="small" onClick={handleActionClick}>
                    Add department
                </Button>
            )}
        </div>
    )
}
export default Toolbar
