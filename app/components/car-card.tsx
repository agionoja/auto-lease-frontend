import tempImg from "~/assets/images/pngwing.com.png";
import { RatingFull } from "~/components/RatingIcons";
import useMinScreen from "~/custom-hooks/useMinScreen";

type Props = {
  imgUrl: string;
  rating: number;
  ratingQuantity: number;
  name: string;
};

export function CarCard({
  imgUrl = tempImg,
  name,
  ratingQuantity = 499,
  rating = 4,
}: Props) {
  const minScreen = useMinScreen(375);
  return (
    <>
      <div
        className={
          "relative bg-primary w-48 h-44 sm:w-80 sm:h-72 flex justify-center items-center rounded-lg flex-col p-4"
        }
      >
        <img src={imgUrl} alt="Car" className={"w-[90%]"} />
        <div
          className={
            "bg-white px-3 py-2 absolute bottom-4 left-4 rounded-lg flex gap-1 justify-center items-center text-sm"
          }
        >
          <strong>{rating.toFixed(1)}</strong>{" "}
          <RatingFull
            height={minScreen ? 15 : 20}
            width={minScreen ? 15 : 20}
          />
          <span className={"opacity-50"}>({ratingQuantity})</span>
        </div>
      </div>
    </>
  );
}
