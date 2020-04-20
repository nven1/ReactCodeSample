import React from "react"
import styles from "./BackgroundImage.module.scss"
import { DepartmentImage, getImage } from "../../../../utils/getImage"

interface BackgroundImageProps {
    image: DepartmentImage
}

const BackgroundImage: React.FC<BackgroundImageProps> = (props) => {
    return (
        <div className={styles.container}>
            <img src={getImage[props.image]} alt="Department BackgroundImage" />
        </div>
    )
}
export default BackgroundImage
