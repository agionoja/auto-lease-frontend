import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
};

export function InfiniteTextCarousal({ text, ...rest }: Props) {
  const slideStyles = "animate-slide inline-block group-hover:pause w-full";
  return (
    <>
      <div {...rest} className={"group overflow-hidden w-full"}>
        <div className={slideStyles + "outline outline-red-500 outline-2"}>
          <span>{text}</span>
        </div>
      </div>
    </>
  );
}
