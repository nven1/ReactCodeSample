import React from "react"
import "./Home.style.scss"
import Button from "../../buttons/Button/Button"
import Toolbar from "../../bars/Toolbar/Toolbar"

interface HomeProps {}

const Home: React.FC<HomeProps> = props => {
    return (
        <div className="Home">
            {/* <Toolbar /> */}
            <h1>ayy lmao</h1>
            <Button variation="grey">Am a button</Button>
        </div>
    )
}
export default Home
