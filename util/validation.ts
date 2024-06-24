export function isNotEmpty(value: string) {
  return value.trim() !== '';
}

export function isEmail(value: string) {
  return value.includes('@');
}
