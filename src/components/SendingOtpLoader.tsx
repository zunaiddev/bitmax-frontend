import type {JSX} from "react";

function SendingOtpLoader(): JSX.Element {
    return (
        <div className="flex justify-center py-6 h-52">
            <div className="h-36 w-40 flex items-center justify-center">
                <div className="h-12 flex items-end">
                    <div
                        className="bg-blue-300 h-full w-2 ml-0.5 origin-bottom animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
                    ></div>
                    <div
                        className="bg-blue-400 h-full w-2 ml-0.5 origin-bottom animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
                        style={{animationDelay: "0.15s"}}
                    ></div>
                    <div
                        className="bg-blue-500 h-full w-2 ml-0.5 origin-bottom animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
                        style={{animationDelay: "0.3s"}}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default SendingOtpLoader;