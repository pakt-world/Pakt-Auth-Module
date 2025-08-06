const defaultTheme = require("tailwindcss/defaultTheme");
const tailwindcssRadix = require("tailwindcss-radix");

const Prefix = "pka";
const PrefixExt = "pkas-";

const RenderPrefixVariable = (value) => `var(--${PrefixExt}${value})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: Prefix,
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    important: ".pakt-auth-module",
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

                // Surface colors
                "surface-primary": RenderPrefixVariable("surface-primary"),
                "surface-overlay": RenderPrefixVariable("surface-overlay"),

                // Text colors
                "text-primary": RenderPrefixVariable("text-primary"),
                "text-secondary": RenderPrefixVariable("text-secondary"),
                "text-inverse": RenderPrefixVariable("text-inverse"),

                // Input colors
                "input-background": RenderPrefixVariable("input-background"),
                "input-border": RenderPrefixVariable("input-border"),
                "input-focus": RenderPrefixVariable("input-focus"),
                "input-placeholder": RenderPrefixVariable("input-placeholder"),
                "input-text": RenderPrefixVariable("input-text"),
                "input-label": RenderPrefixVariable("input-label"),

                // State colors
                "error-bg": RenderPrefixVariable("error-bg"),
                "error-text": RenderPrefixVariable("error-text"),
                "error-border": RenderPrefixVariable("error-border"),
                "success-bg": RenderPrefixVariable("success-bg"),
                "success-text": RenderPrefixVariable("success-text"),
                "warning-bg": RenderPrefixVariable("warning-bg"),
                "warning-text": RenderPrefixVariable("warning-text"),

                // Button colors
                "btn-primary-bg": RenderPrefixVariable("btn-primary-bg"),
                "btn-primary-text": RenderPrefixVariable("btn-primary-text"),
                "btn-primary-hover": RenderPrefixVariable("btn-primary-hover"),
                "btn-outline-bg": RenderPrefixVariable("btn-outline-bg"),
                "btn-outline-text": RenderPrefixVariable("btn-outline-text"),
                "btn-outline-border":
                    RenderPrefixVariable("btn-outline-border"),
                "btn-outline-hover-bg": RenderPrefixVariable(
                    "btn-outline-hover-bg"
                ),
                "btn-outline-hover-text": RenderPrefixVariable(
                    "btn-outline-hover-text"
                ),
            },
            backgroundImage: {
                "btn-primary": RenderPrefixVariable("btn-primary"),
                "primary-gradient": RenderPrefixVariable("primary-gradient"),
                none: "none",
            },
            fontFamily: {
                sans: [
                    RenderPrefixVariable("circular-std-font"),
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            borderRadius: {
                "modal": RenderPrefixVariable("modal-radius"),
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: {
                        height: RenderPrefixVariable(
                            "radix-accordion-content-height"
                        ),
                    },
                },
                "accordion-up": {
                    from: {
                        height: RenderPrefixVariable(
                            "radix-accordion-content-height"
                        ),
                    },
                    to: { height: "0" },
                },
                overlayShow: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                contentShow: {
                    from: {
                        opacity: "0",
                        transform: "translate(-50%, -48%) scale(0.96)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translate(-50%, -50%) scale(1)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
                contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            },
            transitionDuration: {
                DEFAULT: "150ms",
            },
            screens: {
                "xs": "375px",
            },
        },
    },
    plugins: [tailwindcssRadix],
};
