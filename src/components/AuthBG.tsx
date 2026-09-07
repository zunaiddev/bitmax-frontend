import type {JSX} from "react";
import authBg from "../assets/authBg.png";

interface Props {
    children: JSX.Element;
}

function AuthBG({children}: Props): JSX.Element {
    return (<div className="relative w-full h-screen bg-[#2148C0]">
        <img className="h-full w-full absolute inset-0 pointer-events-none" alt="bg image" src={authBg}/>
        {children}
    </div>);
}

export default AuthBG;