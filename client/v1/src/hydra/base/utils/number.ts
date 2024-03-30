// constants
const simplifySuffixes: string[] = ['', 'k', 'M', 'B', 'T'];

// functions
export const comma = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const simplify = (value: number, precision: number = 1): string => {
  const sign = Math.sign(value);
  value = Math.abs(value);

  const suffixIndex = ~~(Math.log10(value) / 3);
  const suffix = simplifySuffixes[suffixIndex];

  const divisor = Math.pow(10, suffixIndex * 3);
  const simplifiedValue = value / divisor;

  const formatted = (sign * simplifiedValue).toFixed(precision);
  const simplified = parseFloat(formatted) === ~~(parseFloat(formatted)) ? parseInt(formatted).toString() : formatted;

  return simplified + suffix;
};