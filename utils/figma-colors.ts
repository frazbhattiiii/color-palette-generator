import { hexToRgb, rgbToHex } from './color-utils';

export interface FigmaToken {
  token: string;
  hex: string;
  rgb: string;
  shade: number;
}

function createShade(
  rgb: [number, number, number],
  shadeFactor: number
): [number, number, number] {
  if (shadeFactor === 0) return rgb;

  if (shadeFactor < 0) {
    return makeRgbArrayDarker(rgb, -shadeFactor);
  } else {
    return makeRgbArrayLighter(rgb, shadeFactor);
  }
}

function makeRgbArrayLighter(
  rgb: [number, number, number],
  tintFactor: number
): [number, number, number] {
  return rgb.map((v) => Math.round(v + (255 - v) * tintFactor)) as [
    number,
    number,
    number
  ];
}

function makeRgbArrayDarker(
  rgb: [number, number, number],
  shadeFactor: number
): [number, number, number] {
  const shadeFactorSub = 1 - shadeFactor;
  return rgb.map((v) => Math.round(v * shadeFactorSub)) as [
    number,
    number,
    number
  ];
}

export function generateFigmaPalette(baseHex: string): FigmaToken[] {
  const baseRgb = hexToRgb(baseHex); // This now returns [number, number, number]

  // Figma's shade factors
  const shadeFactors = [
    { token: '50', factor: 0.8 },
    { token: '100', factor: 0.6 },
    { token: '200', factor: 0.4 },
    { token: '300', factor: 0.2 },
    { token: '400', factor: 0.1 },
    { token: '500', factor: 0 },
    { token: '600', factor: -0.2 },
    { token: '700', factor: -0.4 }, // More aggressive darkening
    { token: '800', factor: -0.6 }, // More aggressive darkening
    { token: '900', factor: -0.8 }, // More aggressive darkening
  ];

  return shadeFactors.map(({ token, factor }) => {
    const rgb = createShade(baseRgb, factor);
    const hex = rgbToHex(...rgb); // No error because `rgb` is [number, number, number]

    return {
      token,
      hex,
      rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      shade: factor,
    };
  });
}
