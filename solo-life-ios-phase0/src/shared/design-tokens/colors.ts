export const colors = {
  light: {
    background: '#F7F4ED',
    surface: '#FFFEFA',
    surfaceMuted: '#F0ECE3',
    text: '#2F342F',
    textSecondary: '#74766E',
    sage: '#80947D',
    sageStrong: '#526A55',
    sageSoft: '#E3EADF',
    sand: '#EDE3D5',
    border: '#E6E1D7',
    danger: '#A95348',
    disabled: '#C9C8C0',
  },
  dark: {
    background: '#20231F',
    surface: '#2A2E29',
    surfaceMuted: '#343832',
    text: '#F4F1E8',
    textSecondary: '#B9B9AE',
    sage: '#A5B99F',
    sageStrong: '#C3D3BD',
    sageSoft: '#3B493A',
    sand: '#51473C',
    border: '#444840',
    danger: '#E39A8E',
    disabled: '#686B63',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type AppColors = (typeof colors)[ColorScheme];
