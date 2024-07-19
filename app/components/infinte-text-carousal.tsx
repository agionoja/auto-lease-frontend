type Props = {
  text: string;
};

function InfiniteTextCarousal({ text }: Props) {
  const slideStyles = "animate-slide inline-block group-hover:pause";
  return (
    <>
      <div className={"whitespace-nowrap group overflow-hidden"}>
    <div className={slideStyles}>
      <span>{text}</span>
      </div>
      <div className={slideStyles}>
    <span>{text}</span>
    </div>
    </div>
    </>
);
}
