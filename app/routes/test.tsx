import { ImageSlider } from "~/components/image-slider";
import car1 from "~/assets/images/pngwing.com.png";
import car2 from "~/assets/images/Car, Mercedes Car, love, compact Car,.png";
import car3 from "~/assets/images/mercedes suv blue.png";
import { InfiniteTextCarousal } from "~/components/infinte-text-carousal";
export default function Text() {
  const images = [car1, car1, car1, car2, car3, car1, car1, car1];
  return (
    <div className={"w-screen"}>
      <InfiniteTextCarousal
        text={
          "Free Shipping for Orders over ₦15,000 in Lagos. 100 Explorer Points for First Register！"
        }
      />
      {/*<div*/}
      {/*  className={*/}
      {/*    "flex items-center outline-accent outline-2 bg-secondary  outline w-screen h-screen aspect[10/3] mx-auto my-0"*/}
      {/*  }*/}
      {/*>*/}
      {/*  <ImageSlider imgUrls={images} />*/}
      {/*</div>*/}
    </div>
  );
}
