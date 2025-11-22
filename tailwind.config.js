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
                // Brand Colors
                "brand-primary": RenderPrefixVariable("brand-primary"),
                "brand-secondary": RenderPrefixVariable("brand-secondary"),

                // Text Colors
                "heading-text": RenderPrefixVariable("heading-text"),
                "body-text": RenderPrefixVariable("body-text"),
                "inverse-text": RenderPrefixVariable("inverse-text"),

                // Background Colors
                "form-background": RenderPrefixVariable("form-background"),
                "modal-overlay": RenderPrefixVariable("modal-overlay"),

                // Interactive Elements
                "button-primary-background": RenderPrefixVariable(
                    "button-primary-background"
                ),
                "button-primary-text": RenderPrefixVariable(
                    "button-primary-text"
                ),
                "button-primary-hover": RenderPrefixVariable(
                    "button-primary-hover"
                ),
                "button-outline-background": RenderPrefixVariable(
                    "button-outline-background"
                ),
                "button-outline-text": RenderPrefixVariable(
                    "button-outline-text"
                ),
                "button-outline-hover-background": RenderPrefixVariable(
                    "button-outline-hover-background"
                ),
                "button-outline-hover-text": RenderPrefixVariable(
                    "button-outline-hover-text"
                ),

                // Form Input Colors
                "input-background": RenderPrefixVariable("input-background"),
                "input-border": RenderPrefixVariable("input-border"),
                "input-focus-border":
                    RenderPrefixVariable("input-focus-border"),
                "input-placeholder": RenderPrefixVariable("input-placeholder"),
                "input-text": RenderPrefixVariable("input-text"),
                "input-label": RenderPrefixVariable("input-label"),

                // State Colors
                "error-background": RenderPrefixVariable("error-background"),
                "error-text": RenderPrefixVariable("error-text"),
                "error-border": RenderPrefixVariable("error-border"),
                "success-text": RenderPrefixVariable("success-text"),
            },
            backgroundImage: {
                none: "none",
            },
            fontFamily: {
                sans: [
                    RenderPrefixVariable("circular-std-font"),
                    ...defaultTheme.fontFamily.sans,
                ],
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
