/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

interface GoogleOAuthConfig {
    clientId: string;
    clientSecret?: string;
    redirectUri?: string;
    scope?: string[];
    hostedDomain?: string;
}

interface ConfigContextType {
    baseUrl: string; // PAKT SDK base URL
    testnet?: boolean; // Use testnet environment
    verbose?: boolean; // Enable verbose logging
    theme?: ITheme; // colors to theme the package
    googleOAuth?: GoogleOAuthConfig; // Google OAuth configuration
}

export type { ConfigContextType, GoogleOAuthConfig };

type IAny = any;
type I0xAddressType = `0x${string}`;

interface ITheme {
    // Brand Colors
    brandPrimary?: string; // Main brand color for buttons, links, icons
    brandSecondary?: string; // Secondary brand color for backgrounds
    brandAccent?: string; // Accent color for highlights

    // Text Colors
    headingText?: string; // Color for headings and titles
    bodyText?: string; // Color for body text and descriptions
    linkText?: string; // Color for links and interactive text
    inverseText?: string; // White text for dark backgrounds

    // Background Colors
    formBackground?: string; // Background color for forms and cards
    modalOverlay?: string; // Overlay color for modals and dialogs
    pageBackground?: string; // Main page background color
    cardBackground?: string; // Background for cards and containers

    // Border Colors
    borderColor?: string; // Default border color
    dividerColor?: string; // Color for dividers and separators

    // Interactive Elements
    buttonPrimaryBackground?: string; // Primary button background
    buttonPrimaryText?: string; // Primary button text color
    buttonPrimaryHover?: string; // Primary button hover state
    buttonOutlineBackground?: string; // Outline button background
    buttonOutlineText?: string; // Outline button text color
    buttonOutlineBorder?: string; // Outline button border color
    buttonOutlineHoverBackground?: string; // Outline button hover background
    buttonOutlineHoverText?: string; // Outline button hover text

    // Form Input Colors
    inputBackground?: string; // Input field background
    inputBorder?: string; // Input field border
    inputFocusBorder?: string; // Input field focus border
    inputPlaceholder?: string; // Input placeholder text
    inputText?: string; // Input text color
    inputLabel?: string; // Input label text color

    // State Colors
    errorBackground?: string; // Error state background
    errorText?: string; // Error state text
    errorBorder?: string; // Error state border
    successBackground?: string; // Success state background
    successText?: string; // Success state text
    warningBackground?: string; // Warning state background
    warningText?: string; // Warning state text

    // Gradients
    primaryGradient?: string; // Primary gradient for buttons
    secondaryGradient?: string; // Secondary gradient

    // Spacing and Layout
    modalBorderRadius?: string; // Border radius for modals
}

export { IAny, I0xAddressType, type ITheme };
