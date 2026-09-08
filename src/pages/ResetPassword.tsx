import {type JSX} from "react";
import {type NavigateFunction, useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../fields/Button.tsx";
import AuthService from "../services/AuthService.ts";
import type ApiResponse from "../api/ApiResponse.ts";
import toast from "react-hot-toast";
import {HttpStatusCode} from "axios";

interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

function ResetPassword(): JSX.Element {
    const [params] = useSearchParams();
    const token = params.get("token");
    const navigate: NavigateFunction = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<ResetPasswordFormValues>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const passwordValue = watch("password");

    const onSubmit = handleSubmit(async (data: ResetPasswordFormValues) => {
        console.log("Token:", token);
        console.log("Password:", data.password);

        const response: ApiResponse = await AuthService.resetPassword(String(token), data.password);

        if (response.success) {
            toast.success("Password reset successfully.");
            navigate("/auth/login");
            return;
        }

        if (response.error.status === HttpStatusCode.Conflict) {
            setError("password", {message: "Password must be diffrent from current one"});
            return;
        }

        if (response.error.code === "JWT_EXPIRED") {
            toast.error("This link has been expired.");
            return;
        }

        toast.error(response.error.message);
    });

    if (!token) {
        return (
            <AuthFormContainer
                title="Invalid Token"
                subtitle="The password reset link is invalid or missing."
                footerText="Need to request a new link?"
                footerLinkText="Forgot password"
                footerLinkTo="/auth/forgot-password"
            >
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-center text-rose-300">
                    <p className="text-sm font-medium">Invalid token</p>
                </div>
            </AuthFormContainer>
        );
    }

    return (
        <AuthFormContainer
            title="Reset Password"
            subtitle="Enter your new password below to reset your account credentials."
            footerText="Remember your password?"
            footerLinkText="Back to login"
            footerLinkTo="/auth/login"
        >
            <form className="space-y-4" onSubmit={onSubmit}>
                <InputField
                    type="password"
                    label="New Password"
                    autoComplete="new-password"
                    register={register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    error={errors.password}
                />

                <InputField
                    type="password"
                    label="Confirm Password"
                    autoComplete="new-password"
                    register={register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === passwordValue || "Passwords do not match",
                    })}
                    error={errors.confirmPassword}
                />

                <Button type="submit" isSubmitting={isSubmitting}>
                    Reset Password
                </Button>
            </form>
        </AuthFormContainer>
    );
}

export default ResetPassword;