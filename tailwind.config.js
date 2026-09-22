/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './src/**/*.{js,jsx,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        nv: {
          page: 'rgb(var(--nv-page) / <alpha-value>)',
          surface: 'rgb(var(--nv-surface) / <alpha-value>)',
          'surface-subtle': 'rgb(var(--nv-subtle) / <alpha-value>)',
          subtle: 'rgb(var(--nv-subtle) / <alpha-value>)',
          border: 'rgb(var(--nv-line) / <alpha-value>)',
          line: 'rgb(var(--nv-line) / <alpha-value>)',
          text: {
            DEFAULT: 'rgb(var(--nv-text) / <alpha-value>)',
            secondary: 'rgb(var(--nv-secondary) / <alpha-value>)',
            muted: 'rgb(var(--nv-muted) / <alpha-value>)',
          },
          muted: 'rgb(var(--nv-muted) / <alpha-value>)',
          primary: {
            DEFAULT: 'rgb(var(--nv-primary) / <alpha-value>)',
            hover: 'rgb(var(--nv-primary-hover) / <alpha-value>)',
          },
          accent: {
            DEFAULT: 'rgb(var(--nv-accent) / <alpha-value>)',
            hover: 'rgb(var(--nv-accent-hover) / <alpha-value>)',
            subtle: 'rgb(var(--nv-accent-subtle) / <alpha-value>)',
          },
          gold: {
            DEFAULT: '#D97706',
            subtle: 'rgb(var(--nv-gold-subtle) / <alpha-value>)',
          },
          success: 'rgb(var(--nv-success) / <alpha-value>)',
          warning: 'rgb(var(--nv-warning) / <alpha-value>)',
          error: 'rgb(var(--nv-error) / <alpha-value>)',
        },
        islamic: {
          DEFAULT: 'rgb(var(--rl-islamic) / <alpha-value>)',
          soft: 'rgb(var(--rl-islamic-soft) / <alpha-value>)',
          border: 'rgb(var(--rl-islamic-border) / <alpha-value>)',
        },
        christian: {
          DEFAULT: 'rgb(var(--rl-christian) / <alpha-value>)',
          soft: 'rgb(var(--rl-christian-soft) / <alpha-value>)',
          border: 'rgb(var(--rl-christian-border) / <alpha-value>)',
        },
        hindu: {
          DEFAULT: 'rgb(var(--rl-hindu) / <alpha-value>)',
          soft: 'rgb(var(--rl-hindu-soft) / <alpha-value>)',
          border: 'rgb(var(--rl-hindu-border) / <alpha-value>)',
        },
        italian: {
          DEFAULT: 'rgb(var(--rl-italian) / <alpha-value>)',
          soft: 'rgb(var(--rl-italian-soft) / <alpha-value>)',
          border: 'rgb(var(--rl-italian-border) / <alpha-value>)',
        },
      },
      borderRadius: {
        card: '1.125rem',
        pill: '9999px',
        bento: '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 12px 32px -6px rgb(0 0 0 / 0.08), 0 4px 12px -2px rgb(0 0 0 / 0.04)',
        'elevated': '0 20px 40px -15px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.03)',
        'glow-accent': '0 0 25px -5px rgb(37 99 235 / 0.25)',
        'glow-islamic': '0 0 25px -5px rgb(16 185 129 / 0.25)',
        'glow-gold': '0 0 25px -5px rgb(217 119 6 / 0.25)',
      },
      maxWidth: {
        page: '76rem',
      },
    },
  },
  plugins: [],
};
