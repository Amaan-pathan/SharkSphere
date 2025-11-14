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
        // Premium Dark Theme with Deep Purple + Neon Accents
        bg: {
          primary: '#0A0A0F',        // Deep dark background (not pure black)
          secondary: '#13131A',      // Card/Surface background
          tertiary: '#1A1A24',       // Elevated surfaces
        },
        border: {
          DEFAULT: '#2A2A3A',        // Borders/Dividers
          light: '#3A3A4A',          // Lighter borders
        },
        text: {
          heading: '#FFFFFF',        // Heading Text
          body: '#D1D1D9',           // Body Text (slightly dimmed)
          muted: '#8B8B9A',          // Muted Text
        },
        purple: {
          DEFAULT: '#8B5CF6',        // Deep Purple
          accent: '#A78BFA',         // Purple Accent
          neon: '#C084FC',           // Neon Purple
          glow: 'rgba(139, 92, 246, 0.3)', // Purple Glow
          'glow-strong': 'rgba(192, 132, 252, 0.4)', // Strong Neon Glow
        },
        neon: {
          purple: '#C084FC',         // Neon Purple
          pink: '#EC4899',           // Neon Pink (accent)
        },
        // Legacy support
        'text-primary': '#FFFFFF',
        'text-secondary': '#D1D1D9',
        'text-muted': '#8B8B9A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }], // Responsive 32px-64px
        'h1': ['clamp(1.75rem, 4vw, 2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }], // Responsive 28px-44px
        'h2': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }], // Responsive 24px-36px
        'h3': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.4', fontWeight: '600' }], // Responsive 20px-28px
        'h4': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }], // Responsive 18px-24px
        'body': ['clamp(0.9375rem, 1.5vw, 1.0625rem)', { lineHeight: '1.6', fontWeight: '400' }], // Responsive ~15px-17px
        'body-lg': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6', fontWeight: '400' }], // Responsive 16px-18px
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 8rem)',           // Responsive 64px-128px vertical spacing
        'section-lg': 'clamp(6rem, 12vw, 12rem)',       // Responsive 96px-192px for larger sections
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        'content': '75rem',          // 1200px maximum content width
        'text': '70ch',              // Optimal reading width
      },
      boxShadow: {
        'subtle': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.5)',
        'glow-purple': '0 0 24px rgba(139, 92, 246, 0.3)',
        'glow-neon': '0 0 32px rgba(192, 132, 252, 0.4)',
        'glow-button': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(192, 132, 252, 0.3)',
      },
      borderRadius: {
        'card': '1.5rem',            // 24px border radius
        'lg': '1.25rem',             // 20px
      },
      backdropBlur: {
        'glass': '12px',
        'glass-strong': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(192, 132, 252, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}

