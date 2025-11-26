import { ITheme } from "types";

const defaultTheme: ITheme = {
    // Brand Colors
    brandPrimary: "#007C5B",
    brandSecondary: "#ecfce5",

    // Text Colors
    headingText: "#1F2739",
    bodyText: "#6C757D",
    inverseText: "#FFFFFF",

    // Background Colors
    formBackground: "#FFFFFF",
    modalOverlay: "rgba(0, 0, 0, 0.5)",

    // Interactive Elements
    buttonPrimaryBackground:
        "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
    buttonPrimaryText: "#FFFFFF",
    buttonPrimaryHover: "#005A44",
    buttonOutlineBackground: "transparent",
    buttonOutlineText: "#007C5B",
    buttonOutlineHoverBackground: "#007C5B",
    buttonOutlineHoverText: "#FFFFFF",
    buttonDisabledBackground: "rgba(128, 128, 128, 0.2)",
    buttonDisabledText: "rgba(128, 128, 128, 0.5)",

    // Form Input Colors
    inputBackground: "#FFFFFF",
    inputBorder: "#D1D5DB",
    inputFocusBorder: "#007C5B",
    inputPlaceholder: "#9CA3AF",
    inputText: "#1F2739",
    inputLabel: "#1F2739",

    // State Colors
    errorBackground: "#FEF2F2",
    errorText: "#DC2626",
    errorBorder: "#FECACA",
    successText: "#16A34A",
};

export default defaultTheme;
