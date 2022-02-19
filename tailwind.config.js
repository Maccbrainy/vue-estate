module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "2500px",
      },
      colors: {
        teal: {
          lighter: "#ecfeff",
          DEFAULT: "#007889",
          light: "#3cb3bd",
        },
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
}
