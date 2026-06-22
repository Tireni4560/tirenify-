import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#09090c',
        'bg-elevated': '#111118',
        'bg-deep': '#060608',
        'bg-surface': 'rgba(255, 255, 255, 0.038)',
        text: '#ededee',
        'text-muted': 'rgba(237, 237, 238, 0.62)',
        'text-faint': 'rgba(237, 237, 238, 0.22)',
        accent: '#7ce0ff',
        'accent-light': '#b8f2ff',
        'accent-dim': 'rgba(124, 224, 255, 0.16)',
        safe: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        border: 'rgba(255, 255, 255, 0.065)',
        'border-hover': 'rgba(255, 255, 255, 0.13)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(124, 224, 255, 0.18), 0 0 30px rgba(124, 224, 255, 0.25)',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
