import tempImg from "~/assets/images/pngwing.com.png";
import { RatingFull } from "~/components/rating-icons";
import useMinScreen from "~/custom-hooks/useMinScreen";
import { TruncatedText } from "~/components/truncated-text";
import { Link } from "@remix-run/react";

type Props = {
  imgUrl: string;
  rating: number;
  ratingQuantity: number;
  name: string;
  discount?: number;
  price: number;
  outOfStock?: boolean;
  id: string;
};

export function CarCard({
  imgUrl = tempImg,
  name,
  ratingQuantity,
  rating,
  price,
  discount = 0,
  outOfStock = false,
  id,
}: Props) {
  const minScreen = useMinScreen(375);
  const calcDiscount = (discount / 100) * price;
  const priceWithDiscount = price - calcDiscount;

  return (
    <Link
      to={`/cars/${id}`}
      className={"relative flex w-40 flex-col gap-4 sm:w-72"}
    >
      <div
        className={`${outOfStock ? "bg-secondary" : "bg-primary"} relative flex h-36 w-full flex-col items-center justify-center rounded-lg p-4 sm:h-72`}
      >
        <img src={imgUrl} alt="Car" className={"w-[90%]"} />
        <div
          className={`${outOfStock ? "bg-transparent" : "bg-white"} absolute bottom-2 left-2 flex items-center justify-center gap-1 rounded-lg px-3 py-1 text-sm md:bottom-4 md:left-4`}
        >
          <strong>{rating.toFixed(1)}</strong>{" "}
          <RatingFull
            height={minScreen ? 15 : 20}
            width={minScreen ? 15 : 20}
          />
          <span className={"opacity-50"}>({ratingQuantity})</span>
        </div>
        {outOfStock && (
          <div
            className={
              "absolute inset-0 flex items-center justify-center text-lg font-bold uppercase text-white md:text-xl"
            }
          >
            Out of stock
          </div>
        )}
      </div>
      <div className={"flex flex-col gap-2"}>
        <TruncatedText
          className={
            "text-sm font-medium capitalize text-black opacity-80 sm:text-lg"
          }
          text={name}
          textCount={minScreen ? 30 : 40}
        />
        <div>
          <span className={"block"}>
            <strong>₦ {priceWithDiscount}</strong>
          </span>
          {discount && (
            <span className={"line-through opacity-60"}>₦ {price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
