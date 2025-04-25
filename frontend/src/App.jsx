import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminPanel from "./components//AdminComponents/AdminPanel.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {
    const { auth } = useAuth();
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <RequireAuth role="admin">
                            <AdminPanel />
                        </RequireAuth>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
