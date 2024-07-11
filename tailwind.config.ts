import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-pattern":
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('/app/assets/images/auth-bg.jpeg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
