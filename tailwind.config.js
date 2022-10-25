module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "2500px",
        lf: { max: "1240px" },
        lm: { min: "991px" },
        mf: { max: "990px" },
        sf: { max: "767px" },
        xs: { max: "640px" },
        xxs: { max: "410px" },
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
