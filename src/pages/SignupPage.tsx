import type {JSX} from 'react';
import {useForm} from 'react-hook-form';
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../fields/Button.tsx";
import AuthService from "../services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {HttpStatusCode} from "axios";
import toast from "react-hot-toast";

interface SignupFormValues {
    name: string,
    email: string;
    phone: string;
    password: string;
}

function SignupPage(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<SignupFormValues>({
        defaultValues: {
            name: 'John',
            email: 'john@gmail.com',
            phone: '9690578859',
            password: 'John@123',
        }
    });
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        console.log('signup', data);
        const {success, error} = await AuthService.signup(data.name, data.email, data.phone, data.password);

        if (success) {
            navigate(`/auth/verify-email?email=${data.email}&skip=true`);
            return;
        }

        if (error?.status === HttpStatusCode.Conflict) {
            if (error.details?.email.value === data.email) {
                setError("email", {message: "Email already registered"});
            }

            if (error.details?.phone.value === data.phone) {
                setError("phone", {message: "Number already registered"});
            }
            return;
        }

        toast.error(error?.message ?? "Unknown error");
    });

    return (
        <AuthFormContainer
            title="Create your account"
            subtitle="Register once and keep your trading access, profile details, and future checkouts in one place."
            footerText="Already have an account?"
            footerLinkText="Log in"
            footerLinkTo="/auth/login"
        >
            <form className="space-y-4" onSubmit={onSubmit}>
                <InputField
                    type="text"
                    label="Name"
                    autoComplete="name"
                    register={register('name', {
                        required: 'Name is required',
                    })}
                    error={errors.name}
                />

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

                <InputField
                    type="tel"
                    label="Phone"
                    autoComplete="tel"
                    register={register('phone', {
                        required: 'Phone number is required',
                        minLength: {
                            value: 8,
                            message: 'Phone number is too short',
                        },
                    })}
                    error={errors.phone}
                />
                <InputField
                    type="password"
                    label="Password"
                    autoComplete="new-password"
                    register={register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                    error={errors.password}
                />

                <Button type="submit" isSubmitting={isSubmitting}>
                    Create account
                </Button>
            </form>
        </AuthFormContainer>
    );
}

export default SignupPage;
