import { ITheme } from "types";

const defaultTheme: ITheme = {
    // Brand Colors
    brandPrimary: "#007C5B",
    brandSecondary: "#ecfce5",
    brandAccent: "#17A2B8",

    // Text Colors
    headingText: "#1F2739",
    bodyText: "#6C757D",
    linkText: "#007C5B",
    inverseText: "#FFFFFF",

    // Background Colors
    formBackground: "#FFFFFF",
    modalOverlay: "rgba(0, 0, 0, 0.5)",
    pageBackground: "#FFFFFF",
    cardBackground: "#F8FFF4",

    // Border Colors
    borderColor: "#E8E8E8",
    dividerColor: "#E8E8E8",

    // Interactive Elements
    buttonPrimaryBackground:
        "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
    buttonPrimaryText: "#FFFFFF",
    buttonPrimaryHover: "#005A44",
    buttonOutlineBackground: "transparent",
    buttonOutlineText: "#007C5B",
    buttonOutlineBorder: "#007C5B",
    buttonOutlineHoverBackground: "#007C5B",
    buttonOutlineHoverText: "#FFFFFF",

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
    successBackground: "#F0FDF4",
    successText: "#16A34A",
    warningBackground: "#FFFBEB",
    warningText: "#D97706",

    // Gradients
    primaryGradient:
        "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
    secondaryGradient:
        "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",

    // Spacing and Layout
    modalBorderRadius: "6px",
};

export default defaultTheme;
