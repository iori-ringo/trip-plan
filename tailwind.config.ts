import type { Config } from "tailwindcss";

import goldenRatioPreset from "./styles/golden-ratio-preset";

const config: Config = {
  presets: [goldenRatioPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        amberLight: "#d6a451",
        brownDeep: "#160e08",
        brownWarm: "#4b2b13",
        ivoryWarm: "#f3ead8",
        mossDeep: "#101c12"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "var(--font-cormorant)", "serif"],
        serifjp: ["var(--font-noto-serif-jp)", "serif"],
        sans: ["var(--font-noto-sans-jp)", "Helvetica Neue", "Arial", "sans-serif"]
      },
      boxShadow: {
        amber: "0 32px 80px -48px rgba(214, 164, 81, 0.64)"
      }
    }
  },
  plugins: []
};

export default config;
