import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
// "printWidth": 120

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forbidden" element={<div>gorbidden component</div>} />
                    <Route path="/addquestion" element={<div>add question component</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
