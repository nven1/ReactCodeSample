import React from "react"
import TextButton from "./TextButton"

export default {
    title: "Text Button",
    component: TextButton
}

export const Default = () => (
    <>
        <TextButton variation="grey">Default</TextButton>
        <TextButton variation="purple">Default</TextButton>
    </>
)

export const Sizes = () => (
    <>
        <TextButton variation="grey" size="small">
            Small
        </TextButton>
        <TextButton variation="grey">Default</TextButton>
        <TextButton variation="grey" size="large">
            Large
        </TextButton>
        <br /> <br />
        <TextButton variation="purple" size="small">
            Small
        </TextButton>
        <TextButton variation="purple">Default</TextButton>
        <TextButton variation="purple" size="large">
            Large
        </TextButton>
    </>
)

export const noTransition = () => (
    <>
        <TextButton variation="grey" noTransition>
            No transition effect
        </TextButton>
        <TextButton variation="purple" noTransition>
            No transition effect
        </TextButton>
    </>
)

export const noHover = () => (
    <>
        <TextButton variation="grey" noHover>
            No hover effect
        </TextButton>
        <TextButton variation="purple" noHover>
            No hover effect
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
