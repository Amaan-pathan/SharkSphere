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
        // STRICT COLOR SYSTEM - DO NOT CHANGE
        bg: {
          primary: '#0D0D0D',      // Primary Background
          secondary: '#151515',      // Card / Surface Background
        },
        border: {
          DEFAULT: '#262626',        // Borders / Dividers
        },
        text: {
          heading: '#FFFFFF',        // Heading Text
          body: '#CCCCCC',           // Body Text
          muted: '#8A8A8A',          // Muted Text
        },
        purple: {
          accent: '#7B5FFF',         // Purple Accent (ONLY accent color)
          glow: 'rgba(123, 95, 255, 0.25)', // Purple Glow Hover
        },
        // Legacy support for existing components
        'text-primary': '#FFFFFF',
        'text-secondary': '#CCCCCC',
        'text-muted': '#8A8A8A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }], // 56px
        'h1': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }], // 40px
        'h2': ['2rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }], // 32px
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        'body': ['1.0625rem', { lineHeight: '1.5', fontWeight: '400' }], // ~17px
        'body-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }], // 18px
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        'section': '7.5rem',         // 120px vertical spacing
        'section-lg': '10rem',       // 160px for larger sections
      },
      maxWidth: {
        'content': '68.75rem',      // 1100px maximum content width
        'text': '65ch',              // Optimal reading width
      },
      boxShadow: {
        'subtle': '0 0 20px rgba(0, 0, 0, 0.4)',
        'glow-purple': '0 0 20px rgba(123, 95, 255, 0.25)',
      },
      borderRadius: {
        'card': '0.75rem',           // 12px border radius
      },
    },
  },
  plugins: [],
}

