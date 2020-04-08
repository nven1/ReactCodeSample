import classnames from "classnames"
import { ButtonProps } from "../types/ElementProps"

export const buttonClassName = (styles: any, props: ButtonProps): string => {
    const classProps: string = classnames(styles.container, styles[props.color], styles[props.size ?? "normal"], {
        [styles[`hover--${props.color}`]]: !props.noHover,
        [styles.transition]: !props.noTransition,
    })
    return classProps
}
