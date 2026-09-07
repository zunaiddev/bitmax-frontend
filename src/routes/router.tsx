import {createBrowserRouter, Navigate} from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import AuthLayout from '../layout/AuthLayout.tsx'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import ForgotPasswordPage from "../pages/ForgotPasswordPage.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import VerifyEmailPage from "../pages/VerifyEmailPage.tsx";
import VerifyPhonePage from "../pages/VerifyPhonePage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: 'auth',
                element: <AuthLayout/>,
                children: [
                    {index: true, element: <Navigate to="login" replace/>},
                    {path: 'login', element: <LoginPage/>},
                    {path: 'signup', element: <SignupPage/>},
                    {path: 'verify-email', element: <VerifyEmailPage/>},
                    {path: 'verify-phone', element: <VerifyPhonePage/>},
                    {path: "forgot-password", element: <ForgotPasswordPage/>}
                ],
            },
            {path: "dashboard", element: <DashboardPage/>},

            {index: true, element: <Navigate to="/auth/login" replace/>},
            {path: '*', element: <Navigate to="/auth/login" replace/>},
        ],
    },
])

export default router
