export function isValidNumber(number) {
  return /^[0-9]+$/.test(number);
}

export function isValidName(name) {
  if (name?.length >= 3 && name?.length <= 25) {
    return true;
  } else return false;
}
