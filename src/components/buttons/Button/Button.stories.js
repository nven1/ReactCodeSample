import React from "react"
import Button from "./Button"

export default {
    title: "Default Button",
    component: Button
}

export const Default = () => (
    <>
        <Button variation="grey">Default</Button>
        <Button variation="purple">Default</Button>
    </>
)

export const Sizes = () => (
    <>
        <Button variation="grey" size="small">
            Small
        </Button>
        <Button variation="grey">Default</Button>
        <Button variation="grey" size="large">
            Large
        </Button>
        <br /> <br />
        <Button variation="purple" size="small">
            Small
        </Button>
        <Button variation="purple">Default</Button>
        <Button variation="purple" size="large">
            Large
        </Button>
    </>
)

export const noTransition = () => (
    <>
        <Button variation="grey" noTransition>
            No transition effect
        </Button>
        <Button variation="purple" noTransition>
            No transition effect
        </Button>
    </>
)

export const noHover = () => (
    <>
        <Button variation="grey" noHover>
            No hover effect
        </Button>
        <Button variation="purple" noHover>
            No hover effect
        </Button>
    </>
)

/* export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
); */
