/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import LoginForm from "./login-form";
import { LoginFormProps } from "../../../types/auth";

const Login = (props: LoginFormProps): React.JSX.Element => {
    return (
        <div className="pka:z-[2] pka:flex pka:w-full pka:items-center sm:pka:mx-auto sm:pka:size-full">
            <div className="pka:flex pka:size-full pka:flex-col pka:items-center pka:justify-center pka:gap-6">
                <div className="pka:flex pka:flex-col pka:items-center pka:gap-2 pka:text-center">
                    <h3 className="pka:font-sans pka:text-2xl pka:font-bold pka:text-title sm:pka:text-3xl sm:pka:text-white">
                        Welcome Back
                    </h3>
                    <p className="pka:w-[392px] pka:text-center pka:text-base pka:font-medium pka:leading-normal pka:tracking-tight pka:text-body sm:pka:text-white">
                        Sign in to your account to continue
                    </p>
                </div>
                <LoginForm {...props} />
            </div>
        </div>
    );
};

export default Login;
