import React from "react"
import Button from "./Button"

export default {
    title: "Default Button",
    component: Button,
}

export const Default = () => (
    <>
        <Button color="grey">Default</Button>
        <Button color="purple">Default</Button>
        <Button color="red">Default</Button>
    </>
)

export const Sizes = () => (
    <>
        <Button color="grey" size="small">
            Small
        </Button>
        <Button color="purple">Default</Button>
        <Button color="red" size="large">
            Large
        </Button>
    </>
)

export const noTransition = () => (
    <>
        <Button color="grey" noTransition>
            No
        </Button>
        <Button color="purple" noTransition>
            transition
        </Button>
        <Button color="red" noTransition>
            effect
        </Button>
    </>
)

export const noHover = () => (
    <>
        <Button color="grey" noHover>
            No
        </Button>
        <Button color="purple" noHover>
            hover
        </Button>
        <Button color="red" noHover>
            effect
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
