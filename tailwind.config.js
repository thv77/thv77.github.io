/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // True Monochrome Grays (Zero Color Tint)
        zinc: {
          950: '#000000', // Pitch void
          900: '#09090b', // Deep obsidian card
          850: '#111113',
          800: '#18181b', // Carbon border/panel
          700: '#27272a',
          600: '#3f3f46',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
          50: '#fafafa',
        },
        slate: {
          950: '#000000',
          900: '#09090b',
          850: '#111113',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
          50: '#fafafa',
        },
        space: {
          950: '#000000',
          900: '#09090b',
          850: '#111113',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
          50: '#fafafa',
        },
        galaxy: {
          950: '#000000',
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#52525b',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#ffffff',
        },
        // Blue & Cyan tokens mapped to clean Monochrome to guarantee ZERO blue tint anywhere
        cyan: {
          950: '#000000',
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#52525b',
          500: '#71717a',
          400: '#d4d4d8',
          300: '#e4e4e7',
          200: '#f4f4f5',
          100: '#ffffff',
          50: '#ffffff',
        },
        blue: {
          950: '#000000',
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#52525b',
          500: '#71717a',
          400: '#d4d4d8',
          300: '#e4e4e7',
          200: '#f4f4f5',
          100: '#ffffff',
          50: '#ffffff',
        },
        sky: {
          950: '#000000',
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#52525b',
          500: '#71717a',
          400: '#d4d4d8',
          300: '#e4e4e7',
          200: '#f4f4f5',
          100: '#ffffff',
          50: '#ffffff',
        },
        indigo: {
          950: '#000000',
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#52525b',
          500: '#71717a',
          400: '#d4d4d8',
          300: '#e4e4e7',
          200: '#f4f4f5',
          100: '#ffffff',
          50: '#ffffff',
        },
        // Medical status colors (accepted: emerald, amber, red)
        nasa: {
          white: '#ffffff',
          black: '#000000',
          red: '#ef4444',
          emerald: '#10b981',
          amber: '#f59e0b',
          crimson: '#ef4444'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
