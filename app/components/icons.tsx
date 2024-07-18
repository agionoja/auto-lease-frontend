import React from "react";

type SvgProps = React.SVGProps;
export function SearchIcon({ ...props }: SvgProps) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 12 12"
      enableBackground="new 0 0 12 12"
      id="Слой_1"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path d="M7,0C4.2385864,0,2,2.2385864,2,5c0,1.2001343,0.4402466,2.2866211,1.1450195,3.1483765L0,11.2929688  L0.7070313,12l3.1450806-3.1446533C4.7138062,9.5598755,5.8001099,10,7,10c2.7614136,0,5-2.2385864,5-5S9.7614136,0,7,0z M7,9  C4.7943726,9,3,7.2056274,3,5s1.7943726-4,4-4s4,1.7943726,4,4S9.2056274,9,7,9z" />
    </svg>
  );
}

export function closeIcon({ ...props }: SvgProps) {
  return (
    <>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 12 12"
        enableBackground="new 0 0 12 12"
        id="Слой_1"
        version="1.1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
      >
        <polygon points="12,0.7070313 11.2929688,0 6,5.2929688 0.7070313,0 0,0.7070313 5.2929688,6 0,11.2929688   0.7070313,12 6,6.7070313 11.2929688,12 12,11.2929688 6.7070313,6 " />
      </svg>
    </>
  );
}
