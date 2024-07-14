export type Props = {
  text: string;
  isValid: boolean;
};

export function PasswordRadioIndicator({ text, isValid }: Props) {
  return (
    <div className={"flex gap-3"}>
      <div
        className={
          "border-2 border-black rounded-full w-5 h-5 flex justify-center items-center"
        }
      >
        <div className={`${isValid && "bg-black"} rounded-full w-3 h-3`}></div>
      </div>
      <span className={""}>{text}</span>
    </div>
  );
}
