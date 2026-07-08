import { MainSheet } from '@/components/layout/MainSheet';
import { LoginPage } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useAppContext } from '@/context/AppContextProvider';
import { DashboardPage } from '@/pages/DashboardPage';
import { ReportManagementPage } from '@/pages/ReportManagementPage';
import { UserPage } from '@/pages/UserPage';
import { Route, Routes } from 'react-router-dom';

function App() {
    const { isUser, isLoginForm } = useAppContext();

    return (
        <div>
            <Routes>
                {/* Login and register form section routes */}

                {isUser ? (
                    <Route element={<MainSheet />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="project" element={<ReportManagementPage />} />
                    </Route>
                ) : (
                    <Route element={<UserPage />}>
                        <Route index element={isLoginForm ? <LoginPage /> : <RegisterForm />} />
                    </Route>
                )}
            </Routes>
        </div>
    );
}

export default App;
