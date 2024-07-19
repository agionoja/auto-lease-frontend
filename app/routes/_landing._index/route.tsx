import { json, MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/routes/_landing._index/hero";
import { CategoryCard } from "~/routes/_landing._index/category-card";
import { TopRated } from "~/routes/_landing._index/top-rated";
import dealImg from "~/assets/images/Get Deals as low as [x] (2) - Copy.png";
import { NewlyAdded } from "~/routes/_landing._index/newly-added";
import fetchClient from "~/api/fetchClient";

type Car = {
  name: string;
  dealership: string;
  category: "luxury" | "basic" | "sport";
  summary: string;
  ratingsQuantity: number;
  ratingsAverage: number;
  slug: string;
  id: string;
  fee: number;
  discount: number;
  isAvailable: boolean;
  photos: Array<{
    url: string;
    id: string;
  }>;
  coverImage: Array<{
    url: string;
    id: string;
  }>;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Auto Lease" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const response = await fetchClient<{ cars: Car[] }>("/cars");

  if (!response.data) {
    return json({ cars: [] });
  }

  return json({ cars: response.data.cars });
};

export default function Index() {
  const { cars } = useLoaderData<typeof loader>();

  console.log(cars);

  return (
    <div className="flex flex-col items-center gap-10">
      <Hero />
      <div className={"flex flex-col items-center gap-10"}>
        <CategoryCard />
        <TopRated />
      </div>

      <div className={"w-full bg-secondary"}>
        <img src={dealImg} alt="" />
      </div>

      <div className={""}>
        <NewlyAdded />
      </div>

      {/* Example usage of cars data */}
      <div className="car-list">
        {!cars.length ? (
          cars.map((car: Car) => (
            <div key={car.id} className="car-item">
              <h3>{car.name}</h3>
              <p>{car.summary}</p>
              {/* Display other car details as needed */}
            </div>
          ))
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
}
