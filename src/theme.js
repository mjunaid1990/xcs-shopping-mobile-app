/**
 * Design tokens for the XCS shopping app.
 * Keeping colours, spacing and shadows in one place keeps every screen consistent.
 */

export const colors = {
  bg: '#F5F5FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F9FAFC',
  ink: '#101828',
  inkSoft: '#344054',
  muted: '#667085',
  faint: '#98A2B3',
  line: '#EAECF0',
  primary: '#5B4CFF',
  primaryDark: '#3B2CD6',
  primarySoft: '#EEF0FF',
  accent: '#FF7A45',
  accentSoft: '#FFF1EB',
  success: '#12B76A',
  successSoft: '#E7F8F0',
  danger: '#F04438',
  dangerSoft: '#FEECEB',
  star: '#F5B400',
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = (n) => n * 4;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#1D1B4C',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  floating: {
    shadowColor: '#1D1B4C',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  primary: {
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
};

export const gradients = {
  primary: ['#6E5BFF', '#4B36E0'],
  accent: ['#FF8A4C', '#F2542D'],
  mint: ['#17C48A', '#0E9E74'],
  hero: ['#2C2560', '#5B4CFF'],
  card: ['#F2F1FF', '#FFFFFF'],
};

export const text = {
  h1: { fontSize: 28, fontWeight: '800', color: colors.ink, letterSpacing: -0.6 },
  h2: { fontSize: 20, fontWeight: '800', color: colors.ink, letterSpacing: -0.3 },
  h3: { fontSize: 16, fontWeight: '700', color: colors.ink },
  body: { fontSize: 14, color: colors.inkSoft, lineHeight: 21 },
  small: { fontSize: 12, color: colors.muted },
  tiny: { fontSize: 11, color: colors.faint },
};
