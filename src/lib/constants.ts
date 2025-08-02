/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { ReactElement } from "react";
import React from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

interface AuthMethod {
  icon: ReactElement;
  method: string;
}

const GoogleIcon = () => React.createElement(
  "svg",
  { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M23.52 12.2729C23.52 11.422 23.4436 10.6038 23.3018 9.81836H12V14.4602H18.4582C18.18 15.9602 17.3345 17.2311 16.0636 18.082V21.0929H19.9418C22.2109 19.0038 23.52 15.9274 23.52 12.2729Z",
    fill: "#4285F4"
  }),
  React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 23.9998C15.24 23.9998 17.9564 22.9252 19.9418 21.0925L16.0636 18.0816C14.9891 18.8016 13.6145 19.2271 12 19.2271C8.87455 19.2271 6.22909 17.1161 5.28546 14.2798H1.27637V17.3889C3.25091 21.3107 7.30909 23.9998 12 23.9998Z",
    fill: "#34A853"
  }),
  React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.28545 14.2799C5.04545 13.5599 4.90909 12.7908 4.90909 11.9999C4.90909 11.209 5.04545 10.4399 5.28545 9.71993V6.61084H1.27636C0.463636 8.23084 0 10.0636 0 11.9999C0 13.9363 0.463636 15.769 1.27636 17.389L5.28545 14.2799Z",
    fill: "#FBBC05"
  }),
  React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 4.77273C13.7618 4.77273 15.3436 5.37818 16.5873 6.56727L20.0291 3.12545C17.9509 1.18909 15.2345 0 12 0C7.30909 0 3.25091 2.68909 1.27637 6.61091L5.28546 9.72C6.22909 6.88364 8.87455 4.77273 12 4.77273Z",
    fill: "#EA4335"
  })
);

const EmailIcon = () => React.createElement(
  "svg",
  { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 5C3.45228 5 3 5.45228 3 6V18C3 18.5477 3.45228 19 4 19H20C20.5477 19 21 18.5477 21 18V6C21 5.45228 20.5477 5 20 5H4ZM1 6C1 4.34772 2.34772 3 4 3H20C21.6523 3 23 4.34772 23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6Z",
    fill: "black"
  }),
  React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.18085 5.42662C1.49757 4.97417 2.1211 4.86414 2.57355 5.18085L12.0001 11.7794L21.4266 5.18085C21.8791 4.86414 22.5026 4.97417 22.8193 5.42662C23.136 5.87907 23.026 6.5026 22.5735 6.81932L12.5735 13.8193C12.2292 14.0603 11.7709 14.0603 11.4266 13.8193L1.42662 6.81932C0.974174 6.5026 0.864139 5.87907 1.18085 5.42662Z",
    fill: "black"
  })
);

export const AUTH_METHOD: AuthMethod[] = [
	{
		icon: React.createElement(GoogleIcon),
		method: "Google",
	},
	{
		icon: React.createElement(EmailIcon),
		method: "Email",
	},
];

export const RESEND_INTERVAL = 60000; // 1 minute
export const COUNTDOWN_START = 60; // 60 seconds
export const ONE_SECOND = 1000; // 1 second 