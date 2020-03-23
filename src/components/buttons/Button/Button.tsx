import React from "react";
import classnames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  noHover?: boolean;
  noTransition?: boolean;
  variation: "grey" | "purple";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = props => {
  const classProps: string = classnames(
    styles.Button,
    styles[props.variation],
    {
      [styles[`hover--${props.variation}`]]: !props.noHover,
      [styles.transition]: !props.noTransition
    }
  );

  return (
    <button className={classProps} onClick={props.onClick}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
