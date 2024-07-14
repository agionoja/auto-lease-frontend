import { Label } from "./label";
import { Input, InputProps } from "./input";

type LabelInputProps = InputProps & {
  label: string;
};

export function LabelInput({ label, ...inputProps }: LabelInputProps) {
  return (
    <div className="flex-col flex gap-2">
      <Label htmlFor={inputProps.name}>{label}</Label>
      <Input {...inputProps} />
    </div>
  );
}
