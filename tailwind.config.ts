/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        // Core Brand Colors
        khatra: {
          purple: '#9333EA',
          indigo: '#4F46E5',
          blue: '#2563EB',
        },

        // Gradient Colors
        gradient: {
          primary: {
            start: '#4A1D96',
            middle: '#312E81',
            end: '#1E40AF',
          },
          secondary: {
            start: '#9333EA',
            middle: '#4F46E5',
            end: '#2563EB',
          },
          accent: {
            start: '#C084FC',
            middle: '#818CF8',
            end: '#60A5FA',
          },
        },

        // Action Colors
        primary: {
          DEFAULT: '#9333EA',
          hover: '#A855F7',
          active: '#7E22CE',
        },
        secondary: {
          DEFAULT: '#4F46E5',
          hover: '#6366F1',
          active: '#4338CA',
        },

        // Semantic Colors
        success: {
          DEFAULT: '#22C55E',
          light: '#86EFAC',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FCA5A5',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
        },

        // Neutral/Background Colors
        neutral: {
          DEFAULT: '#6B7280',
          light: '#D1D5DB',
        },
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          elevated: '#334155',
          overlay: 'rgba(15, 23, 42, 0.8)',
        },

        // Text Colors
        text: {
          primary: '#FFFFFF',
          secondary: '#E2E8F0',
          muted: '#94A3B8',
          dark: '#1E293B',
          "dark-secondary": '#475569',
        },

        // Component Colors
        card: {
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.15)',
        },
        input: {
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
          focus: 'rgba(147, 51, 234, 0.5)',
        },
        nav: {
          bg: 'rgba(15, 23, 42, 0.9)',
          border: 'rgba(255, 255, 255, 0.1)',
          active: '#9333EA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
} satisfies Config;
