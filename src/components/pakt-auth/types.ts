import { AccountVerifyDto, LoginDto, GoogleOAuthValidateDto } from "pakt-sdk";
import { ConfigContextType } from "types";

// Union type for all possible user data types
export type UserData = GoogleOAuthValidateDto | AccountVerifyDto | LoginDto;

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
    onLoginSuccess?: (userData: UserData) => void;
    onSignupSuccess?: (userData: UserData) => void;
}

interface DesktopAuthProps {
    textConfig?: AuthTextConfig;
    onLoginSuccess?: (userData: UserData) => void;
    onSignupSuccess?: (userData: UserData) => void;
}

export type { PaktAuthProps, DesktopAuthProps, AuthRef, AuthTextConfig };