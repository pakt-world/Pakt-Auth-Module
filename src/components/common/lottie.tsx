import React, { memo } from "react";
import LottieReact from "lottie-react";

const Lottie = ({
    animationData,
    loop = false,
}: {
    animationData: unknown;
    loop?: boolean;
}) => <LottieReact animationData={animationData} loop={loop} />;

export default memo(Lottie);
