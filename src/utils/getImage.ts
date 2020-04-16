import businessman from "../assets/illustration_businessman.svg"
import board from "../assets/illustration_board.svg"
import git from "../assets/illustration_git.svg"
import hacker from "../assets/illustration_hacker.svg"
import review from "../assets/illustration_review.svg"
import version_control from "../assets/illustration_version_control.svg"
import design from "../assets/illustration_design.svg"
import react from "../assets/illustration_react.svg"

export type DepartmentImage =
    | "businessman"
    | "board"
    | "git"
    | "hacker"
    | "review"
    | "version_control"
    | "design"
    | "react"

export const departmentImages: Array<DepartmentImage> = [
    "businessman",
    "board",
    "git",
    "hacker",
    "review",
    "version_control",
    "react",
    "design",
]

export const getImage = {
    businessman,
    board,
    git,
    hacker,
    review,
    version_control,
    design,
    react,
}
