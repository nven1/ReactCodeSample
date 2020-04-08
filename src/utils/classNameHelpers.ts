import classnames from "classnames"
import { ButtonProps } from "../types/ElementProps"

export const buttonClassName = (styles: any, props: ButtonProps): string => {
    const classProps: string = classnames(styles.container, styles[props.variation], styles[props.size ?? "normal"], {
        [styles[`hover--${props.variation}`]]: !props.noHover,
        [styles.transition]: !props.noTransition,
    })
    return classProps
}
