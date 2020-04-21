import React from "react"
import Circle from "./Circle"

export default {
    title: "Circle",
    component: Circle,
}

const style = {
    display: "flex",
    fontSize: "2em",
    width: "5em",
    justifyContent: "space-around",
}

export const Default = () => (
    <>
        <h1>For displaying numbers</h1>
        <h2>Adapts to font size</h2>
        <br />
        <span style={style}>
            <Circle color="grey">1</Circle>
            <Circle color="purple">11</Circle>
            <Circle color="red">111</Circle>
        </span>
    </>
)
