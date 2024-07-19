import { useEffect, useState } from "react";

export default function useMinScreen(minScreenWidth: number) {
  const [isBelowMinScreenWidth, setIsBelowMinScreenWidth] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsBelowMinScreenWidth(window.innerWidth <= minScreenWidth);
      console.log({ minScreenWidth, windowWidth: window.innerWidth });
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, [minScreenWidth]);

  return isBelowMinScreenWidth;
}
