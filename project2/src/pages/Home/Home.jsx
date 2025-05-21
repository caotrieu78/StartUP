/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner";
import events from "../../constant/eventData";
import {
    FaCalendar,
    FaMapMarkerAlt,
    FaRobot,
    FaBullseye,
    FaFilm,
    FaQrcode,
    FaBook,
    FaTheaterMasks
} from "react-icons/fa";
import { PATHS } from "../../constant/pathnames";

function Home() {
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        role: "",
        preferences: [],
        major: ""
    });

    useEffect(() => {
        const updateAuthState = () => {
            try {
                const storedAuth = localStorage.getItem("auth");
                if (storedAuth) {
                    const parsedAuth = JSON.parse(storedAuth);
                    setAuth({
                        isLoggedIn: !!parsedAuth.username,
                        role: parsedAuth.role || "",
                        preferences: parsedAuth.preferences || [],
                        major: parsedAuth.major || ""
                    });
                } else {
                    setAuth({
                        isLoggedIn: false,
                        role: "",
                        preferences: [],
                        major: ""
                    });
                }
            } catch (err) {
                console.error("Auth parse error:", err);
                setAuth({
                    isLoggedIn: false,
                    role: "",
                    preferences: [],
                    major: ""
                });
            }
        };

        updateAuthState();
        window.addEventListener("storage", updateAuthState);
        return () => window.removeEventListener("storage", updateAuthState);
    }, []);

    const getPersonalizedEvents = () => {
        // Nếu không có dữ liệu sự kiện, trả về mảng rỗng
        if (!events || events.length === 0) {
            return [];
        }

        // Nếu chưa đăng nhập hoặc không có sở thích, trả về 3 sự kiện đầu tiên
        if (!auth.isLoggedIn || !auth.preferences.length) {
            return events.slice(0, 3);
        }

        // Map auth.preferences to tags in eventData
        const preferenceToTagMap = {
            academic: "học tập",
            entertainment: "giải trí",
            movie: "phim"
        };

        const userPreferenceTags = auth.preferences.map(
            (pref) => preferenceToTagMap[pref] || pref
        );

        // Lọc sự kiện theo tags hoặc chuyên ngành
        const personalized = events
            .filter((event) => {
                const eventTags = event.tags || [];
                // Kiểm tra nếu event có tag khớp với sở thích người dùng
                const matchesPreference = userPreferenceTags.some((tag) =>
                    eventTags.includes(tag)
                );
                // Kiểm tra nếu chuyên ngành là CNTT và event có tag "cntt"
                const matchesMajor =
                    auth.major === "Công nghệ thông tin" && eventTags.includes("cntt");
                return matchesPreference || matchesMajor;
            })
            .slice(0, 3);

        // Nếu không tìm thấy sự kiện cá nhân hóa, trả về 3 sự kiện đầu tiên làm mặc định
        return personalized.length > 0 ? personalized : events.slice(0, 3);
    };

    const filteredEvents = events.filter((event) => {
        const matchesType = filterType === "all" || event.type === filterType;
        const matchesSearch = event.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-inter">
            {Banner ? (
                <Banner />
            ) : (
                <div className="h-56 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">
                        Chào mừng đến với UniFlow
                    </h1>
                </div>
            )}

            <div className="px-6 py-12 md:px-16 max-w-7xl mx-auto">
                <section className="mb-16 relative bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-8 text-center animate-fade-in">
                        Khám phá sự kiện với UniBot AI
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <Link
                            to={PATHS.ACADEMIC_EVENTS}
                            className="relative px-12 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center group"
                        >
                            <FaBook className="mr-3 text-2xl animate-pulse group-hover:animate-none" />
                            Sự kiện Học thuật
                            <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center group-hover:scale-110 transition-all">
                                <FaRobot className="mr-1" /> AI Powered
                            </span>
                            <span className="block text-sm font-normal mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Gợi ý hội thảo & học bổng thông minh
                            </span>
                        </Link>
                        <Link
                            to={PATHS.ENTERTAINMENT_EVENTS}
                            className="relative px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center group"
                        >
                            <FaTheaterMasks className="mr-3 text-2xl animate-pulse group-hover:animate-none" />
                            Sự kiện Giải trí
                            <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center group-hover:scale-110 transition-all">
                                <FaRobot className="mr-1" /> AI Powered
                            </span>
                            <span className="block text-sm font-normal mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Trải nghiệm âm nhạc & hoạt động vui chơi
                            </span>
                        </Link>
                    </div>
                </section>

                {auth.isLoggedIn && auth.role === "student" && (
                    <section className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-8 text-center animate-fade-in">
                            Sự kiện được cá nhân hóa bởi AI
                        </h2>
                        {getPersonalizedEvents().length === 0 ? (
                            <div className="text-center text-gray-600 text-lg">
                                <p className="mb-4">Chưa có sự kiện phù hợp với bạn!</p>
                                <Link
                                    to="/events"
                                    className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                                >
                                    Khám phá tất cả sự kiện ngay
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {getPersonalizedEvents().map((event) => (
                                    <div
                                        key={event.id}
                                        className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col ${event.tags.includes("học tập")
                                                ? "border-l-8 border-indigo-600"
                                                : event.tags.includes("giải trí")
                                                    ? "border-l-8 border-orange-500"
                                                    : "border-l-8 border-purple-600"
                                            }`}
                                    >
                                        <span className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center">
                                            <FaRobot className="mr-1" /> AI Gợi ý
                                        </span>
                                        <img
                                            src={event.image || "https://via.placeholder.com/300x200"}
                                            alt={event.title}
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                                            <FaCalendar className="mr-2 text-indigo-600" />{" "}
                                            {event.time}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                                            <FaMapMarkerAlt className="mr-2 text-indigo-600" />{" "}
                                            {event.location}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-4">
                                            <strong>ĐRL:</strong>{" "}
                                            {event.drlPoints
                                                ? `+${event.drlPoints} điểm`
                                                : "Không có"}
                                        </p>
                                        <Link
                                            to={`/event/${event.id}`}
                                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition text-center"
                                        >
                                            {event.tags.includes("giải trí") ||
                                                event.tags.includes("phim")
                                                ? "Mua vé/Đặt chỗ"
                                                : "Đăng ký ngay"}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {auth.isLoggedIn && (
                    <section className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-8 text-center animate-fade-in">
                            Khám phá thế giới sự kiện
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <Link
                                to="/movies"
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <FaFilm className="text-purple-600 text-5xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                                    Chiếu phim
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Đặt vé xem phim với sơ đồ chỗ ngồi thông minh.
                                </p>
                            </Link>
                            <Link
                                to="/events"
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <FaQrcode className="text-indigo-600 text-5xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                    Check-in QR
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Check-in sự kiện nhanh chóng, tiện lợi.
                                </p>
                            </Link>
                            <Link
                                to="/drl"
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <FaBullseye className="text-orange-600 text-5xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-orange-700 mb-2">
                                    Quản lý ĐRL
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Theo dõi và đạt 100 điểm rèn luyện dễ dàng.
                                </p>
                            </Link>
                            <Link
                                to="/ai"
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <FaRobot className="text-green-600 text-5xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-green-700 mb-2">
                                    Trò chuyện với UniBot
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Hỏi đáp sự kiện với AI thông minh.
                                </p>
                            </Link>
                        </div>
                    </section>
                )}

                <section className="mb-12">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sự kiện bạn yêu thích..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-1/3 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm"
                        />
                        <div className="flex gap-3 flex-wrap">
                            {["all", "movie"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${filterType === type
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {type === "all" ? "Tất cả" : "Chiếu phim"}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-8 text-center animate-fade-in">
                        Sự kiện nổi bật
                    </h2>
                    {filteredEvents.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg">
                            Không tìm thấy sự kiện phù hợp. Hãy thử thay đổi bộ lọc!
                        </p>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.slice(0, 8).map((event) => (
                                <div
                                    key={event.id}
                                    className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col ${event.tags.includes("học tập")
                                            ? "border-l-8 border-indigo-600"
                                            : event.tags.includes("giải trí")
                                                ? "border-l-8 border-orange-500"
                                                : "border-l-8 border-purple-600"
                                        }`}
                                >
                                    {(event.qrCode || event.hasSeating) && (
                                        <span className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                            {event.qrCode ? "Check-in QR" : "Sơ đồ chỗ ngồi"}
                                        </span>
                                    )}
                                    <img
                                        src={event.image || "https://via.placeholder.com/300x200"}
                                        alt={event.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                                        <FaCalendar className="mr-2 text-indigo-600" /> {event.time}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                                        <FaMapMarkerAlt className="mr-2 text-indigo-600" />{" "}
                                        {event.location}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        <strong>ĐRL:</strong>{" "}
                                        {event.drlPoints ? `+${event.drlPoints} điểm` : "Không có"}
                                    </p>
                                    <Link
                                        to={`/event/${event.id}`}
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition text-center"
                                    >
                                        {event.tags.includes("giải trí") ||
                                            event.tags.includes("phim")
                                            ? "Mua vé/Đặt chỗ"
                                            : "Đăng ký ngay"}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-10 flex justify-center gap-4 flex-wrap">
                        {filteredEvents.length > 8 && (
                            <Link
                                to="/events"
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                            >
                                Xem tất cả sự kiện
                            </Link>
                        )}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-8 text-center animate-fade-in">
                        Vì sao UniFlow dẫn đầu?
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <FaRobot className="text-indigo-600 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                Gợi ý AI thông minh
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                UniBot AI cá nhân hóa trải nghiệm sự kiện của bạn.
                            </p>
                            <Link
                                to="/ai"
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                            >
                                Khám phá ngay
                            </Link>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <FaBullseye className="text-orange-600 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-orange-700 mb-2">
                                Quản lý ĐRL
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Lên kế hoạch đạt 100 điểm rèn luyện dễ dàng.
                            </p>
                            <Link
                                to="/drl"
                                className="text-orange-600 hover:text-orange-800 font-medium transition"
                            >
                                Xem lộ trình
                            </Link>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <FaFilm className="text-purple-600 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-purple-700 mb-2">
                                Chiếu phim
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Đặt vé xem phim với sơ đồ chỗ ngồi trực quan.
                            </p>
                            <Link
                                to="/movies"
                                className="text-purple-600 hover:text-purple-800 font-medium transition"
                            >
                                Đặt chỗ ngay
                            </Link>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <FaQrcode className="text-indigo-600 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                Check-in QR
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Check-in sự kiện nhanh chóng với mã QR.
                            </p>
                            <Link
                                to="/events"
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                            >
                                Thử ngay
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-10 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 animate-pulse">
                            UniFlow – Nền tảng sự kiện tương lai
                        </h2>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            {auth.isLoggedIn
                                ? "Tham gia ngay để khám phá sự kiện học thuật, giải trí và trải nghiệm AI với UniBot!"
                                : "Đăng nhập để nhận gợi ý sự kiện thông minh và quản lý ĐRL hiệu quả!"}
                        </p>
                        <Link
                            to={auth.isLoggedIn ? "/ai" : "/login"}
                            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                        >
                            {auth.isLoggedIn ? "Trải nghiệm UniBot" : "Đăng nhập ngay"}
                        </Link>
                    </div>
                </section>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}

export default Home;
