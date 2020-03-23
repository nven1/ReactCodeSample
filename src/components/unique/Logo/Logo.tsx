import React from "react";
import "./Logo.style.scss";
import Image from "../../../assets/logo.png";

interface LogoProps {}

const Logo: React.FC<LogoProps> = props => {
  return (
    <div className="Logo-Container">
      <img src={Image} alt="3topia" />
    </div>
  );
};
export default Logo;
