import type { Config } from "tailwindcss";

const PHI = 1.618;

const phiScale = (exponent: number): string => `${(PHI ** exponent).toFixed(3)}rem`;

const goldenRatioPreset: Config = {
  content: [],
  theme: {
    extend: {
      spacing: {
        "phi-3xs": phiScale(-3),
        "phi-2xs": phiScale(-2),
        "phi-sm": phiScale(-1),
        "phi-md": phiScale(0),
        "phi-lg": phiScale(1),
        "phi-xl": phiScale(2),
        "phi-2xl": phiScale(3),
        "phi-3xl": phiScale(4),
        "phi-4xl": phiScale(5),
        "phi-5xl": phiScale(6),
        "phi-6xl": phiScale(7),
        "phi-7xl": phiScale(8),
        "phi-8xl": phiScale(9)
      },
      fontSize: {
        display1: [phiScale(3), { lineHeight: "1.128" }],
        display2: [phiScale(2), { lineHeight: "1.272" }],
        title1: ["2.058rem", { lineHeight: "1.272" }],
        title2: [phiScale(1), { lineHeight: "1.272" }],
        title3: ["1.272rem", { lineHeight: "1.272" }],
        heading: ["1.128rem", { lineHeight: "1.272" }],
        body: ["1rem", { lineHeight: "1.618" }],
        subheading: ["0.887rem", { lineHeight: "1.272" }],
        callout: ["0.942rem", { lineHeight: "1.272" }],
        label: ["0.835rem", { lineHeight: "1.272" }],
        caption: ["0.786rem", { lineHeight: "1.272" }]
      },
      lineHeight: {
        phi: "1.618",
        "phi-half": "1.272",
        "phi-quarter": "1.128",
        "phi-tight": "1.062"
      },
      borderRadius: {
        "phi-3xs": phiScale(-3),
        "phi-2xs": phiScale(-2),
        "phi-sm": phiScale(-1),
        "phi-md": phiScale(0),
        "phi-lg": phiScale(1),
        "phi-xl": phiScale(2)
      },
      transitionDuration: {
        "phi-xs": "62ms",
        "phi-sm": "100ms",
        "phi-md": "162ms",
        "phi-lg": "262ms",
        "phi-xl": "424ms",
        "phi-2xl": "685ms"
      },
      transitionTimingFunction: {
        "phi-out": "cubic-bezier(0.236, 0.618, 0.382, 1)",
        "phi-in": "cubic-bezier(0.618, 0, 0.764, 0.382)",
        "phi-in-out": "cubic-bezier(0.618, 0, 0.382, 1)"
      },
      maxWidth: {
        "phi-page": phiScale(9),
        "phi-copy-lg": phiScale(8),
        "phi-card": phiScale(6),
        "phi-prose": "38.2em"
      }
    }
  }
};

export default goldenRatioPreset;
