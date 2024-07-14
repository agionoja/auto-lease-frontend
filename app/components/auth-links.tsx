import { Link } from "@remix-run/react";

type Props = {
  links: Array<{ url: string; urlText: string }>;
};

export function AuthLinks({ links }: Props) {
  return (
    <div className={"auth-side-action"}>
      {links.map(({ url, urlText }, index) => (
        <Link key={index} to={url} className={"underline"}>
          {urlText}
        </Link>
      ))}
    </div>
  );
}
