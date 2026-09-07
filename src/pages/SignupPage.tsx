import type {JSX} from 'react';
import {useForm} from 'react-hook-form';
import AuthFormContainer from "../components/AuthFormContainer.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../fields/Button.tsx";

interface SignupFormValues {
    email: string;
    phone: string;
    password: string;
}

function SignupPage(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SignupFormValues>({
        defaultValues: {
            email: '',
            phone: '',
            password: '',
        },
        mode: 'onTouched',
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log('signup', data);
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
