/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			colors: {
				'accent-start': '#06b6d4', // cyan-500
				'accent-end': '#7c3aed',   // violet-600
				brand: {
					DEFAULT: '#0ea5e9',
					50: '#e6f9ff',
					100: '#ccf3ff',
					200: '#99e7ff',
					300: '#66d9ff',
					400: '#33ccff',
					500: '#0ea5e9',
					600: '#0b86bf',
					700: '#08607f'
				},
				'vibrant-red': '#ef4444',
				'vibrant-yellow': '#f59e0b',
				'vibrant-green': '#10b981',
				'vibrant-blue': '#3b82f6',
			}
		}
	},
	plugins: [],
}

