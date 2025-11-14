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
        // Primary backgrounds
        black: {
          DEFAULT: '#0D0D0D',
          rich: '#0D0D0D',
        },
        charcoal: {
          DEFAULT: '#121212',
          dark: '#121212',
        },
        surface: {
          DEFAULT: '#1A1A1A',
          elevated: '#1A1A1A',
        },
        // Brand accent - Premium Gold
        gold: {
          DEFAULT: '#D4AF37',
          premium: '#D4AF37',
          muted: '#C6972D',
          hover: '#C6972D',
        },
        // Secondary accent - Professional Blue
        blue: {
          DEFAULT: '#4A90E2',
          calm: '#4A90E2',
          light: '#6EC1E4',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#D9D9D9',
          muted: '#A6A6A6',
        },
        // Legacy support
        accent: {
          DEFAULT: '#D4AF37',
          light: '#C6972D',
          dark: '#C6972D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        'section': '7rem', // 112px vertical spacing
        'section-lg': '8rem', // 128px for larger sections
      },
      maxWidth: {
        'content': '75rem', // 1200px
        'text': '65ch', // Optimal reading width
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.5)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.25)',
      },
      borderRadius: {
        'card': '1rem',
      },
    },
  },
  plugins: [],
}

