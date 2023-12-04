import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#000638",
      },
      boxShadow: {
        post: "0px 5px 10px 0px rgba(0, 0, 0, 0.50);",
      },
      fontFamily: {
        merriweather: ["var(--font-merriweather"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
