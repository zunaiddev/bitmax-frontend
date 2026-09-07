import {type RefObject, useEffect, useRef, useState} from "react";
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import OtpComponent, {type OtpHandle} from "../components/OtpComponent.tsx";
import {type Location, useLocation, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService.ts";
import toast from "react-hot-toast";
import SendingOtpLoader from "../components/SendingOtpLoader.tsx";

function VerifyPhonePage() {
    const location: Location = useLocation();
    const [phone] = useState<string>(location.search.substring(1));
    const [sendingOtp, setSendingOtp] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const fieldRef: RefObject<OtpHandle | null> = useRef<OtpHandle>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!phone) return;

        (async function () {
            setSendingOtp(true);
            const {success, error} = await AuthService.sendEmailOrPhoneOtp(undefined, phone);
            setSendingOtp(false);

            if (success) {
                toast.success("Otp sent successfully.");
                return;
            }

            toast.error(error?.message ?? "Unknown error");
        })();

    }, [location, phone]);

    async function handleSubmit(value: string): Promise<void> {
        setLoading(true);
        const {success, payload, error} = await AuthService.verifyOtp("phone", undefined, phone, value);
        setLoading(false);

        if (success) {
            toast.success("Otp Verified");

            if (payload.accessToken) {
                localStorage.setItem("token", payload.accessToken);
                navigate("/dashboard");
                return;
            }

            navigate("/auth/verify-phone");

            return;
        }

        toast.error(error?.message ?? "Unknown error");
    }

    return (<AuthFormContainer
        title="Verify Email OTP"
        subtitle={`Enter the 4-digit code sent to ${phone}`}
        footerText="Alredy Verified"
        footerLinkText="login"
        footerLinkTo="/auth/login"
    >
        {sendingOtp ? <SendingOtpLoader/> : <OtpComponent
            ref={fieldRef}
            loading={loading}
            onComplete={handleSubmit}
        />}
    </AuthFormContainer>);
}

export default VerifyPhonePage;