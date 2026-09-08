import {type JSX, useState} from 'react';
import {useForm} from 'react-hook-form';
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../fields/Button.tsx";
import AuthService from "../services/AuthService.ts";
import toast from "react-hot-toast";

interface ForgotPasswordFormValues {
    email: string;
}

function ForgotPasswordPage(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: '',
        },
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = handleSubmit(async (data: ForgotPasswordFormValues) => {
        const response = await AuthService.forgotPassword(data.email);
        setShowSuccess(response.success);

        if (response.error) {
            if (response.error.code === "NO_USER_FOUND") {
                setError("email", {message: "email not found"});
                return;
            }

            toast.error(response.error.message);
        }
    });

    return (
        <AuthFormContainer
            title="Forgot password"
            subtitle="Enter your email address and we will send you an OTP to reset your password."
            footerText="Remember your password?"
            footerLinkText="Back to login"
            footerLinkTo="/auth/login">

            {showSuccess ? <div>
                <p>An Email to reset has been sent to your email</p>
            </div> : <form className="space-y-4" onSubmit={onSubmit}>
                <InputField
                    type="email"
                    label="Email"
                    autoComplete="email"
                    register={register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Enter a valid email address',
                        },
                    })}
                    error={errors.email}
                />

                <Button type="submit" isSubmitting={isSubmitting}>
                    Send OTP
                </Button>
            </form>
            }
        </AuthFormContainer>
    );
}

export default ForgotPasswordPage;
