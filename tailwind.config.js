/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F7F7F7',
        text: '#111111',
        accent: '#000000',
        brand: {
          DEFAULT: '#2563EB',
          violet: '#7C3AED',
        },
        story: {
          yellow: {
            DEFAULT: '#CA8A04',
            soft: '#FEF9C3',
          },
          blue: {
            DEFAULT: '#2563EB',
            soft: '#EFF6FF',
          },
          green: {
            DEFAULT: '#16A34A',
            soft: '#DCFCE7',
          },
          purple: {
            DEFAULT: '#7C3AED',
            soft: '#F5F3FF',
          },
        },
        muted: '#6B7280',
        border: '#E8E8E8',
      },
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'depth-sm': '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -2px rgba(0,0,0,0.06)',
        'depth-md': '0 4px 16px -4px rgba(0,0,0,0.08), 0 12px 40px -12px rgba(0,0,0,0.1)',
        'depth-lg': '0 8px 24px -8px rgba(0,0,0,0.1), 0 32px 80px -28px rgba(0,0,0,0.14)',
        'glow-blue': '0 0 64px -16px rgba(37,99,235,0.18)',
        'glow-violet': '0 0 64px -16px rgba(124,58,237,0.14)',
        'glow-dual': '0 0 80px -20px rgba(37,99,235,0.1), 0 0 60px -24px rgba(124,58,237,0.08)',
        'glow-green-soft': '0 0 24px -4px rgba(77,124,95,0.22)',
      },
      backgroundImage: {
        'radial-light': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.9) 0%, transparent 70%)',
        'accent-progress': 'linear-gradient(90deg, #2563EB, #7C3AED)',
      },
    },
  },
  plugins: [],
}
