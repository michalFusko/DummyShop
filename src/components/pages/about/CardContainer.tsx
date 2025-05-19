import React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  customClassName: string;
}
const CardContainer = ({ children, customClassName }: CardContainerProps) => {
  return (
    <div
      className={`${customClassName} flex aspect-square h-[150px] flex-col items-center justify-around rounded-sm border border-black/10 md:m-20 md:h-[250px] lg:h-[350px] xl:h-[450px]`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
