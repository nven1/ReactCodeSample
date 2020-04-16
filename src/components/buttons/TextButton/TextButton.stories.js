import React from "react"
import TextButton from "./TextButton"

export default {
    title: "Text Button",
    component: TextButton,
}

export const Default = () => (
    <>
        <TextButton color="grey">Default</TextButton>
        <TextButton color="purple">Default</TextButton>
        <TextButton color="red">Default</TextButton>
    </>
)

export const Sizes = () => (
    <>
        <TextButton color="grey" size="small">
            Small
        </TextButton>
        <TextButton color="purple">Default</TextButton>
        <TextButton color="red" size="large">
            Large
        </TextButton>
    </>
)

export const noTransition = () => (
    <>
        <TextButton color="grey" noTransition>
            No
        </TextButton>
        <TextButton color="purple" noTransition>
            transition
        </TextButton>
        <TextButton color="red" noTransition>
            effect
        </TextButton>
    </>
)

export const noHover = () => (
    <>
        <TextButton color="grey" noHover>
            No
        </TextButton>
        <TextButton color="purple" noHover>
            hover
        </TextButton>
        <TextButton color="red" noHover>
            effect
        </TextButton>
    </>
)

/* export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
); */
