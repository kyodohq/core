export async function hash(value: string) {
  const password = await Bun.password.hash(value);

  return password;
}

export async function verify(value: string, hash: string) {
  const isValid = await Bun.password.verify(value, hash);

  return isValid;
}
