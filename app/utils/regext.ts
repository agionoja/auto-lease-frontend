export function email(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function password(value: string) {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/.test(value);
}

type PasswordValidator = {
  bool: boolean;
  type?: string;
};

export function passwordValidator(value: string): PasswordValidator {
  if (!/[A-Z]/.test(value)) return { bool: false, type: "uppercase" };
  if (value.length < 8) return { bool: false, type: "length" };
  if (!/[!@#$%^&*]/.test(value)) return { bool: false, type: "special" };

  return { bool: true };
}
