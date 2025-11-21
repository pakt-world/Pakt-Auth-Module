import { IUser } from "pakt-sdk";
import { ConfigContextType } from "types";

export interface UserData extends Partial<IUser> {
    token?: string;
    token_type?: string;
    expiresIn?: number;
    isVerified?: boolean;
    onboarded?: boolean;
    tempToken?: {
        token: string;
        expiresIn: number;
    };
    code?: string;
    timeZone?: string;
}

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
