import { useState, useEffect, useCallback } from "react";

type Props = {
  imgUrls: string[];
};

const btnStyle =
  "p-4 transition duration-200 hover:bg-accent text-white bg-transparent-black rounded-full h-10 w-10 flex items-center justify-center";

export function ImageSlider({ imgUrls }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  const showNextImg = useCallback(() => {
    setImgIndex((index) => {
      if (index === imgUrls.length - 1) return 0;
      return index + 1;
    });
  }, [imgUrls.length]);

  const showPrevImg = useCallback(() => {
    setImgIndex((index) => {
      if (index === 0) return imgUrls.length - 1;
      return index - 1;
    });
  }, [imgUrls.length]);

  useEffect(() => {
    const timerId = setInterval(() => {
      showNextImg();
    }, 4000);
    return () => clearTimeout(timerId);
  }, [showNextImg]);

  return (
    <>
      <div className={"relative h-full w-full"}>
        <div className={"flex h-full w-full overflow-hidden"}>
          {imgUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              style={{
                translate: `${-100 * imgIndex}%`,
              }}
              className={
                "block h-full !w-full shrink-0 grow-0 transform object-contain duration-500"
              }
            />
          ))}
        </div>
        <div
          className={
            "absolute inset-0 flex items-center justify-between px-4 text-white"
          }
        >
          <button onClick={showPrevImg} className={`${btnStyle} `}>
            {"<"}
          </button>
          <button onClick={showNextImg} className={`${btnStyle}`}>
            {">"}
          </button>
        </div>
        <div
          style={{ translate: "-50%" }}
          className={
            "absolute bottom-4 left-1/2 right-1/2 flex items-center justify-center gap-2 text-white"
          }
        >
          {imgUrls.map((_, index) => {
            const isIndex = index === imgIndex;
            return (
              <button
                className={`${isIndex ? "h-3 w-16" : "h-4 w-4"} focus: shrink-0 grow-0 rounded-full transition duration-300 ease-in-out hover:scale-125 focus:scale-125 ${
                  isIndex ? "bg-accent" : "bg-transparent-black"
                }`}
                key={index}
                onClick={() => setImgIndex(index)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
