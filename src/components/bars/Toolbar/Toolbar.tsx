import React from "react"
import styles from "./Toolbar.module.scss"
import TextButton from "../../buttons/TextButton/TextButton"
import Button from "../../buttons/Button/Button"

interface ToolbarProps {
    buttons: Array<any>
    indexActive?: number
    onClick: (index?: number) => void
    onAction?: () => void
}

const Toolbar: React.FC<ToolbarProps> = props => {
    const handleClick = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (index !== props.indexActive) {
            props.onClick(index)
        } else {
            props.onClick(undefined)
        }
    }

    const renderButtons = () => {
        const buttons = props.buttons.map(button => {
            const isActive = props.indexActive === button.id
            return (
                <TextButton
                    key={button.id}
                    variation={isActive ? "purple" : "grey"}
                    onClick={handleClick(button.id)}
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
            {renderButtons()}
            <Button variation="purple" size="small">
                Add department
            </Button>
        </div>
    )
}
export default Toolbar
