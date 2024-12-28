import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from './color-utils';

export interface MaterialToken {
  token: string;
  hex: string;
  rgb: string;
  hsl: string;
}

export function generateMaterialPalette(baseHex: string): MaterialToken[] {
  const rgb = hexToRgb(baseHex);
  const [h, s] = rgbToHsl(...rgb);

  // Material Design 3 specific token values
  const tokens = [
    { token: '0', lightness: 0, saturation: 0 },
    { token: '10', lightness: 10, saturation: s * 0.95 },
    { token: '20', lightness: 20, saturation: s * 0.95 },
    { token: '30', lightness: 30, saturation: s * 0.95 },
    { token: '40', lightness: 40, saturation: s * 0.95 },
    { token: '50', lightness: 50, saturation: s },
    { token: '60', lightness: 60, saturation: s },
    { token: '70', lightness: 70, saturation: s * 0.95 },
    { token: '80', lightness: 80, saturation: s * 0.9 },
    { token: '90', lightness: 90, saturation: s * 0.85 },
    { token: '95', lightness: 95, saturation: s * 0.8 },
    { token: '99', lightness: 99, saturation: s * 0.7 },
    { token: '100', lightness: 100, saturation: 0 },
  ];

  return tokens.map(({ token, lightness, saturation }) => {
    const rgb = hslToRgb(h, clamp(saturation, 0, 100), lightness);
    const hex = rgbToHex(...rgb);

    return {
      token,
      hex,
      rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      hsl: `hsl(${Math.round(h)}, ${Math.round(saturation)}%, ${Math.round(
        lightness
      )}%)`,
    };
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
