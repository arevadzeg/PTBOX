import { ReactNode } from "react";
import { Spin } from "antd";
import "./spinLoader.scss";

interface SpinLoaderProps {
  children: ReactNode;
  isLoading: boolean;
}

const SpinLoader = ({ children, isLoading }: SpinLoaderProps) => {
  return isLoading ? (
    <div className="spin-loader">
      <Spin size="large" />
    </div>
  ) : (
    children
  );
};

export default SpinLoader;
