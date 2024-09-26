// generate a 6 digit pin
export function generatePin() {
  const pin = Math.floor(Math.random() * 900000) + 100000;
  return pin.toString().padStart(6, "0");
}
