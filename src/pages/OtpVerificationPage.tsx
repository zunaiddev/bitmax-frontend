import type {FormEvent, JSX} from "react";
import {useState} from "react";
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import OtpComponent from "../components/OtpComponent.tsx";
import Button from "../fields/Button.tsx";

function OtpVerificationPage(): JSX.Element {
    const [otp, setOtp] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("otp", otp);
    }

    return (
        <AuthFormContainer
            title="Verify OTP"
            subtitle="Enter the 4-digit code sent to your email"
            footerText="Didn't get a code?"
            footerLinkText="Try again"
            footerLinkTo="/auth/forgot-password"
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <OtpComponent
                    value={otp}
                    onChange={setOtp}
                    autoFocus
                    helperText=""
                    onComplete={(value) => setOtp(value)}
                />

                <Button type="submit">
                    Verify OTP
                </Button>
            </form>
        </AuthFormContainer>
    );
}

export default OtpVerificationPage;
