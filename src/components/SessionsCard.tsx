import type {JSX} from "react";
import type {DeviceSession} from "../utils/types.ts";


interface Props {
    sessions: DeviceSession[];
}

function SessionsCard({sessions}: Props): JSX.Element {
    console.log(sessions);

    function handleRevoke(sessionId: string) {
        console.log("revoke", sessionId);
    }

    return (<section
        className="w-full rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
        <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                Security
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Login history
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                Review sessions on other devices and revoke anything you do not recognize.
            </p>
        </div>

        <div className="space-y-4">
            {sessions.map((session) => (
                <div
                    key={session.id}
                    className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/15 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                >
                    <div>
                        <p className="text-base font-medium text-white">{session.name}</p>
                        <p className="mt-1 text-sm text-white/55">
                            {session.ip} • {session.type} • {session.date}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleRevoke(session.id)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-100"
                    >
                        Revoke
                    </button>
                </div>
            ))}
        </div>
    </section>);
}

export default SessionsCard;