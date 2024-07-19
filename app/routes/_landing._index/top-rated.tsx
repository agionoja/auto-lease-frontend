import { CarCard } from "~/components/car-card";
import img1 from "~/assets/hero/pngwing.com (17).png";

export function TopRated() {
  return (
    <div className={"flex flex-col gap-8"}>
      <h2 className={"text-center text-xl font-bold"}>Top Rated</h2>
      <div className={"grid grid-cols-4 gap-6"}>
        <CarCard
          id={"2938473292"}
          imgUrl={img1}
          rating={4.6}
          ratingQuantity={987}
          name={"I do not know a name that I will gice"}
          price={4000}
          discount={2}
        />{" "}
        <CarCard
          id={"2938473292"}
          imgUrl={img1}
          rating={4.6}
          ratingQuantity={987}
          name={"I do not know a name that I will gice"}
          price={4000}
          discount={2}
        />{" "}
        <CarCard
          id={"2938473292"}
          imgUrl={img1}
          rating={4.6}
          ratingQuantity={987}
          name={"I do not know a name that I will gice"}
          price={4000}
          discount={2}
        />{" "}
        <CarCard
          id={"2938473292"}
          imgUrl={img1}
          rating={4.6}
          ratingQuantity={987}
          name={"I do not know a name that I will gice"}
          price={4000}
          discount={2}
        />
      </div>
    </div>
  );
}
