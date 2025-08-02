
type AuthRef = {
    onLogin: () => void;
    onSignup: () => void;
};

interface PaktAuthProps {
    config: any;
    onLoginSuccess?: (userData: any) => void;
    onSignupSuccess?: (userData: any) => void;
}

interface DesktopAuthProps {
    onLoginSuccess?: (userData: any) => void;
    onSignupSuccess?: (userData: any) => void;
}



export type { PaktAuthProps, DesktopAuthProps, AuthRef };