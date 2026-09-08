import {type JSX, useEffect, useState} from "react";
import getToken from "../utils/getToken.ts";
import {type NavigateFunction, useNavigate} from "react-router-dom";
import UserService from "../services/UserService.ts";
import type {AccountInfo, DeviceSession} from "../utils/types.ts";
import ProfileDetailsSkeleton from "../components/ProfileDetailsSkeleton.tsx";
import UserSessionsSkeleton from "../components/UserSessionsSkeleton.tsx";
import UserCard from "../components/UserCard.tsx";
import SessionsCard from "../components/SessionsCard.tsx";

function DashboardPage(): JSX.Element | null {
    const [loading, setLoading] = useState<boolean>();
    const [user, setUser] = useState<AccountInfo>();
    const [sessions, setSessions] = useState<DeviceSession[]>([]);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {


        (async function () {
            setLoading(true);
            const token = await getToken();

            if (!token) {
                navigate("/auth/login");
                return;
            }

            const [userResult, sessionsResult] = await Promise.all([
                UserService.getUser(),
                UserService.getSessions(),
            ]);
            setLoading(false);

            if (userResult.success) {
                setUser(userResult.payload);
            } else {
                navigate("/auth/login");
            }

            if (sessionsResult.success) {
                setSessions(sessionsResult.payload);
            } else {
                navigate("/auth/login");
            }
        })();
    }, [navigate]);

    function removeSession(id: string): void {
        setSessions([...sessions.filter(value => value.id !== id)]);
    }

    return (
        <main
            className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),linear-gradient(180deg,#050816_0%,#02050d_100%)] px-4 py-10 flex items-center justify-center text-white">
            <div className="mx-auto flex w-full h-full gap-5 flex-col">
                {loading || !user ? <><ProfileDetailsSkeleton/> <UserSessionsSkeleton/></> : <>
                    <UserCard name={user?.name} email={user?.email} phone={user?.phone} createdAt={user?.createdAt}/>
                    <SessionsCard sessions={sessions} deleteSession={removeSession}/>
                </>}
            </div>
        </main>
    );
}

export default DashboardPage;