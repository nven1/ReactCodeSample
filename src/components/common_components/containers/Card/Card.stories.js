import React from "react"
import Card from "./Card"

export default {
    title: "Card",
    component: Card,
}

export const Default = () => (
    <>
        <Card />
    </>
)

export const Double = () => (
    <>
        <Card variation="double" />
    </>
)

export const Dynamic = () => (
    <>
        <Card variation="dynamic" />
    </>
)

export const WithClose = () => (
    <>
        <Card onClose={() => {}} />
    </>
)
