module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "views/**/*.vue",
      "router/**/*.vue",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "2500px",
        lf: { max: "1240px" },
        xlm: { max: "1024px" },
        lm: { min: "991px" },
        mf: { max: "990px" },
        md: { min: "768px" },
        sf: { max: "767px" },
        xs: { max: "640px" },
        xxs: { max: "416px" },
      },
      colors: {
        teal: {
          lighter: "#ecfeff",
          DEFAULT: "#007889",
          light: "#3cb3bd",
        },
      },
      boxShadow: {
        DEFAULT: "0 0 7px #3cb3bd",
      },
    },
  },
  variants: {
    animation: ["motion-safe"],
    extend: {
      display: ["group-hover"],
      backgroundColor: ["active", "group-focus"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
