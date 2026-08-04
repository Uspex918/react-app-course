import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage/QuestionPage";
import AQPLazy from "./pages/AddQuestionPage/AddQuestionPage.lazy";
import { EditQuestionPageLazy } from "./pages/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { ThemeProvider } from "./theme/ThemeProvider";
// "printWidth": 120

const ProtectedRouts = () => {
    const { isAuth } = useAuth();
    const location = useLocation();

    console.log("location", location);

    return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/forbidden" element={<ForbiddenPage />} />
                            <Route path="/question/:id" element={<QuestionPage />} />

                            <Route element={<ProtectedRouts />}>
                                <Route path="/addquestion" element={<AQPLazy />} />
                                <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
                            </Route>

                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
