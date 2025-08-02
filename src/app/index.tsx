/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { AuthRef } from "../components/pakt-auth/types";
import PaktAuth from "../components/pakt-auth";
import "../styles/index.scss";

const App = () => {
    const paktAuthRef = useRef<AuthRef>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const config = {
        theme: {
            primary: "#007C5B",
            secondary: "#19A966",
            title: "#1F2937",
            body: "#6B7280",
        },
        errorHandler: (errorMessage: string) => {
            setError(errorMessage);
        },
    };

    const handleLogin = () => paktAuthRef.current?.onLogin?.();
    const handleSignup = () => paktAuthRef.current?.onSignup?.();

    const handleSignupSuccess = (data: any) => {
        console.log("Signup success:", data);
    };

    const handleLoginSuccess = (data: any) => {
        console.log("Login success:", data);
    };

    return (
        <>
            <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                <div className="pam-max-w-md pam-text-center pam-text-white">
                    <h1 className="pam-mb-4 pam-text-4xl pam-font-bold">
                        Welcome to Pakt
                    </h1>
                    <p className="pam-mb-8 pam-text-lg pam-text-gray-300">
                        Connect with world-class builders and collaborate on
                        amazing projects
                    </p>
                    <div className="pam-space-y-4">
                        <button
                            onClick={handleLogin}
                            className="pam-w-full pam-rounded-lg pam-bg-white pam-px-6 pam-py-3 pam-font-semibold pam-text-blue-900 pam-transition-colors hover:pam-bg-gray-100"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleSignup}
                            className="pam-w-full pam-rounded-lg pam-border-2 pam-border-white pam-bg-transparent pam-px-6 pam-py-3 pam-font-semibold pam-text-white pam-transition-colors hover:pam-bg-white hover:pam-text-blue-900"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

            <PaktAuth
                config={{
                    googleOAuth: {
                        clientId:
                            "100000000000-00000000000000000000000000000000.apps.googleusercontent.com",
                    },
                }}
                ref={paktAuthRef}
                onLoginSuccess={handleLoginSuccess}
                onSignupSuccess={handleSignupSuccess}
            />
        </>
    );
};

export default App;
