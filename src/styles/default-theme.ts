import { ITheme } from "types";

// Old theme - commented out
// const defaultTheme: ITheme = {
//     // Brand Colors
//     brandPrimary: "#007C5B",
//     brandSecondary: "#ecfce5",

//     // Text Colors
//     headingText: "#1F2739",
//     bodyText: "#6C757D",
//     inverseText: "#FFFFFF",

//     // Background Colors
//     formBackground: "#FFFFFF",
//     modalOverlay: "rgba(0, 0, 0, 0.5)",

//     // Interactive Elements
//     buttonPrimaryBackground:
//         "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
//     buttonPrimaryText: "#FFFFFF",
//     buttonPrimaryHover: "#005A44",
//     buttonOutlineBackground: "transparent",
//     buttonOutlineText: "#007C5B",
//     buttonOutlineHoverBackground: "#007C5B",
//     buttonOutlineHoverText: "#FFFFFF",
//     buttonDisabledBackground: "rgba(128, 128, 128, 0.2)",
//     buttonDisabledText: "rgba(128, 128, 128, 0.5)",

//     // Form Input Colors
//     inputBackground: "#FFFFFF",
//     inputBorder: "#D1D5DB",
//     inputFocusBorder: "#007C5B",
//     inputPlaceholder: "#9CA3AF",
//     inputText: "#1F2739",
//     inputLabel: "#1F2739",

//     // State Colors
//     errorBackground: "#FEF2F2",
//     errorText: "#DC2626",
//     errorBorder: "#FECACA",
//     successText: "#16A34A",
// };

// New glassmorphism theme - now default
const defaultTheme: ITheme = {
    brandPrimary: "rgba(255, 255, 255, 0.9)",
    brandSecondary: "rgba(255, 255, 255, 0.7)",
    inverseText: "rgba(255, 255, 255, 0.95)",
    headingText: "rgba(255, 255, 255, 0.95)",
    bodyText: "rgba(255, 255, 255, 0.85)",
    formBackground: "rgba(255, 255, 255, 0.1)", // Transparent glass effect
    modalOverlay: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
    buttonPrimaryBackground: "rgba(255, 255, 255, 0.2)",
    buttonPrimaryText: "rgba(255, 255, 255, 0.95)",
    buttonPrimaryHover: "rgba(255, 255, 255, 0.3)",
    buttonOutlineBackground: "transparent",
    buttonOutlineText: "rgba(255, 255, 255, 0.9)",
    buttonOutlineHoverBackground: "rgba(255, 255, 255, 0.15)",
    buttonOutlineHoverText: "rgba(255, 255, 255, 0.95)",
    buttonDisabledBackground: "rgba(128, 128, 128, 0.2)", // Toned-down grey at 20% opacity
    buttonDisabledText: "rgba(128, 128, 128, 0.5)",
    inputBackground: "rgba(255, 255, 255, 0.1)",
    inputBorder: "rgba(255, 255, 255, 0.2)",
    inputFocusBorder: "rgba(255, 255, 255, 0.4)",
    inputPlaceholder: "rgba(255, 255, 255, 0.5)",
    inputText: "rgba(255, 255, 255, 0.9)",
    inputLabel: "rgba(255, 255, 255, 0.85)",
    errorBackground: "rgba(239, 68, 68, 0.15)",
    errorText: "rgba(254, 202, 202, 1)",
    errorBorder: "rgba(239, 68, 68, 0.5)",
    successText: "rgba(134, 239, 172, 1)",
};

export default defaultTheme;
