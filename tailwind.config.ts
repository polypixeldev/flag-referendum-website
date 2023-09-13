import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Phantom Sans", ...defaultTheme.fontFamily.sans],
        "jolly-lodger": [
          "var(--font-jolly-lodger)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        "hc-orange": "#ff8c37",
        "hc-blue": "#338eda",
      },
    },
  },
  plugins: [],
};
export default config;
