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
        accent: "#FF0700",
      },
    },
  },
  plugins: [],
} satisfies Config;
