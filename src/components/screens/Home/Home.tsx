import React from "react";
import "./Home.style.scss";
import Button from "../../buttons/Button/Button";

interface HomeProps {}

const Home: React.FC<HomeProps> = props => {
  return (
    <div className="Home">
      <h1>ayy lmao</h1>
      <Button variation="grey">Am a button</Button>
    </div>
  );
};
export default Home;
