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
    <div className="pam-z-[2] pam-flex pam-w-full pam-items-center sm:pam-mx-auto sm:pam-size-full">
      <div className="pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
        <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
          <h3 className="pam-font-sans pam-text-2xl pam-font-bold pam-text-title sm:pam-text-3xl sm:pam-text-white">
            Welcome Back
          </h3>
          <p className="pam-w-[392px] pam-text-center pam-text-base pam-font-medium pam-leading-normal pam-tracking-tight pam-text-body sm:pam-text-white">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm {...props} />
      </div>
    </div>
  );
};

export default Login; 