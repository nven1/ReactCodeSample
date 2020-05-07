import React from "react"
import styles from "./Item.module.scss"

interface ItemProps {
    label: string
    bold?: boolean
}

const Item: React.FC<ItemProps> = (props) => {
    return (
        <div className={styles.container}>
            <span className={props.bold ? styles.bold : ""}>{props.label}</span>
            {props.children}
        </div>
    )
}
export default Item
