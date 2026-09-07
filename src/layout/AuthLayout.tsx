import type {JSX} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

function AuthLayout(): JSX.Element {
    const {pathname} = useLocation();
    const isSignup = pathname.includes('/signup');

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(135deg,_#050b14_0%,_#08111d_48%,_#0c1627_100%)]"/>
            <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"/>
            <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"/>
            <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                <section className="hidden flex-col justify-between px-10 py-10 lg:flex xl:px-16">
                    <div className="max-w-md">
                        <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-emerald-400"/>
                            Secure onboarding
                        </div>
                        <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white xl:text-6xl">
                            Trade smarter with a faster, calmer sign in.
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                            Keep the entire onboarding flow focused on one action. Clean validation,
                            smooth interaction, and a layout that feels premium without getting in the way.
                        </p>
                    </div>
                    <div className="grid max-w-lg grid-cols-3 gap-4">
                        {[
                            ['Fast', 'Instant feedback while you type'],
                            ['Clear', 'Floating labels and focused states'],
                            ['Safe', 'A controlled space for auth'],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
                                <div className="text-sm font-medium text-white">{title}</div>
                                <div className="mt-2 text-sm leading-6 text-white/65">{text}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
                    <div className="absolute inset-x-8 top-8 mx-auto h-px max-w-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
                    <div className="w-full max-w-md">
                        <div className="mb-5 flex items-center justify-between text-sm text-white/55 lg:hidden">
                            <span>BitMax Auth</span>
                            <span>{isSignup ? 'Create account' : 'Welcome back'}</span>
                        </div>
                        <Outlet/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AuthLayout
