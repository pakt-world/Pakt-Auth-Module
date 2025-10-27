/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import toastPrimitive from "react-hot-toast";
import { CheckCircle, CircleAlert } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

// import { TalentProfile } from "./talent-profile-image";

export const toast = {
    error: (message: string) =>
        toastPrimitive.custom(
            (t: { visible: boolean }) => {
                return (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"} pka:pointer-events-auto pka:flex pka:w-full pka:max-w-md pka:rounded-lg pka:bg-red-100 pka:ring-1 pka:ring-red-800 pka:ring-opacity-50`}
                    >
                        <div className="pka:w-0 pka:flex-1 pka:p-4">
                            <div className="pka:flex pka:items-center">
                                <div className="pka:flex-shrink-0">
                                    <CircleAlert className="pka:h-6 pka:w-6 pka:text-red-600" />
                                </div>
                                <div className="pka:ml-3 pka:flex-1 pka:md:flex pka:md:justify-between">
                                    <p className="pka:text-sm pka:leading-5 pka:text-red-700">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
            {
                duration: 5000,
            }
        ),
    success: (message: string) =>
        toastPrimitive.custom(
            (t: { visible: boolean }) => (
                <div
                    className={`${t.visible ? "animate-enter" : "animate-leave"} pka:pointer-events-auto pka:flex pka:w-full pka:max-w-md pka:rounded-lg pka:bg-green-100 pka:ring-1 pka:ring-green-800 pka:ring-opacity-50`}
                >
                    <div className="pka:w-0 pka:flex-1 pka:p-4">
                        <div className="pka:flex pka:items-center">
                            <div className="pka:flex-shrink-0">
                                <CheckCircle className="pka:h-6 pka:w-6 pka:text-green-600" />
                            </div>
                            <div className="pka:ml-3 pka:flex-1 pka:md:flex pka:md:justify-between">
                                <p className="pka:text-sm pka:leading-5 pka:text-green-700">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                duration: 5000,
            }
        ),
    // message: (title: string, message: string, userId: string, image?: string, score?: number, messageId?: string) => {
    // 	toastPrimitive.custom((t) => {
    // 		const router = useRouter();
    // 		return messageId ? (
    // 			<div
    // 				className={`${t.visible ? "animate-enter" : "animate-leave"} pointer-events-auto flex w-full max-w-md cursor-pointer rounded-lg
    // 					bg-green-100 ring-1 ring-green-800 ring-opacity-50`}
    // 				onClick={() => {
    // 					router.push(`/messages/${messageId}`);
    // 				}}
    // 				role="button"
    // 				tabIndex={0}
    // 				onKeyDown={(e) => {
    // 					e.preventDefault();
    // 				}}
    // 			>
    // 				<div className="flex-1 p-1">
    // 					<div className="flex flex-row items-center">
    // 						{/* <TalentProfile src={image} size="sm" score={score ?? 0} url={`/talents/${userId}`} /> */}
    // 						<div className="ml-3 flex flex-col">
    // 							<h2 className="text-sm font-bold leading-5 text-green-700">{title}</h2>
    // 							<p className="text-sm leading-5 text-green-700">{message}</p>
    // 						</div>
    // 					</div>
    // 				</div>
    // 			</div>
    // 		) : (
    // 			<div
    // 				className={`${t.visible ? "animate-enter" : "animate-leave"} pointer-events-auto flex w-full max-w-md rounded-lg bg-green-100 ring-1
    // 					ring-green-800 ring-opacity-50`}
    // 			>
    // 				<div className="flex-1 p-1">
    // 					<div className="flex flex-row items-center">
    // 						{/* <TalentProfile src={image} size="sm" score={score ?? 0} url={`/talents/${userId}`} /> */}
    // 						<div className="ml-3 flex flex-col">
    // 							<h2 className="text-sm font-bold leading-5 text-green-700">{title}</h2>
    // 							<p className="text-sm leading-5 text-green-700">{message}</p>
    // 						</div>
    // 					</div>
    // 				</div>
    // 			</div>
    // 		);
    // 	});
    // },
    info: (message: string) =>
        toastPrimitive.custom(
            (t: { visible: boolean }) => (
                <div
                    className={`${t.visible ? "animate-enter" : "animate-leave"} pka:pointer-events-auto pka:flex pka:w-full pka:max-w-md pka:rounded-lg pka:bg-blue-100 pka:ring-1 pka:ring-blue-800 pka:ring-opacity-50`}
                >
                    <div className="pka:w-0 pka:flex-1 pka:p-4">
                        <div className="pka:flex pka:items-center">
                            <div className="pka:flex-shrink-0">
                                <CircleAlert className="pka:h-6 pka:w-6 pka:text-blue-600" />
                            </div>
                            <div className="pka:ml-3 pka:flex pka:md:flex pka:md:justify-between">
                                <p className="pka:text-sm pka:leading-5 pka:text-blue-700">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                duration: 5000,
            }
        ),
};
