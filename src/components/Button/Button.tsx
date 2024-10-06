import { Button as AntdButton, ButtonProps } from "antd";
import "./button.scss";

interface ButtonExtendedProps extends ButtonProps {
  isFullWidth?: boolean;
}

const Button = ({
  className,
  isFullWidth = true,
  ...rest
}: ButtonExtendedProps) => {
  return (
    <AntdButton
      {...rest}
      className={`btn ${className || ""} ${
        isFullWidth ? "btn-full-width" : ""
      }`}
    />
  );
};

export default Button;
