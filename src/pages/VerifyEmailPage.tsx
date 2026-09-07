import {type JSX, type RefObject, useEffect, useRef, useState} from "react";
import OtpComponent, {type OtpHandle} from "../components/OtpComponent.tsx";
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import SendingOtpLoader from "../components/SendingOtpLoader.tsx";
import {type Location, useLocation, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService.ts";
import toast from "react-hot-toast";

function VerifyEmailPage(): JSX.Element {
    const location: Location = useLocation();
    const [email] = useState<string>(location.search.substring(1));
    const [sendingOtp, setSendingOtp] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const fieldRef: RefObject<OtpHandle | null> = useRef<OtpHandle>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!email) return;

        (async function () {
            setSendingOtp(true);
            const {success, error} = await AuthService.sendEmailOrPhoneOtp(email, undefined);
            setSendingOtp(false);

            if (success) {
                toast.success("Otp sent successfully.");
                return;
            }

            toast.error(error?.message ?? "Unknown error");
        })();

    }, [location, email]);

    async function handleSubmit(value: string): Promise<void> {
        setLoading(true);
        const {success, payload, error} = await AuthService.verifyOtp("email", email, undefined, value);
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
        subtitle={`Enter the 4-digit code sent to ${email}`}
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

export default VerifyEmailPage;