import type {JSX} from "react";

function ProfileDetailsSkeleton(): JSX.Element {
    return (
        <section
            className="w-full rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8 animate-pulse"
        >
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="h-3 w-16 rounded-full bg-white/10"></div>
                    <div className="mt-3 h-8 w-48 rounded-lg bg-white/10"></div>
                    <div className="mt-3 h-4 w-72 max-w-full rounded-md bg-white/10"></div>
                    <div className="mt-1.5 h-4 w-56 max-w-full rounded-md bg-white/10"></div>
                </div>
                <div className="h-11 w-24 rounded-2xl bg-white/10"></div>
            </div>
            <div className="space-y-4">
                <InfoRowSkeleton/>
                <InfoRowSkeleton/>
                <InfoRowSkeleton/>
            </div>
        </section>
    );
}

function InfoRowSkeleton(): JSX.Element {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <div className="h-3.5 w-24 rounded-md bg-white/10"></div>
            <div className="h-3.5 w-32 rounded-md bg-white/10"></div>
        </div>
    );
}

export default ProfileDetailsSkeleton;