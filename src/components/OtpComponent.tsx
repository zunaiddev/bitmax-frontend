import type {ChangeEvent, ClipboardEvent, JSX, KeyboardEvent} from "react";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import Button from "../fields/Button.tsx";

interface Props {
    loading: boolean;
    length?: number;
    disabled?: boolean;
    autoFocus?: boolean;
    label?: string;
    helperText?: string;
    className?: string;
    onComplete?: (value: string) => void;
}

export interface OtpHandle {
    clear: () => void;
    setError: (message: string) => void;
}

const OtpComponent = forwardRef<OtpHandle, Props>(function OtpComponent(
    {
        loading,
        length = 4,
        disabled = false,
        autoFocus = false,
        label = "Enter OTP",
        helperText,
        className,
        onComplete,
    },
    ref,
): JSX.Element {
    const [otpValue, setOtpValue] = useState<string>("");
    const [error, setErrorState] = useState<string | undefined>(undefined);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useImperativeHandle(ref, () => ({
        clear: clearOtp,
        setError: (message: string) => setErrorState(message),
    }));

    function clearOtp() {
        setOtpValue("");
        setErrorState(undefined);
        focusIndex(0);
    }

    function handleSubmit() {
        for (let index = 0; index < length; index += 1) {
            if (!otpValue[index]) {
                setErrorState("Please enter all digits");
                focusIndex(index);
                return;
            }
        }

        setErrorState(undefined);
        onComplete?.(otpValue);
    }

    function commit(nextValue: string) {
        const normalized = sanitizeOtp(nextValue, length);
        setOtpValue(normalized);

        if (error) {
            setErrorState(undefined);
        }
    }

    function focusIndex(index: number) {
        const target = Math.max(0, Math.min(length - 1, index));
        inputRefs.current[target]?.focus();
        inputRefs.current[target]?.select();
    }

    function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        const raw = event.target.value;
        const digits = raw.replace(/\D/g, "");

        if (!digits) {
            const next = otpValue.slice(0, index) + otpValue.slice(index + 1);
            commit(next);
            return;
        }

        const next = otpValue.split("");
        let cursor = index;

        for (const digit of digits) {
            if (cursor >= length) {
                break;
            }

            next[cursor] = digit;
            cursor += 1;
        }

        commit(next.join(""));

        if (cursor < length) {
            focusIndex(cursor);
        } else {
            inputRefs.current[length - 1]?.blur();
        }
    }

    function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Backspace") {
            event.preventDefault();

            if (otpValue[index]) {
                const next = otpValue.split("");
                next[index] = "";
                commit(next.join(""));
                focusIndex(index);
                return;
            }

            if (index > 0) {
                const next = otpValue.split("");
                next[index - 1] = "";
                commit(next.join(""));
                focusIndex(index - 1);
            }
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            focusIndex(index - 1);
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            focusIndex(index + 1);
        }
    }

    function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
        event.preventDefault();
        const pasted = event.clipboardData.getData("text").replace(/\D/g, "");

        if (!pasted) {
            return;
        }

        const next = otpValue.split("");
        let cursor = index;

        for (const digit of pasted.slice(0, length)) {
            if (cursor >= length) {
                break;
            }

            next[cursor] = digit;
            cursor += 1;
        }

        commit(next.join(""));
        inputRefs.current[Math.min(cursor, length - 1)]?.focus();
    }

    return (
        <div className={`w-full ${className ?? ""}`}>
            <label className="mb-3 block text-sm font-medium text-white/80">
                {label}
            </label>

            <div className={`flex gap-3 ${disabled ? "opacity-40" : "opacity-60"}`} aria-label={label}>
                {Array.from({length}, (_, index) => (
                    <input
                        key={index}
                        ref={(node) => {
                            inputRefs.current[index] = node;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        aria-label={`${label} digit ${index + 1}`}
                        maxLength={1}
                        value={otpValue[index] ?? ""}
                        disabled={disabled}
                        autoFocus={autoFocus && index === 0}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        onPaste={(event) => handlePaste(index, event)}
                        onFocus={(event) => event.currentTarget.select()}
                        className={`h-14 w-full min-w-0 rounded-2xl border bg-white/5 text-center text-lg font-semibold tracking-[0.35em] text-white outline-none transition backdrop-blur-sm sm:h-16 sm:text-xl ${
                            error
                                ? "border-rose-400/70 focus:ring-4 focus:ring-rose-400/15"
                                : "border-white/10 focus:ring-4 focus:ring-cyan-400/15"
                        }`}
                    />
                ))}
            </div>

            <div className="mt-3 flex items-start justify-between gap-3">
                <p className={`text-xs leading-5 ${error ? "text-rose-300" : "text-white/55"}`}>
                    {error ?? helperText}
                </p>
            </div>

            <Button type="button" onClick={handleSubmit} isSubmitting={loading} disabled={loading}>
                Verify Otp
            </Button>
        </div>
    );
});

function sanitizeOtp(input: string, length: number): string {
    return input.replace(/\D/g, "").slice(0, length);
}

export default OtpComponent;