import { ITheme } from "types";

const defaultTheme: ITheme = {
    primary: "#007C5B",
    info: "#17A2B8",
    secondary: "#ecfce5",
    "blue-lightest": "#C9F0FF",
    "blue-darkest": "#0065D0",
    line: "#E8E8E8",
    title: "#1F2739",
    body: "#6C757D",
    warning: "#F2C94C",
    success: "#28A745",
    danger: "#DC3545",
    magnolia: "#F8FFF4",
    "exhibit-tab-list": "#FCFFFB",
    "primary-brighter": "#ECFCE5",
    "refer-border": "#E8E8E8",
    "btn-primary":
        "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
    "primary-gradient":
        "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
    "modal-radius": "6px",
    
    surface: {
        primary: "#FFFFFF",
        overlay: "rgba(0, 0, 0, 0.8)",
    },
    
    text: {
        primary: "#1F2739",
        secondary: "#6C757D",
        inverse: "#FFFFFF",
    },
    
    input: {
        background: "#FFFFFF",
        border: "#D1D5DB",
        focus: "#007C5B",
        placeholder: "#9CA3AF",
    },
    
    states: {
        error: {
            background: "#FEF2F2",
            text: "#DC2626",
            border: "#FECACA",
        },
        success: {
            background: "#F0FDF4",
            text: "#16A34A",
        },
        warning: {
            background: "#FFFBEB",
            text: "#D97706",
        },
    },
    
    button: {
        primary: {
            background: "#007C5B",
            text: "#FFFFFF",
            hover: "#005A44",
        },
        outline: {
            background: "transparent",
            text: "#007C5B",
            border: "#007C5B",
            hover: {
                background: "#007C5B",
                text: "#FFFFFF",
            },
        },
    },
};

export default defaultTheme;
