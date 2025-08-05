const defaultTheme = require("tailwindcss/defaultTheme");
const tailwindcssRadix = require("tailwindcss-radix");

const PrefixExt = "pkas-";

const RenderPrefixVariable = (value) => `var(--${PrefixExt}${value})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
    // No prefix for base utilities
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    important: '.pakt-auth-module',
    theme: {
        screens: {
            sm: { min: "640px" },
            md: { min: "768px" },
            lg: { min: "1024px" },
            xl: { min: "1280px" },
            "2xl": { min: "1536px" },
            "2xl.max": { min: "1600px" },
            "2xl-5": "1600px",
            "1xl": "1440px",
            "max-sm": { max: "639px" },
            "3xl": "1600px",
        },
        extend: {
            colors: {
              primary: RenderPrefixVariable("primary"),
              info: RenderPrefixVariable("info"),
              secondary: RenderPrefixVariable("secondary"),
              "blue-lightest": RenderPrefixVariable("blue-lightest"),
              "blue-darkest": RenderPrefixVariable("blue-darkest"),
              line: RenderPrefixVariable("line"),
              title: RenderPrefixVariable("title"),
              body: RenderPrefixVariable("body"),
              warning: RenderPrefixVariable("warning"),
              success: RenderPrefixVariable("success"),
              danger: RenderPrefixVariable("danger"),
              magnolia: RenderPrefixVariable("magnolia"),
              "primary-brighter": RenderPrefixVariable("primary-brighter"),
              "refer-border": RenderPrefixVariable("refer-border"),
              "exhibit-tab-list": RenderPrefixVariable("exhibit-tab-list"),
            },
            backgroundImage: {
              "btn-primary": RenderPrefixVariable("btn-primary"),
              "primary-gradient": RenderPrefixVariable("primary-gradient"),
              none: "none",
            },
            fontFamily: {
              sans: [RenderPrefixVariable("circular-std-font"), ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
              "modal": RenderPrefixVariable("modal-radius"),
            },
            keyframes: {
              "accordion-down": {
                  from: { height: "0" },
                  to: { height: RenderPrefixVariable("radix-accordion-content-height") },
              },
              "accordion-up": {
                  from: { height: RenderPrefixVariable("radix-accordion-content-height") },
                  to: { height: "0" },
              },
            },
            animation: {
              "accordion-down": "accordion-down 0.2s ease-out",
              "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [tailwindcssRadix],
};