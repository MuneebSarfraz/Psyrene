// Psyrene design system — tokens ported 1:1 from the Figma export
export const colors = {
  cream: '#F4EFE8',
  surface: '#FFFFFF',
  subtle: '#EDE7DE',
  inputBg: '#F9F5F0',

  sage: '#5C9B74',
  sageL: '#7BBD94',
  sageD: '#3D7A55',
  sageBg: '#D6EBD8',
  teal: '#4A8C9E',
  tealL: '#6AAFC0',
  tealBg: '#D0E8EF',
  warm: '#C07848',
  warmL: '#E09B6A',
  warmBg: '#F0DDD0',
  lav: '#8B72A8',
  lavBg: '#E2D8EF',

  t1: '#1E2530',
  t2: '#5E6E7A',
  t3: '#A0AEBB',

  danger: '#E05050',
  star: '#E8A020',

  border: 'rgba(0,0,0,0.08)',
  border2: 'rgba(0,0,0,0.12)',
};

// gradient stop pairs (use with expo-linear-gradient)
export const gradients = {
  brand: ['#5C9B74', '#4A8C9E'],
  light: ['#EAF5EE', '#E0EEF4'],
  hero: ['#D4EBD9', '#D0E8EF'],
  onboard: ['#D4EBD9', '#D0E8EF'],
  session: ['#1a2535', '#0e1520'],
  progressBar: ['#5C9B74', '#4A8C9E'],
};

export const radius = { r1: 10, r2: 16, r3: 22, r4: 32 };

export const fonts = {
  serif: 'DMSerifDisplay',
  serifItalic: 'DMSerifDisplay-Italic',
  sans: 'DMSans',
  sansMedium: 'DMSans-Medium',
  sansSemiBold: 'DMSans-SemiBold',
};

export const shadow = {
  sh1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sh2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 5,
  },
};

export default { colors, gradients, radius, fonts, shadow };
