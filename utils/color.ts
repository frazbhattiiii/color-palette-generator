export interface ColorToken {
  token: string;
  hex: string;
  rgb: string;
  shade: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('Invalid hex color');

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(clamp(n, 0, 255)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function createShade(rgb: number[], shadeFactor: number): number[] {
  if (shadeFactor === 0) return rgb;
  return shadeFactor < 0
    ? makeRgbArrayDarker(rgb, -shadeFactor)
    : makeRgbArrayLighter(rgb, shadeFactor);
}

function makeRgbArrayLighter(rgb: number[], tintFactor: number): number[] {
  return rgb.map((v) => Math.round(v + (255 - v) * tintFactor));
}

function makeRgbArrayDarker(rgb: number[], shadeFactor: number): number[] {
  const shadeFactorSub = 1 - shadeFactor;
  return rgb.map((v) => Math.round(v * shadeFactorSub));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function generatePalette(baseHex: string): ColorToken[] {
  const baseRgb = hexToRgb(baseHex);

  const shadeFactors = [
    { token: '50', factor: 0.8 },
    { token: '100', factor: 0.6 },
    { token: '200', factor: 0.4 },
    { token: '300', factor: 0.2 },
    { token: '400', factor: 0.1 },
    { token: '500', factor: 0 },
    { token: '600', factor: -0.2 },
    { token: '700', factor: -0.4 },
    { token: '800', factor: -0.6 },
    { token: '900', factor: -0.8 },
  ];

  return shadeFactors.map(({ token, factor }) => {
    const rgb = createShade(baseRgb, factor);
    const hex = rgbToHex(...rgb);

    return {
      token,
      hex,
      rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      shade: factor,
    };
  });
}
