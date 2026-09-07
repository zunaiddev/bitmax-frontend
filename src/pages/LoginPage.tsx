import {type JSX, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, type NavigateFunction, useNavigate} from 'react-router-dom';
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../fields/Button.tsx";
import AuthService from "../services/AuthService.ts";
import type ApiResponse from "../api/ApiResponse.ts";
import toast from "react-hot-toast";

interface LoginFormValues {
    email: string;
    password: string;
}

function LoginPage(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
        resetField,
        unregister
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "john2@gmail.com",
            password: "John@123"
        }
    });
    const [withPassword, setWithPassword] = useState<boolean>(true);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!withPassword) {
            unregister("password");
        }
    }, [unregister, withPassword]);

    function toggleWithPassword(): void {
        setWithPassword(!withPassword);
    }

    async function onSubmit(data: LoginFormValues): Promise<void> {
        if (!withPassword) {
            const {success, error}: ApiResponse = await AuthService.requestLoginOtp(data.email);

            if (success) {
                toast.success("Otp Sent Successfully!");
                navigate(`/auth/verify-email?email=${data.email}&skip=${true}&login=${true}`);
                return;
            }

            if (error?.code === "NO_USER_FOUND") {
                setError("email", {message: "Email is not registered."});
                return;
            }

            toast.error(error?.message || "Unknown error");
            return;
        }

        const {success, payload, error}: ApiResponse = await AuthService.login(data.email, data.password);

        console.log(error);

        if (success) {
            localStorage.setItem("token", payload.accessToken);
            localStorage.setItem("sessionId", payload.sessionId);
            toast.success("Login successful");
            navigate("/dashboard");
            return;
        }

        if (!error) {
            toast.error("Unknown error occurred.");
            return;
        }

        const code = error.code;

        if (code === "NOT_VERIFIED") {
            const details = error.details;

            if (!details?.email?.verified) {
                navigate(`/auth/verify-email?email=${details?.email?.value}`, {replace: true});
            } else {
                navigate(`/auth/verify-phone?phone=${details?.phone?.value}`, {replace: true});
            }

            return;
        }

        if (code === "NO_USER_FOUND") {
            setError("email", {message: "Email is not registered."});
            return;
        }

        if (code === "INVALID_PASSWORD") {
            setError("password", {message: "Invalid Password"});
            resetField("password");
            return;
        }

        if (code === "USER_LOCKED") {
            toast.error("You have reached max number of attempts try again after some time");
            resetField("email");
            resetField("password");
            return;
        }

        toast.error(error?.message);
    }

    return (
        <AuthFormContainer
            title="Welcome back"
            subtitle="Sign in to continue where you left off and keep your account activity in sync."
            footerText="New here?"
            footerLinkText="Create an account"
            footerLinkTo="/auth/signup"
        >
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                {withPassword && <InputField
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    register={register('password', {
                        required: 'Password is required',
                    })}
                    error={errors.password}
                />}

                <div className="flex flex-col items-end gap-2 justify-end text-sm text-white/60">
                    {withPassword &&
                        <Link to="/auth/forgot-password" className="text-cyan-300 transition hover:text-cyan-200">
                            Forgot password?
                        </Link>}

                    <button className="text-cyan-300 transition hover:text-cyan-200 cursor-pointer" type="button"
                            onClick={toggleWithPassword}>
                        Login with {withPassword ? "otp" : "password"}
                    </button>
                </div>

                <Button type="submit" isSubmitting={isSubmitting}>
                    Sign in
                </Button>
            </form>

        </AuthFormContainer>
    );
}

export default LoginPage;
