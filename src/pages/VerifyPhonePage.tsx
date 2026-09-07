import {type RefObject, useEffect, useRef, useState} from "react";
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import OtpComponent, {type OtpHandle} from "../components/OtpComponent.tsx";
import {type Location, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import AuthService from "../services/AuthService.ts";
import toast from "react-hot-toast";
import SendingOtpLoader from "../components/SendingOtpLoader.tsx";

function VerifyPhonePage() {
    const location: Location = useLocation();
    const [params] = useSearchParams();
    const [phone] = useState<string | null>(params.get("phone"));
    const [sendingOtp, setSendingOtp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const fieldRef: RefObject<OtpHandle | null> = useRef<OtpHandle>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const phone = params.get("phone");
        const skip = params.get("skip") == "true";

        if (skip) return;

        if (!phone) {
            return;
        }

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

    }, [location, params]);

    async function handleSubmit(value: string): Promise<void> {
        setLoading(true);
        const {success, payload, error} = await AuthService.verifyPhoneOtp(phone as string, value);
        setLoading(false);

        if (success) {
            toast.success("Otp Verified");

            if (payload.accessToken) {
                localStorage.setItem("token", payload.accessToken);
                localStorage.setItem("sessionId", payload.sessionId);
                navigate("/dashboard");
                return;
            }

            navigate(`/auth/verify-email?email=${payload.email.value}&skip=${params.get("skip")}`);

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