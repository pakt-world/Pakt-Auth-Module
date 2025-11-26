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

    // Text Colors
    headingText?: string; // Color for headings and titles
    bodyText?: string; // Color for body text and descriptions
    inverseText?: string; // White text for dark backgrounds

    // Background Colors
    formBackground?: string; // Background color for forms and cards
    modalOverlay?: string; // Overlay color for modals and dialogs

    // Interactive Elements
    buttonPrimaryBackground?: string; // Primary button background
    buttonPrimaryText?: string; // Primary button text color
    buttonPrimaryHover?: string; // Primary button hover state
    buttonOutlineBackground?: string; // Outline button background
    buttonOutlineText?: string; // Outline button text color
    buttonOutlineHoverBackground?: string; // Outline button hover background
    buttonOutlineHoverText?: string; // Outline button hover text
    buttonDisabledBackground?: string; // Disabled button background
    buttonDisabledText?: string; // Disabled button text color

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
    successText?: string; // Success state text
}

export { IAny, I0xAddressType, type ITheme };
