import React from "react"
import styles from "./Item.module.scss"

interface ItemProps {}

const Item: React.FC<ItemProps> = (props) => {
    return <div className={styles.container}>{props.children}</div>
}
export default Item
