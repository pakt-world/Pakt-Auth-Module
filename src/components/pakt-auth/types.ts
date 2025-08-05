import { ConfigContextType } from "types";

type AuthRef = {
    onLogin: () => void;
    onSignup: () => void;
};

interface AuthTextConfig {
    loginTitle: string;
    loginDescription: string;
    signupTitle: string;
    signupDescription: string;
}

interface PaktAuthProps {
    config: ConfigContextType;
    textConfig?: AuthTextConfig;
    onLoginSuccess?: (userData: any) => void;
    onSignupSuccess?: (userData: any) => void;
}

interface DesktopAuthProps {
    textConfig?: AuthTextConfig;
    onLoginSuccess?: (userData: any) => void;
    onSignupSuccess?: (userData: any) => void;
}

export type { PaktAuthProps, DesktopAuthProps, AuthRef, AuthTextConfig };