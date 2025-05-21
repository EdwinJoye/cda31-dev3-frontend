/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xs: "36em",
      sm: "48em",
      md: "62em",
      lg: "75em",
      xl: "88em",
      mobile: "440px",
      tablet: "640px",
      laptop: "1060px",
      desktop: "1320px",
    },
    fontSize: {
      ...defaultTheme.fontSize,
      // sm: ['14px', '20px'],
      base: ["0.9rem", "1.4rem"],
      // lg: ['20px', '28px'],
      // xl: ['24px', '32px'],
    },
    extend: {
      fontFamily: {
        "twitter-chirp": ["TwitterChirp", "sans-serif"],
        "twitter-chirp-extended": ["TwitterChirpExtendedHeavy", "sans-serif"],
      },
      colors: {
        // primary: colors.indigo[500],
        primary: colors.slate[600],
        secondary: colors.yellow[300],
        neutral: colors.gray,
        "primary-border": colors.slate[300],
        "primary-hover": colors.slate[700],
        "primary-extralight": colors.slate[100],
        "primary-light": colors.slate[200],
        "primary-hover-light": colors.slate[300],
        "primary-hover-extralight": colors.slate[200],
        "primary-disabled": colors.slate[300],
        "accent-red": "#F4212E",
        "dark-primary": "#E7E9EA",
        "dark-secondary": "#71767B",
        "light-primary": "#0F1419",
        "light-secondary": "#536471",
        "dark-border": "#2F3336",
        "light-border": "#EFF3F4",
        "dark-line-reply": "#333639",
        "light-line-reply": "#CFD9DE",
        "twitter-icon": "#D6D9DB",
        "image-preview-hover": "#272C30",
        "main-primary": "rgb(var(--main-primary) / <alpha-value>)",
        "main-secondary": "rgb(var(--main-secondary) / <alpha-value>)",
        "main-background": "rgb(var(--main-background) / <alpha-value>)",
        "main-search-background":
          "rgb(var(--main-search-background) / <alpha-value>)",
        "main-sidebar-background":
          "rgb(var(--main-sidebar-background) / <alpha-value>)",
        "main-accent": "rgb(var(--main-accent) / <alpha-value>)",
        "accent-yellow": "rgb(var(--accent-yellow) / <alpha-value>)",
        "accent-blue": "rgb(var(--accent-blue) / <alpha-value>)",
        "accent-pink": "rgb(var(--accent-pink) / <alpha-value>)",
        "accent-purple": "rgb(var(--accent-purple) / <alpha-value>)",
        "accent-orange": "rgb(var(--accent-orange) / <alpha-value>)",
        "accent-green": "rgb(var(--accent-green) / <alpha-value>)",
      },
      boxShadow: {
        outline: "0 0 0 1.2px #3B82F6",
      },
      animation: {
        "pulse-twice": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 3",
      },
      // keyframes: {
      //   pulse: {
      //     "0%, 100%": {
      //       opacity: 1,
      //     },
      //     "50%": {
      //       opacity: 0.5,
      //       transform: "scale(1.1)",
      //     },
      //   },
      // },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/aspect-ratio"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
    function ({ addBase }) {
      addBase({
        html: { fontSize: "15px" },
      });
    },
  ],
};

// const defaultTheme = require("tailwindcss/defaultTheme");

// module.exports = {
//   darkMode: "class",
//   content: ["./src/**/*.{html,ts,tsx}"],
//   theme: {
//     screens: {
//       xs: "500px",
//       ...defaultTheme.screens,
//     },
//     extend: {
//       fontFamily: {
//         "twitter-chirp": ["TwitterChirp", "sans-serif"],
//         "twitter-chirp-extended": ["TwitterChirpExtendedHeavy", "sans-serif"],
//       },
//       // prettier-ignore
//       colors: {
//         'main-primary': 'rgb(var(--main-primary) / <alpha-value>)',
//         'main-secondary': 'rgb(var(--main-secondary) / <alpha-value>)',
//         'main-background': 'rgb(var(--main-background) / <alpha-value>)',
//         'main-search-background': 'rgb(var(--main-search-background) / <alpha-value>)',
//         'main-sidebar-background': 'rgb(var(--main-sidebar-background) / <alpha-value>)',
//         'main-accent': 'rgb(var(--main-accent) / <alpha-value>)',
//         'accent-yellow': 'rgb(var(--accent-yellow) / <alpha-value>)',
//         'accent-blue': 'rgb(var(--accent-blue) / <alpha-value>)',
//         'accent-pink': 'rgb(var(--accent-pink) / <alpha-value>)',
//         'accent-purple': 'rgb(var(--accent-purple) / <alpha-value>)',
//         'accent-orange': 'rgb(var(--accent-orange) / <alpha-value>)',
//         'accent-green': 'rgb(var(--accent-green) / <alpha-value>)',
//         'accent-red': '#F4212E',
//         'dark-primary': '#E7E9EA',
//         'dark-secondary': '#71767B',
//         'light-primary': '#0F1419',
//         'light-secondary': '#536471',
//         'dark-border': '#2F3336',
//         'light-border': '#EFF3F4',
//         'dark-line-reply': '#333639',
//         'light-line-reply': '#CFD9DE',
//         'twitter-icon': '#D6D9DB',
//         'image-preview-hover': '#272C30',
//       },
//     },
//   },
//   plugins: [
//     ({ addVariant }) => {
//       addVariant("inner", "& > *");
//     },
//   ],
// };
