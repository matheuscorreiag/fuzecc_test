import nativewindPreset from "nativewind/preset";
import type { Config } from "tailwindcss";
import { colors } from "./theme/colors";

const config = {
  presets: [nativewindPreset],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
      padding: {
        page: "24px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
