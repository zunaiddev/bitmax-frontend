import type {JSX} from "react";

function UserSessionsSkeleton(): JSX.Element {
    return (
        <section
            className="w-full rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8 animate-pulse"
        >
            <div className="mb-6">
                <div className="h-3 w-16 rounded-full bg-white/10"></div>
                <div className="mt-3 h-7 w-40 rounded-lg bg-white/10"></div>
                <div className="mt-3 h-4 w-72 max-w-full rounded-md bg-white/10"></div>
                <div className="mt-1.5 h-4 w-48 max-w-full rounded-md bg-white/10"></div>
            </div>
            <div className="space-y-4">
                <SessionRowSkeleton/>
                <SessionRowSkeleton/>
                <SessionRowSkeleton/>
            </div>
        </section>
    );
}

function SessionRowSkeleton(): JSX.Element {
    return (
        <div
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/15 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
                <div className="h-4 w-36 rounded-md bg-white/10"></div>
                <div className="mt-2 h-3.5 w-48 rounded-md bg-white/10"></div>
            </div>
            <div className="h-10 w-24 rounded-2xl bg-white/10 sm:self-auto"></div>
        </div>
    );
}

export default UserSessionsSkeleton;