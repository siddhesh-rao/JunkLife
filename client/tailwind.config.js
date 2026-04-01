export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edfdf3",
          100: "#d5f8e0",
          200: "#b0efc6",
          300: "#7be29f",
          400: "#3fcc72",
          500: "#1eaf56",
          600: "#138944",
          700: "#126c39",
          800: "#145631",
          900: "#12472c",
          950: "#0a2517"
        },
        sand: "#f6f1e8"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(18, 71, 44, 0.12)"
      }
    }
  },
  plugins: []
};
