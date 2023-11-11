export function randomKey(size: number) {
  return Array(size).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
}