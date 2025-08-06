import { AccountVerifyDto, LoginDto, GoogleOAuthValidateDto } from "pakt-sdk";
import { ConfigContextType } from "types";

export interface ExtendedLoginDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
    emailVerified: boolean;
    role: string;
    type: string;
    profile: {
        contact: {
            state: string;
            city: string;
            country: string;
        };
        bio: {
            title: string;
            description: string;
        };
        talent: {
            tags: string[];
            tagsIds: Array<{
                _id: string;
                name: string;
                key: string;
                color: string;
                categories: any[];
                isParent: boolean;
                type: string;
                entryCount: number;
                createdAt: string;
                updatedAt: string;
                __v: number;
            }>;
        };
    };
    isPrivate: boolean;
    walletGenerated: boolean;
    score: number;
    profileCompleteness: number;
    socket: {
        status: string;
    };
    loggedInAt: string;
    referralCode: string;
    userName: string;
    profileImage: {
        _id: string;
        name: string;
        type: string;
        size: string;
        url: string;
    };
    meta: {
        profileLinks: {
            website: string;
            x: string;
            tiktok: string;
            instagram: string;
            github: string;
        };
        acceptedTerms: boolean;
        kycStatus_dev: string;
    };
    token: string;
    token_type: string;
    expiresIn: number;
    isVerified: boolean;
}

export interface ExtendedGoogleOAuthValidateDto {
    token: string;
    token_type: string;
    expiresIn: number;
    isVerified: boolean;
    type: string;
}

export type UserData = ExtendedLoginDto | ExtendedGoogleOAuthValidateDto | AccountVerifyDto | LoginDto | GoogleOAuthValidateDto;

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