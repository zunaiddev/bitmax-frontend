import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {type InputHTMLAttributes, type JSX, useState} from "react";
import EyeOpenIcon from "../icons/EyeOpenIcon.tsx";
import EyeCloseIcon from "../icons/EyeCloseIcon.tsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegisterReturn,
    error: FieldError | undefined,
    label?: string;
    type?: "text" | "password" | "email" | "tel";
}

function InputField({register, error, label, type = "text", ...props}: Props): JSX.Element {
    const [show, setShow] = useState(false);
    const isPass: boolean = type === 'password';

    function handleShow() {
        setShow(!show);
    }

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    type={type === "password" ? (show ? "text" : "password") : type}
                    {...register}
                    placeholder={label}
                    className={`peer w-full rounded-2xl border bg-white/5 px-4 py-4 text-sm text-white outline-none transition  backdrop-blur-sm ${
                        error
                            ? "border-rose-400/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/15 placeholder:text-rose-400"
                            : "border-white/10 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-400/15"
                    } ${isPass ? "pr-12" : ""}`}
                    {...props}
                />


                {isPass &&
                    <button
                        type="button"
                        onClick={handleShow}
                        aria-label={show ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/55 transition hover:bg-white/10 hover:text-white"
                    >
                        {show ? <EyeCloseIcon/> : <EyeOpenIcon/>}
                    </button>}
            </div>
            {error && <small className="mt-2 ml-1 block text-xs text-rose-300">{error.message}</small>}
        </div>
    );
}

export default InputField;
