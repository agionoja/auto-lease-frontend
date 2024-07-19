import { ImageSlider } from "~/components/image-slider";
import img1 from "~/assets/hero/pngwing.com.png";
import img2 from "~/assets/hero/pngwing.com (6).png";
import img3 from "~/assets/hero/pngwing.com (3).png";
import img4 from "~/assets/hero/pngwing.com (5) (1).png";
import img5 from "~/assets/hero/pngwing.com (10).png";
import img6 from "~/assets/hero/pngwing.com (17).png";
import img7 from "~/assets/hero/pngwing.com (18).png";

export function Hero() {
  return (
    <div className={"h-[85vh] w-full bg-[#a3a2a8]"}>
      <ImageSlider imgUrls={[img1, img2, img3, img4, img5, img6, img7]} />
    </div>
  );
}
