export interface ButtonProps {
    color: "grey" | "purple" | "red"
    size?: "small" | "normal" | "large"
    noHover?: boolean
    noTransition?: boolean
    onClick?: (data?: any) => void
}
