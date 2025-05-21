/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        username: "",
        role: "",
        major: ""
    });
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const StoredAuth = localStorage.getItem("auth");
            if (StoredAuth) {
                const parsedAuth = JSON.parse(StoredAuth);
                setAuth({
                    isLoggedIn: !!parsedAuth.username,
                    username: parsedAuth.username || "Khách",
                    role: parsedAuth.role || "",
                    major: parsedAuth.major || ""
                });
            }
        } catch (err) {
            console.error("Auth parse error:", err);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setAuth({ isLoggedIn: false, username: "", role: "", major: "" });
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo + Tên trường */}
                <div className="flex items-center gap-3">
                    <div className="leading-tight hidden sm:block">
                        <span className="block text-lg md:text-xl font-semibold text-gray-800 tracking-wide">
                            HONG BANG
                        </span>
                        <span className="block text-sm md:text-base text-blue-600 font-medium tracking-wider">
                            INTERNATIONAL UNIVERSITY
                        </span>
                    </div>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
                    <Link to="/home" className="hover:text-blue-600 transition">
                        Trang chủ
                    </Link>
                    <Link to="/home#events" className="hover:text-blue-600 transition">
                        Sự kiện
                    </Link>
                    <Link to="/home#about" className="hover:text-blue-600 transition">
                        Giới thiệu
                    </Link>
                </nav>

                {/* Auth + Avatar */}
                <div className="hidden md:flex items-center gap-3 relative">
                    {!auth.isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/contact"
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Liên hệ
                            </Link>
                        </>
                    ) : (
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                clearTimeout(timeoutRef.current);
                                setShowAccountMenu(true);
                            }}
                            onMouseLeave={() => {
                                timeoutRef.current = setTimeout(() => {
                                    setShowAccountMenu(false);
                                }, 1000);
                            }}
                        >
                            <FaUserCircle className="text-2xl text-gray-500 cursor-pointer" />
                            {showAccountMenu && (
                                <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-50">
                                    <div className="px-4 py-3 border-b">
                                        <p className="text-sm text-gray-700">
                                            👋 Xin chào, <strong>{auth.username}</strong>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {auth.role === "student"
                                                ? `Chuyên ngành: ${auth.major}`
                                                : "Quản trị viên"}
                                        </p>
                                    </div>
                                    <ul className="text-sm">
                                        {auth.role === "student" && (
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="block px-4 py-2 hover:bg-gray-100 transition"
                                                >
                                                    📋 Lịch sử tham gia
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                                                onClick={handleLogout}
                                            >
                                                🔓 Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-2xl text-gray-700"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 px-4 space-y-3 text-gray-700 font-medium">
                    <Link to="/home" className="block hover:text-blue-600">
                        Trang chủ
                    </Link>
                    <Link to="/home#events" className="block hover:text-blue-600">
                        Sự kiện
                    </Link>
                    <Link to="/seat-selection" className="block hover:text-blue-600">
                        Đăng ký
                    </Link>
                    <Link to="/home#about" className="block hover:text-blue-600">
                        Giới thiệu
                    </Link>
                    <div className="flex flex-col gap-2 mt-4">
                        {!auth.isLoggedIn ? (
                            <>
                                <Link
                                    to="/login"
                                    className="w-full px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/contact"
                                    className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Liên hệ
                                </Link>
                            </>
                        ) : (
                            <>
                                {auth.role === "student" && (
                                    <Link
                                        to="/dashboard"
                                        className="w-full px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        Lịch sử tham gia
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
