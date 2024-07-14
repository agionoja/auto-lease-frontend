import { PasswordRadioIndicator } from "./passwordRadioIndicator";
import { passwordIndicatorValidator } from "~/utils/validators";

type Props = {
  value: string;
};

export function RegPasswordValidator({ value }: Props) {
  const isLength = passwordIndicatorValidator(value, "length");
  const isSpecialChar = passwordIndicatorValidator(value, "special");
  const isUpper = passwordIndicatorValidator(value, "uppercase");

  return (
    <>
      <PasswordRadioIndicator isValid={isLength} text={"8 Characters"} />
      <PasswordRadioIndicator
        isValid={isUpper}
        text={"1 uppercase character"}
      />
      <PasswordRadioIndicator
        isValid={isSpecialChar}
        text={"1 special character"}
      />
    </>
  );
}
