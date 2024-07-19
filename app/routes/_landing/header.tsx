import { Link, NavLink } from "@remix-run/react";
import logoAccent from "~/assets/images/AutoLease-accent.png";
// import hamburger from "~/assets/logo/burger-menu-svgrepo-com.svg";
import { SearchIcon } from "~/components/icons";
import { SearchForm } from "~/routes/_landing/searchForm";
import { useState } from "react";

export function Header() {
  const navLinks = ({ isActive }: { isActive: boolean }) =>
    isActive ? "border-b border-b-2 border-accent links" : "links";

  const [hidden, setHidden] = useState(true);

  const handleHidden = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  return (
    <div className={"relative flex flex-col-reverse"}>
      <div className={"absolute -bottom-36 right-4 z-50"}>
        <SearchForm onHidden={setHidden} hidden={hidden} />
      </div>
      <header
        className={
          "flex w-full justify-between gap-12 bg-off-black px-4 py-8 text-white md:px-14"
        }
      >
        <div className={"flex items-center gap-20"}>
          <img src={logoAccent} alt="Auto Lease logo" />
          <nav className={"flex gap-6"}>
            <NavLink className={navLinks} to="/">
              Home
            </NavLink>
            <NavLink className={navLinks} to="/contact">
              About
            </NavLink>
            <NavLink className={navLinks} to="/about">
              Contact
            </NavLink>
          </nav>
        </div>
        <div className={"flex items-center justify-between gap-32"}>
          <SearchIcon
            className={"cursor-pointer"}
            onClick={handleHidden}
            fill={"white"}
            height={30}
            width={30}
          />

          <ul className={"flex gap-2 text-black"}>
            <li>
              <Link
                className={"link rounded-md bg-accent text-white"}
                to={"/auth/register"}
              >
                Sign-up
              </Link>
            </li>
            <li className={""}>
              <Link className={"link rounded-md bg-white"} to={"/auth/login"}>
                Sign-in
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
