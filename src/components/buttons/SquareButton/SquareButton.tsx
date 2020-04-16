import React from "react"
import styles from "./SquareButton.module.scss"
import { getImage, DepartmentImage } from "../../../utils/getImage"

interface SquareButtonProps {
    image: DepartmentImage
    onClick: (image: DepartmentImage) => void
}

const SquareButton: React.FC<SquareButtonProps> = (props) => {
    const handleClick = () => {
        props.onClick(props.image)
    }

    return (
        <div className={styles.container} onClick={handleClick}>
            <img src={getImage[props.image]} alt="Department" />
        </div>
    )
}
export default SquareButton
