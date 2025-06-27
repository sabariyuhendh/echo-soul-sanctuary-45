
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Emotional Wellness Color Palette
				calm: {
					50: '#f0f9ff',    // Lightest sky blue - peace
					100: '#e0f2fe',   // Soft blue - tranquility  
					200: '#bae6fd',   // Light blue - serenity
					300: '#7dd3fc',   // Medium blue - clarity
					400: '#38bdf8',   // Bright blue - hope
					500: '#0ea5e9',   // Primary blue - trust
					600: '#0284c7',   // Deep blue - stability
					700: '#0369a1',   // Darker blue - confidence
					800: '#075985',   // Navy blue - security
					900: '#0c4a6e'    // Deepest blue - grounding
				},
				sage: {
					50: '#f0fdf4',    // Soft mint - renewal
					100: '#dcfce7',   // Light green - growth
					200: '#bbf7d0',   // Gentle green - healing
					300: '#86efac',   // Fresh green - vitality
					400: '#4ade80',   // Vibrant green - energy
					500: '#22c55e',   // Primary green - balance
					600: '#16a34a',   // Deep green - nature
					700: '#15803d',   // Forest green - stability
					800: '#166534',   // Dark green - grounding
					900: '#14532d'    // Deepest green - security
				},
				lavender: {
					50: '#faf5ff',    // Softest purple - peace
					100: '#f3e8ff',   // Light lavender - calm
					200: '#e9d5ff',   // Gentle purple - relaxation
					300: '#d8b4fe',   // Medium lavender - comfort
					400: '#c084fc',   // Soft purple - creativity
					500: '#a855f7',   // Primary lavender - inspiration
					600: '#9333ea',   // Deep purple - wisdom
					700: '#7c3aed',   // Rich purple - intuition
					800: '#6b21a8',   // Dark purple - mystery
					900: '#581c87'    // Deepest purple - transformation
				},
				rose: {
					50: '#fff1f2',    // Softest pink - tenderness
					100: '#ffe4e6',   // Light rose - compassion
					200: '#fecdd3',   // Gentle pink - love
					300: '#fda4af',   // Medium rose - warmth
					400: '#fb7185',   // Soft coral - comfort
					500: '#f43f5e',   // Primary rose - passion
					600: '#e11d48',   // Deep rose - strength
					700: '#be123c',   // Rich red - courage
					800: '#9f1239',   // Dark red - power
					900: '#881337'    // Deepest red - determination
				},
				amber: {
					50: '#fffbeb',    // Softest yellow - joy
					100: '#fef3c7',   // Light amber - optimism
					200: '#fde68a',   // Gentle yellow - happiness
					300: '#fcd34d',   // Medium amber - energy
					400: '#fbbf24',   // Bright yellow - confidence
					500: '#f59e0b',   // Primary amber - warmth
					600: '#d97706',   // Deep amber - vitality
					700: '#b45309',   // Rich orange - creativity
					800: '#92400e',   // Dark orange - strength
					900: '#78350f'    // Deepest orange - grounding
				}
			},
			backgroundImage: {
				// Calming gradient combinations
				'calm-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
				'sage-gradient': 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
				'lavender-gradient': 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
				'rose-gradient': 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
				'amber-gradient': 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
				
				// Multi-color wellness gradients
				'wellness-flow': 'linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 25%, #faf5ff 50%, #fff1f2 75%, #fffbeb 100%)',
				'emotional-balance': 'linear-gradient(135deg, #e0f2fe 0%, #dcfce7 50%, #f3e8ff 100%)',
				'inner-peace': 'linear-gradient(135deg, #bae6fd 0%, #bbf7d0 33%, #e9d5ff 66%, #fecdd3 100%)',
				'tranquil-dawn': 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 50%, #a855f7 100%)',
				'healing-light': 'linear-gradient(135deg, #38bdf8 0%, #86efac 25%, #d8b4fe 50%, #fda4af 75%, #fcd34d 100%)',
				
				// Subtle overlay gradients for dark theme
				'calm-overlay': 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
				'sage-overlay': 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
				'wellness-overlay': 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(34, 197, 94, 0.05) 25%, rgba(168, 85, 247, 0.05) 50%, rgba(244, 63, 94, 0.05) 75%, rgba(245, 158, 11, 0.05) 100%)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backdropBlur: {
				xs: '2px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0px)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.05)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'breathe': 'breathe 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
