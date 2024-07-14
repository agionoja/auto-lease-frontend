import { Link } from "@remix-run/react";
import React from "react";

type Props = {
  links: Array<{ url: string; urlText: string | React.ReactNode }>;
};

export function AuthLinks({ links }: Props) {
  return (
    <div className={"auth-side-action"}>
      {links.map(({ url, urlText }, index) => (
        <Link
          key={index}
          to={url}
          className={React.isValidElement(urlText) ? "" : "underline"}
        >
          {urlText}
        </Link>
      ))}
    </div>
  );
}
