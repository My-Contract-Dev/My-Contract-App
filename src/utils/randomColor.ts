import seedrandom from 'seedrandom';

export const randomColor = (seed: string, lightness = 70) => {
  const rand = seedrandom(seed);
  const randomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const h = randomInt(0, 360);
  const s = 100;
  const l = lightness;
  return `hsl(${h},${s}%,${l}%)`;
};
