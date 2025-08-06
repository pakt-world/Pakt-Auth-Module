/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { AuthRef, UserData } from "../components/pakt-auth/types";
import PaktAuth from "../components/pakt-auth";

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

    const handleSignupSuccess = (userData: UserData) => {
        console.log("Signup success:", userData);
    };

    const handleLoginSuccess = (userData: UserData) => {
        console.log("Login success:", userData);
    };

    return (
        <>
            <div className="pka:flex pka:min-h-screen pka:items-center pka:justify-center pka:bg-gradient-to-br pka:from-blue-900 pka:via-purple-900 pka:to-indigo-900 pka:p-4">
                <div className="pka:max-w-md pka:text-center pka:text-white">
                    <h1 className="pka:mb-4 pka:text-4xl pka:font-bold">
                        Welcome to Pakt
                    </h1>
                    <p className="pka:mb-8 pka:text-lg pka:text-gray-300">
                        Connect with world-class builders and collaborate on
                        amazing projects
                    </p>
                    <div className="pka:space-y-4">
                        <button
                            onClick={handleLogin}
                            className="pka:w-full pka:rounded-lg pka:bg-white pka:px-6 pka:py-3 pka:font-semibold pka:text-blue-900 pka:transition-colors hover:pka:bg-gray-100"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleSignup}
                            className="pka:w-full pka:rounded-lg pka:border-2 pka:border-white pka:bg-transparent pka:px-6 pka:py-3 pka:font-semibold pka:text-white pka:transition-colors hover:pka:bg-white hover:pka:text-blue-900"
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
                            "583287786734-s8rrgm4ll9ltjm430a25vi6107dbiiib.apps.googleusercontent.com",
                        redirectUri: "http://localhost:4234",
                    },
                    paktSDK: {
                        baseUrl: "https://api-devpaktbuild.chain.site",
                        verbose: true,
                    },
                }}
                textConfig={{
                    loginTitle: "Welcome Back",
                    loginDescription: "Sign in to continue your journey",
                    signupTitle: "Join Our Community",
                    signupDescription: "Start building amazing things together",
                }}
                ref={paktAuthRef}
                onLoginSuccess={handleLoginSuccess}
                onSignupSuccess={handleSignupSuccess}
            />
        </>
    );
};

export default App;
