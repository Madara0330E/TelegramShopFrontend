/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          dark: "#18172E",
        },
      },
      fontFamily: {
        'inter-tight': ['Inter Tight', 'sans-serif'],
      },
      // Добавляем поддержку font-feature-settings
      fontFeatureSettings: {
        'inter-tight-features': '"salt" on, "ss03" on, "cv01" on',
      },
    },
  },
  plugins: [
    // Плагин для добавления утилит font-feature-settings
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.font-features-inter': {
          fontFeatureSettings: theme('fontFeatureSettings.inter-tight-features'),
          // Альтернативные свойства для лучшей поддержки
          fontVariant: 'none',
          fontVariantAlternates: 'styleset(ss03), character-variant(cv01)',
          fontVariantLigatures: 'salt',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}