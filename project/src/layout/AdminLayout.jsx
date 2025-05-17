import React, { useRef, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import {
    FaVideo,
    FaCalendarAlt,
    FaUserGraduate,
    FaSchool,
    FaChartBar,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from 'react-icons/fa';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarWidth, setSidebarWidth] = useState(256); // Default width
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isResizing = useRef(false);

    const handleLogout = () => {
        navigate('/');
    };

    const handleMouseDown = () => {
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;
        const newWidth = Math.max(200, e.clientX);
        setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="flex min-h-screen bg-gray-100" style={{ paddingLeft: isSidebarOpen ? sidebarWidth : 0 }}>
            {/* Sidebar */}
            {isSidebarOpen && (
                <aside
                    className="bg-blue-700 text-white flex flex-col fixed top-0 left-0 h-screen overflow-y-auto z-50 transition-all duration-300"
                    style={{ width: sidebarWidth }}
                >
                    <div className="px-6 py-4 flex justify-between items-center border-b border-blue-600">
                        <div className="text-2xl font-bold">🎓 Admin</div>
                        <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-300">
                            <FaTimes />
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
                        <Link to="/admin/movies" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 transition">
                            <FaVideo /> Quản lý Phim
                        </Link>
                        <Link to="/admin/events" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 transition">
                            <FaCalendarAlt /> Quản lý Sự kiện
                        </Link>
                        <Link to="/admin/students" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 transition">
                            <FaUserGraduate /> Quản lý Sinh viên
                        </Link>
                        <Link to="/admin/rooms" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 transition">
                            <FaSchool /> Quản lý Phòng học
                        </Link>
                        <Link to="/admin/report" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 transition">
                            <FaChartBar /> Thống kê & Báo cáo
                        </Link>
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-sm font-medium"
                    >
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                    <div className="text-xs text-center py-3 border-t border-blue-600">
                        © 2025 Hệ thống quản lý
                    </div>
                    {/* Drag to resize */}
                    <div
                        onMouseDown={handleMouseDown}
                        className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-blue-900 opacity-40 hover:opacity-80"
                    />
                </aside>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">

                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="text-xl text-blue-700 hover:text-blue-500"
                            >
                                <FaBars />
                            </button>
                        )}
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm..."
                            className="border px-4 py-2 rounded-md w-72 focus:outline-blue-500"
                        />
                    </div>
                    <div className="text-gray-700 font-semibold">
                        Hi, <span className="text-blue-600">Admin</span>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
