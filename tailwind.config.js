/** @type {import('tailwindcss').Config} */
export default {
    content: { files: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"] },
    theme: {
        container: {
            center: true,
            padding: { DEFAULT: "1rem" },
        },
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ["checked"],
            borderColor: ["checked"],
        },
    },
    plugins: [],
};
