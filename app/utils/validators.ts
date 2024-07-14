export function emailRegex(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function passwordRegex(value: string): boolean {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,50}$/.test(
    value,
  );
}

export function passwordIndicatorValidator(
  value: string,
  type: "uppercase" | "special" | "length",
): boolean {
  if (type === "uppercase") return /[A-Z]/.test(value);
  if (type === "length") return value.length >= 8;
  if (type === "special") return /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return true;
}

export function passwordConfirmValidator(
  password: string,
  passwordConfirm: string,
) {
  return password === passwordConfirm;
}
