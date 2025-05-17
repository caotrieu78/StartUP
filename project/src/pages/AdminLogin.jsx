import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
            return;
        }

        if (username === 'admin' && password === '123') {
            localStorage.setItem('isAdminLoggedIn', 'true'); // lưu trạng thái đăng nhập
            navigate('/admin/movies'); // chuyển sang trang quản lý phim
        } else {
            setError('Sai tài khoản hoặc mật khẩu');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-xl font-bold text-center text-blue-600 mb-6">Đăng nhập Quản trị</h2>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Tài khoản</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                        placeholder="admin"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                        placeholder="123"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
