/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: "minmax(14rem, 16rem) 1fr",
      },
      colors: {
        "metaverso-blue-ligth": "#007ff5",
        "metaverso-blue-dark": "#0261ba",
        "metaverso-white": "#ffffff",
      },
      backgroundImage: {
        "gradient-metaverso-dark":
          "linear-gradient(180deg, #017cf5 10%, #033d75 100%)",
        "gradient-metaverso-ligth":
          "linear-gradient(360deg, #f0f3f1 10%, #E2E8E3  100%)",
        "gradient-metaverso-blue":
          "linear-gradient(180deg, #017cf5 10%, #033d75 100%);",
        "gradient-metaverso-grey":
          "linear-gradient(180deg, #f2f5f8 10%, #f7fafc 100%);",
      },
      translate: {
        "-1/2": "-50%",
      },
    },
  },
  plugins: [],
};
