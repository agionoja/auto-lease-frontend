import { Link } from "@remix-run/react";
import img3 from "~/assets/images/5.png";
import img2 from "~/assets/images/6.png";
import img1 from "~/assets/images/4.png";

export function CategoryCard() {
  return (
    <div className={"grid w-full grid-cols-2 gap-4"}>
      <Link to={"/categories/luxury"} className={"col-span-2"}>
        <img
          className={`aspect-10/4 h-96 w-full rounded-lg bg-off-black object-contain`}
          src={img2}
          alt="category"
        />
      </Link>
      <Link className={"col-span-1"} to={"/categories/basic"}>
        <img
          className={`aspect-10/4 h-96 w-full rounded-lg bg-off-black object-contain`}
          src={img1}
          alt="category"
        />
      </Link>

      <Link className={"col-span-1"} to={"/categories/sport"}>
        <img
          className={`aspect-10/4 h-96 w-full rounded-lg bg-off-black object-contain`}
          src={img3}
          alt="category"
        />
      </Link>
    </div>
  );
}
