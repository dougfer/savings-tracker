/**
 * Design tokens — NativeWind + Tailwind 3
 *
 * Valores: `specs/002-design-tokens-style-guide/exports/*.md`
 * Mapa: `specs/002-design-tokens-style-guide/contracts/figma-source-map.md`
 *
 * Nós Figma: cores `271-2935`, tipografia `271-2905`, spacing `271-3209`, radius `271-3317` (radius: API 429 em 2026-05-12 — ver `exports/radius-from-figma.md`).
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#02012C',
        neutral: {
          0: '#FFFFFF',
          300: '#B7B7B7',
          400: '#898A8B',
          500: '#676767',
          600: '#3C3B40',
          700: '#313131',
          800: '#1F1F1F',
          900: '#101010',
        },
        orange: {
          400: '#FF5722',
          500: '#EB430E',
          700: '#B92B09',
          800: '#903014',
        },
        green: {
          500: '#4ADE80',
          900: '#1A3D2B',
        },
        red: {
          500: '#EF4444',
        },
        border: '#CACFD8',
        input: '#CACFD8',
        ring: '#EB430E',
        background: '#FFFFFF',
        foreground: '#02012C',
        card: '#FFFFFF',
        'card-foreground': '#02012C',
        muted: '#E0E4EA',
        'muted-foreground': '#676767',
        primary: '#EB430E',
        'primary-foreground': '#FFFFFF',
        secondary: '#3C3B40',
        'secondary-foreground': '#FFFFFF',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
        success: '#4ADE80',
        'success-foreground': '#1A3D2B',
        warning: '#FF5722',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold': ['Inter_700Bold'],
        display: ['BricolageGrotesque_600SemiBold'],
        'display-semibold': ['BricolageGrotesque_600SemiBold'],
      },
      // Apply font via `font-*` classes (font-sans, font-sans-medium, font-display, etc.).
      // Tailwind fontSize only supports lineHeight, letterSpacing, and fontWeight.
      fontSize: {
        'display-lg': ['64px', { lineHeight: '64px', letterSpacing: '-2px' }],
        'display-md': ['44px', { lineHeight: '44px', letterSpacing: '-2px' }],
        'heading-lg': ['32px', { lineHeight: '38.4px' }],
        'heading-md': ['20px', { lineHeight: '24px', letterSpacing: '-0.3px' }],
        'heading-sm': ['20px', { lineHeight: '24px', letterSpacing: '-0.3px' }],
        body: ['16px', { lineHeight: '24px', letterSpacing: '-0.3px' }],
        'body-semibold': ['16px', { lineHeight: '22.4px', letterSpacing: '-0.3px' }],
        'body-sm': ['14px', { lineHeight: '19.6px', letterSpacing: '-0.3px' }],
        caption: ['11px', { lineHeight: '13.2px' }],
        amount: ['20px', { lineHeight: '24px', letterSpacing: '-0.3px' }],
      },
      spacing: {
        px: '1px',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '140px',
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
