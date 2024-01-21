import React, { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends React.AllHTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={`${styles.cardCss} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
