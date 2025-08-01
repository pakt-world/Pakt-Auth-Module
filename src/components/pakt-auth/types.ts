
type AuthRef = {
    onLogin: () => void;
    onSignup: () => void;
};

interface PaktAuthProps {
    config: any;
    onLogin?: (data?: any) => void;
    onSignup?: (data?: any) => void;
}

interface DesktopAuthProps {
    onLogin?: (data?: any) => void;
    onSignup?: (data?: any) => void;
}



export type { PaktAuthProps, DesktopAuthProps, AuthRef };