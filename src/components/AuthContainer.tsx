import type {JSX} from "react";
import CartIcon from "../icons/CartIcon.tsx";

interface Props {
    title: string;
    children: JSX.Element;
}

function AuthContainer({title, children}: Props): JSX.Element {
    return (<div className="flex flex-col justify-center items-center gap-5">
        <CartIcon/>
        <h1>{title}</h1>
        {children}
    </div>);
}

export default AuthContainer;