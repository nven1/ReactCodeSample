import React from "react"
import Button from "./Button"

export default {
    title: "NavButton",
    component: Button
}

export const Variations = () => (
    <>
        {/* <h2>Color variations with transition (default setup)</h2> */}
        <Button variation="grey">Default</Button>
        <Button variation="purple">Default</Button>
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
