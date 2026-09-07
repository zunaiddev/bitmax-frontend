import type {JSX, ReactNode} from "react";
import {Link} from "react-router-dom";
import CartIcon from "../icons/CartIcon.tsx";

interface Props {
    title: string;
    subtitle: string;
    footerText: string;
    footerLinkText: string;
    footerLinkTo: string;
    children: ReactNode;
}

function AuthFormContainer({
                               title,
                               subtitle,
                               footerText,
                               footerLinkText,
                               footerLinkTo,
                               children,
                           }: Props): JSX.Element {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_24px_120px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/12 bg-white/8 shadow-[0_10px_40px_rgba(56,189,248,0.18)]">
                    <CartIcon/>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                    BitMax
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {title}
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/68">
                    {subtitle}
                </p>
            </div>

            <div className="mt-8">
                {children}
            </div>

            <p className="mt-6 text-center text-sm text-white/60">
                {footerText}{" "}
                <Link className="font-medium text-cyan-300 transition hover:text-cyan-200" to={footerLinkTo}>
                    {footerLinkText}
                </Link>
            </p>
        </div>
    );
}

export default AuthFormContainer;
