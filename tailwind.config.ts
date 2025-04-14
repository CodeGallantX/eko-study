import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#4c5f4e',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				DEFAULT: '#92b76d',
  				foreground: '#ffffff'
  			},
  			deepGreen: '#4c5f4e',
  			green: '#92b76d',
  			yellow: '#ffca0d',
  			beige: '#e6e1d1',
  			accent: {
  				DEFAULT: '#92b76d',
  				foreground: '#ffffff'
  			},
  			background: '#ffffff',
  			black: '#000000',
  			white: '#ffffff',
  			foreground: '#000000',
  			card: {
  				DEFAULT: '#ffffff',
  				foreground: '#000000'
  			},
  			popover: {
  				DEFAULT: '#ffffff',
  				foreground: '#000000'
  			},
  			muted: {
  				DEFAULT: '#f5f5f5',
  				foreground: '#737373'
  			},
  			destructive: {
  				DEFAULT: '#ef4444',
  				foreground: '#ffffff'
  			},
  			border: '#e5e5e5',
  			input: '#e5e5e5',
  			ring: '#4c5f4e',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;