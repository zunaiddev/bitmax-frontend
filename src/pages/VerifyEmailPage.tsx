import {type JSX, type RefObject, useEffect, useRef, useState} from "react";
import OtpComponent, {type OtpHandle} from "../components/OtpComponent.tsx";
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import SendingOtpLoader from "../components/SendingOtpLoader.tsx";
import {type Location, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import AuthService from "../services/AuthService.ts";
import toast from "react-hot-toast";
import {HttpStatusCode} from "axios";

function VerifyEmailPage(): JSX.Element {
    const location: Location = useLocation();
    const [params] = useSearchParams();
    const [email] = useState(params.get("email"));
    const [sendingOtp, setSendingOtp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const fieldRef: RefObject<OtpHandle | null> = useRef<OtpHandle>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const email: string | null = params.get("email");
        const skip: boolean = params.get("skip") == "true";

        if (skip) {
            return;
        }

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

    }, [location, params]);

    async function handleSubmit(value: string): Promise<void> {
        setLoading(true);

        const {success, payload, error} = params.get("login")
            ? await AuthService.loginWithOtp(email as string, value)
            : await AuthService.verifyEmailOtp(email as string, value);
        setLoading(false);

        if (success) {
            toast.success("Otp Verified");

            if (payload.accessToken) {
                localStorage.setItem("token", payload.accessToken);
                localStorage.setItem("sessionId", payload.sessionId);
                navigate("/dashboard");
                return;
            }

            navigate(`/auth/verify-phone?phone=${payload.phone.value}&skip=${params.get("skip")}`);

            return;
        }

        if (error?.status === HttpStatusCode.TooManyRequests) {
            navigate("/auth/login");
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