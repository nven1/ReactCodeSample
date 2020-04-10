import React from "react"
import styles from "./BackgroundImage.module.scss"
import { ImageType, getImage } from "../../../utils/getImage"

interface BackgroundImageProps {
    image: ImageType
}

const BackgroundImage: React.FC<BackgroundImageProps> = (props) => {
    return (
        <div className={styles.container}>
            <img src={getImage(props.image)} alt="Department BackgroundImage" />
        </div>
    )
}
export default BackgroundImage
