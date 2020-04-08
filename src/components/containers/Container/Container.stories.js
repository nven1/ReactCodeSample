import React from "react"
import Container from "./Container"

export default {
    title: "Container",
    component: Container,
}

export const Default = () => (
    <>
        <Container />
    </>
)

export const Double = () => (
    <>
        <Container variation="double" />
    </>
)

export const Dynamic = () => (
    <>
        <Container variation="dynamic" />
    </>
)
