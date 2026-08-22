/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F8FA',
        surface: '#FFFFFF',
        'surface-soft': '#F1F3F5',
        ink: '#111318',
        'ink-secondary': '#5F6673',
        'ink-muted': '#8A919D',
        line: '#E6E8EC',
        accent: '#6C63FF',
        'accent-soft': 'rgba(108, 99, 255, 0.08)',
        'accent-line': 'rgba(108, 99, 255, 0.18)',
        // Mesh / glass palette
        'mesh-violet': '#6C63FF',
        'mesh-pink': '#FF7AC6',
        'mesh-cyan': '#22D3EE',
        'mesh-lime': '#A3FF6C',
        'mesh-amber': '#FFB86B',
        'highlight-pink': '#FF4FB6',
        'highlight-cyan': '#06B6D4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
      borderRadius: {
        '4xl': '32px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17,19,24,0.04), 0 8px 24px rgba(17,19,24,0.04)',
        lift: '0 4px 12px rgba(17,19,24,0.06), 0 24px 60px rgba(17,19,24,0.08)',
        ring: '0 0 0 1px rgba(17,19,24,0.06)',
        glass:
          '0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(17,19,24,0.04), 0 12px 32px rgba(17,19,24,0.06)',
        'glass-lift':
          '0 1px 0 rgba(255,255,255,0.7) inset, 0 8px 24px rgba(17,19,24,0.08), 0 30px 80px rgba(17,19,24,0.10)',
        glow: '0 0 0 1px rgba(108,99,255,0.25), 0 12px 40px rgba(108,99,255,0.18)',
      },
      transitionTimingFunction: {
        'soft-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'snappy': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      backgroundImage: {
        'mesh-radial':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 30%, rgba(255,122,198,0.16), transparent 55%), radial-gradient(ellipse 70% 55% at 10% 70%, rgba(34,211,238,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 70% 100%, rgba(163,255,108,0.10), transparent 55%)',
        'gradient-accent':
          'linear-gradient(135deg, #6C63FF 0%, #FF7AC6 50%, #22D3EE 100%)',
        'gradient-soft':
          'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(255,122,198,0.10) 50%, rgba(34,211,238,0.10))',
      },
      animation: {
        'pulse-slow': 'pulseSlow 2.4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'float': 'floatY 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(1.18)' },
        },
        gradientX: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
