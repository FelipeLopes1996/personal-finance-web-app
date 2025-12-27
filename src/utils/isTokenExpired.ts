export function isTokenExpired(exp: number): boolean {
  const now = Date.now() / 1000; // converte para segundos
  return exp < now;
}
