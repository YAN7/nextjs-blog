import lightPalette from './lightpalette';
import darkPalette from './darkpalette';

const themePalette = (color, mode) => {
  if (mode === 'dark') {
    return darkPalette[color];
  }
  return lightPalette[color];
};

export default themePalette;
