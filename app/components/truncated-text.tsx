import React from "react";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  text: string;
  textCount: number;
};

export function TruncatedText({ text, textCount, ...rest }: Props) {
  const truncatedText =
    text.length > textCount ? text.slice(0, textCount) + "..." : text;

  return <p {...rest}>{truncatedText}</p>;
}
