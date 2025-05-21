/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
            setIsLoading(false);
            return;
        }

        try {
            const users = [
                {
                    username: "admin",
                    password: "123",
                    role: "admin",
                    preferences: []
                },
                {
                    username: "student",
                    password: "123",
                    role: "student",
                    preferences: ["academic", "entertainment"],
                    major: "Công nghệ thông tin"
                }
            ];

            const user = users.find(
                (u) =>
                    u.username === username && u.password === password && u.role === role
            );

            if (user) {
                localStorage.setItem("auth", JSON.stringify(user));
                if (user.role === "admin") {
                    navigate("/admin/movies");
                } else {
                    navigate("/home"); // Redirect to /home for students
                }
            } else {
                setError("Sai tài khoản, mật khẩu hoặc vai trò");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi, vui lòng thử lại");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-xl font-bold text-center text-blue-600 mb-6">
                    Đăng nhập UniFlow
                </h2>
                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4 text-sm text-center transition-opacity duration-300">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium mb-1">
                        Vai trò
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                        aria-label="Chọn vai trò"
                    >
                        <option value="student">Sinh viên</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                        Tài khoản
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                        placeholder={role === "admin" ? "admin" : "student"}
                        aria-label="Tên tài khoản"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                        placeholder="123"
                        aria-label="Mật khẩu"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 rounded-lg transition ${isLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        } text-white`}
                >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
