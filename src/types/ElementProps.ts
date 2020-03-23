export interface ButtonProps {
    variation: "grey" | "purple"
    size?: "small" | "normal" | "large"
    noHover?: boolean
    noTransition?: boolean
    onClick?: (data: any) => void
}
