export default function clamp(number: number, min: number, max: number) {
  if (min > max) {
    return NaN;
  }
  const clampedMin = Math.max(number, min);
  const clampedValue = Math.min(clampedMin, max);

  return clampedValue;
}
