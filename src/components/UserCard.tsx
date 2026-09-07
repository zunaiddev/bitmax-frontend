import {type JSX, useState} from "react";
import UserService from "../services/UserService.ts";
import {useNavigate} from "react-router-dom";
import normalizeDate from "../utils/normlizeDate.ts";

interface Props {
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

function UserCard({name, email, phone, createdAt}: Props): JSX.Element {
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();

    async function handleLogout() {
        const sessionId: string | null = localStorage.getItem("sessionId");
        console.log(sessionId);

        if (!sessionId) {
            localStorage.clear();
            navigate("/auth/login");
        }

        setLoggingOut(true);
        await UserService.logout(sessionId as string);
        setLoggingOut(false);

        navigate("/auth/login");
    }

    return (<section
        className="w-full rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                    Account
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    Profile details
                </h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                    Only the email, phone number, and account creation time are shown here.
                </p>
            </div>

            <button
                type="button"
                disabled={loggingOut}
                onClick={handleLogout}
                className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm font-medium text-rose-200 transition hover:border-rose-300/40 hover:bg-rose-400/15 hover:text-rose-100"
            >
                {loggingOut ? "Logging Out..." : "Logout"}
            </button>
        </div>

        <div className="space-y-4">
            <InfoRow label="Name" value={name}/>
            <InfoRow label="Email" value={email}/>
            <InfoRow label="Phone number" value={phone}/>
            <InfoRow label="Account created" value={normalizeDate(createdAt)}/>
        </div>
    </section>);
}

interface InfoRowProps {
    label: string;
    value: string;
}

function InfoRow({label, value}: InfoRowProps): JSX.Element {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4 sm:px-5">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                {label}
            </p>
            <p className="mt-2 wrap-break-word text-base font-medium text-white sm:text-lg">
                {value}
            </p>
        </div>
    );
}

export default UserCard;