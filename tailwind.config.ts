import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-pattern":
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('/app/assets/images/auth-bg.jpeg')",
      },

      colors: {
        primary: "#f8f8f8",
        secondary: "#c6c6c6",
        accent: "#ff7f3e",
        "off-black": "#1d1d1d",
        "transparent-black": "rgba(0, 0, 0, 0.2)",
      },

      aspectRatio: {
        "10/4": "10 / 6",
      },

      animation: {
        slide: "5s slide infinite linear",
      },
      keyframes: {
        slide: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
      },

      maxWidth: {
        "screen-3xl": "2048px",
      },
    },
  },
  plugins: [],
} satisfies Config;
