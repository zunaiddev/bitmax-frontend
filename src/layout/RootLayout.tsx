import type {JSX} from 'react'
import {Outlet} from 'react-router-dom'
import {Toaster} from "react-hot-toast";

function RootLayout(): JSX.Element {
    return (
        <div className="min-h-screen w-full">
            <Outlet/>
            <Toaster/>
        </div>
    )
}

export default RootLayout
