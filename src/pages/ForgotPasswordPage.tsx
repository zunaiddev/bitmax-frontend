import type {JSX} from 'react';
import {useForm} from 'react-hook-form';
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../fields/Button.tsx";

interface ForgotPasswordFormValues {
    email: string;
}

function ForgotPasswordPage(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: '',
        },
        mode: 'onTouched',
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log('forgot-password', data.email);
    });

    return (
        <AuthFormContainer
            title="Forgot password"
            subtitle="Enter your email address and we will send you an OTP to reset your password."
            footerText="Remember your password?"
            footerLinkText="Back to login"
            footerLinkTo="/auth/login"
        >
            <form className="space-y-4" onSubmit={onSubmit}>
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
        </AuthFormContainer>
    );
}

export default ForgotPasswordPage;
