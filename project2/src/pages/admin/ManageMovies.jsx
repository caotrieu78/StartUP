import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const ManageMovies = () => {
    const today = "2025-05-17"; // Ngày hiện tại: 17/05/2025

    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Everything Everywhere All At Once",
            description:
                "Một người phụ nữ bình thường được kéo vào một cuộc phiêu lưu đa vũ trụ kỳ lạ.",
            date: "2025-06-10",
            time: "18:00",
            cinema: "Hội trường Beethoven",
            genre: "Hành động",
            duration: 139,
            trailer: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
            poster:
                "https://phimimg.com/upload/vod/20250516-1/9a936cc39f0ea7a459c25de7071c6bb5.jpg",
            maxTickets: 100,
            bookedTickets: 60,
            registrationOpen: true
        },
        {
            id: 2,
            title: "Dune: Part Two",
            description:
                "Paul Atreides tiếp tục hành trình định mệnh để bảo vệ Arrakis và vũ trụ.",
            date: "2025-07-15",
            time: "20:00",
            cinema: "Hội trường Beethoven",
            genre: "Khoa học viễn tưởng",
            duration: 166,
            trailer: "https://www.youtube.com/watch?v=Way9Dexny3w",
            poster:
                "https://i.ytimg.com/vi/53BBRKF-L60/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gQygTMA8=&rs=AOn4CLDgS78KBd_b20u0o-YBvLDGs6De2A",
            maxTickets: 120,
            bookedTickets: 45,
            registrationOpen: true
        },
        {
            id: 3,
            title: "Inside Out 2",
            description:
                "Riley đối mặt với những cảm xúc mới khi bước vào tuổi teen.",
            date: "2025-06-20",
            time: "16:30",
            cinema: "Hội trường Beethoven",
            genre: "Hoạt hình",
            duration: 96,
            trailer: "https://www.youtube.com/watch?v=LEjhY15eCx0",
            poster:
                "https://phimimg.com/upload/vod/20240820-1/5e2380f7a7abe200ebbe8b3cc5fc04f0.jpg",
            maxTickets: 80,
            bookedTickets: 70,
            registrationOpen: false
        },
        {
            id: 4,
            title: "Oppenheimer",
            description:
                "Câu chuyện về cha đẻ của bom nguyên tử và những hệ lụy của nó.",
            date: "2025-08-05",
            time: "19:00",
            cinema: "Hội trường Beethoven",
            genre: "Tiểu sử",
            duration: 180,
            trailer: "https://www.youtube.com/watch?v=bK6ldnjE3Y0",
            poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
            maxTickets: 150,
            bookedTickets: 100,
            registrationOpen: true
        },
        {
            id: 5,
            title: "Poor Things",
            description:
                "Hành trình khám phá bản thân của một phụ nữ được tái sinh trong thế giới kỳ lạ.",
            date: "2025-07-25",
            time: "21:00",
            cinema: "Hội trường Beethoven",
            genre: "Tâm lý",
            duration: 141,
            trailer: "https://www.youtube.com/watch?v=RlbR5N6veqw",
            poster:
                "https://phimimg.com/upload/vod/20240304-1/d8ba8fca16be1971c47cd15cf81f3935.jpg",
            maxTickets: 90,
            bookedTickets: 30,
            registrationOpen: false
        },
        {
            id: 6,
            title: "The Matrix Resurrections",
            description: "Neo trở lại Ma Trận để đối mặt với thực tại mới.",
            date: "2025-05-01",
            time: "19:00",
            cinema: "Hội trường Beethoven",
            genre: "Khoa học viễn tưởng",
            duration: 148,
            trailer: "https://www.youtube.com/watch?v=9ix7TUGVYIo",
            poster: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
            maxTickets: 110,
            bookedTickets: 90,
            registrationOpen: false
        }
    ]);

    const [newMovie, setNewMovie] = useState({
        id: "",
        title: "",
        description: "",
        date: "",
        time: "",
        cinema: "Hội trường Beethoven",
        genre: "",
        duration: "",
        trailer: "",
        poster: "",
        maxTickets: "",
        bookedTickets: 0,
        registrationOpen: true
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [filterGenre, setFilterGenre] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMovie({ ...newMovie, [name]: type === "checkbox" ? checked : value });
    };

    const handleAddOrEditMovie = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const {
            id,
            title,
            description,
            date,
            time,
            cinema,
            genre,
            duration,
            trailer,
            poster,
            maxTickets,
            bookedTickets,
            registrationOpen
        } = newMovie;

        if (
            !title ||
            !description ||
            !date ||
            !time ||
            !cinema ||
            !genre ||
            !duration ||
            !trailer ||
            !poster ||
            !maxTickets
        ) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            if (isEdit) {
                setMovies(
                    movies.map((movie) =>
                        movie.id === id
                            ? {
                                ...newMovie,
                                duration: parseInt(duration),
                                maxTickets: parseInt(maxTickets),
                                bookedTickets: parseInt(bookedTickets) || movie.bookedTickets
                            }
                            : movie
                    )
                );
                toast.success("Chỉnh sửa phim thành công!");
            } else {
                setMovies([
                    ...movies,
                    {
                        ...newMovie,
                        id: uuidv4(),
                        duration: parseInt(duration),
                        maxTickets: parseInt(maxTickets),
                        bookedTickets: parseInt(bookedTickets) || 0
                    }
                ]);
                toast.success("Thêm phim thành công!");
            }

            setNewMovie({
                id: "",
                title: "",
                description: "",
                date: "",
                time: "",
                cinema: "Hội trường Beethoven",
                genre: "",
                duration: "",
                trailer: "",
                poster: "",
                maxTickets: "",
                bookedTickets: 0,
                registrationOpen: true
            });
            setShowModal(false);
            setIsEdit(false);
            setIsLoading(false);
        }, 500);
    };

    const handleEdit = (movie) => {
        setNewMovie(movie);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xoá phim này?")) {
            setIsLoading(true);
            setTimeout(() => {
                setMovies(movies.filter((movie) => movie.id !== id));
                toast.success("Xoá phim thành công!");
                setIsLoading(false);
            }, 500);
        }
    };

    const filteredMovies = movies.filter((movie) => {
        const isGenreMatch = filterGenre ? movie.genre === filterGenre : true;
        const isStatusMatch = filterStatus
            ? movie.registrationOpen === (filterStatus === "open")
            : true;
        const isDateMatch =
            filterDate === "all"
                ? true
                : filterDate === "past"
                    ? movie.date < today
                    : movie.date >= today;
        return isGenreMatch && isStatusMatch && isDateMatch;
    });

    const pastMovies = filteredMovies.filter((movie) => movie.date < today);
    const upcomingMovies = filteredMovies.filter((movie) => movie.date >= today);

    return (
        <div className="p-4 min-h-screen bg-white font-['Inter'] text-gray-900">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <i className="fas fa-film"></i> Quản lý Phim
                </h2>
                <button
                    onClick={() => {
                        setShowModal(true);
                        setIsEdit(false);
                        setNewMovie({
                            id: "",
                            title: "",
                            description: "",
                            date: "",
                            time: "",
                            cinema: "Hội trường Beethoven",
                            genre: "",
                            duration: "",
                            trailer: "",
                            poster: "",
                            maxTickets: "",
                            bookedTickets: 0,
                            registrationOpen: true
                        });
                    }}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition flex items-center gap-1 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <i className="fas fa-plus"></i> Thêm phim
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
                <select
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <option value="">Tất cả thể loại</option>
                    <option value="Hành động">Hành động</option>
                    <option value="Khoa học viễn tưởng">Khoa học viễn tưởng</option>
                    <option value="Hoạt hình">Hoạt hình</option>
                    <option value="Tiểu sử">Tiểu sử</option>
                    <option value="Tâm lý">Tâm lý</option>
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="open">Đang mở đăng ký</option>
                    <option value="closed">Đã đóng đăng ký</option>
                </select>
                <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <option value="all">Tất cả phim</option>
                    <option value="past">Phim đã qua</option>
                    <option value="upcoming">Phim sắp tới</option>
                </select>
            </div>

            {/* Phim sắp tới Section */}
            {(filterDate === "all" || filterDate === "upcoming") &&
                upcomingMovies.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Phim sắp tới
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {upcomingMovies.map((movie, index) => (
                                <div
                                    key={movie.id}
                                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fadeIn group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="w-full h-64 object-cover rounded-t-xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-xl"></div>
                                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {movie.genre}
                                        </span>
                                        <span
                                            className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${movie.registrationOpen ? "bg-green-500" : "bg-red-500"
                                                } text-white`}
                                        >
                                            {movie.registrationOpen ? "Mở" : "Đóng"}
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                                            {movie.title}
                                        </h3>
                                        <div className="mt-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs font-semibold text-blue-600">
                                                    <i className="fas fa-ticket-alt mr-1"></i>
                                                    Đã đặt:{" "}
                                                    <span className="text-lg">{movie.bookedTickets}</span>
                                                </p>
                                                <p className="text-xs font-semibold text-green-600">
                                                    <i className="fas fa-ticket-alt mr-1"></i>
                                                    Còn lại:{" "}
                                                    <span className="text-lg">
                                                        {movie.maxTickets - movie.bookedTickets}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 space-y-1">
                                            <p>
                                                <i className="fas fa-clock mr-1"></i>
                                                {movie.duration} phút
                                            </p>
                                            <p>
                                                <i className="fas fa-calendar-alt mr-1"></i>
                                                {movie.date} — <i className="fas fa-clock mr-1"></i>
                                                {movie.time}
                                            </p>
                                            <p>
                                                <i className="fas fa-map-marker-alt mr-1"></i>
                                                {movie.cinema}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                            {movie.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex gap-1">
                                                <a
                                                    href={movie.trailer}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition transform hover:scale-110"
                                                    title="Xem Trailer"
                                                >
                                                    <i className="fas fa-play"></i>
                                                </a>
                                                <button
                                                    onClick={() => setShowDetailModal(movie)}
                                                    className="bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition transform hover:scale-110"
                                                    title="Chi tiết"
                                                >
                                                    <i className="fas fa-info-circle"></i>
                                                </button>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(movie)}
                                                    className="bg-yellow-500 text-white p-1.5 rounded-full hover:bg-yellow-600 transition transform hover:scale-110"
                                                    title="Sửa"
                                                    disabled={isLoading}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(movie.id)}
                                                    className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition transform hover:scale-110"
                                                    title="Xóa"
                                                    disabled={isLoading}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            {/* Phim đã qua Section */}
            {(filterDate === "all" || filterDate === "past") &&
                pastMovies.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Phim đã qua
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pastMovies.map((movie, index) => (
                                <div
                                    key={movie.id}
                                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fadeIn group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="w-full h-64 object-cover rounded-t-xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-xl"></div>
                                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {movie.genre}
                                        </span>
                                        <span
                                            className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${movie.registrationOpen ? "bg-green-500" : "bg-red-500"
                                                } text-white`}
                                        >
                                            {movie.registrationOpen ? "Mở" : "Đóng"}
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                                            {movie.title}
                                        </h3>
                                        <div className="mt-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs font-semibold text-blue-600">
                                                    <i className="fas fa-ticket-alt mr-1"></i>
                                                    Đã đặt:{" "}
                                                    <span className="text-lg">{movie.bookedTickets}</span>
                                                </p>
                                                <p className="text-xs font-semibold text-green-600">
                                                    <i className="fas fa-ticket-alt mr-1"></i>
                                                    Còn lại:{" "}
                                                    <span className="text-lg">
                                                        {movie.maxTickets - movie.bookedTickets}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 space-y-1">
                                            <p>
                                                <i className="fas fa-clock mr-1"></i>
                                                {movie.duration} phút
                                            </p>
                                            <p>
                                                <i className="fas fa-calendar-alt mr-1"></i>
                                                {movie.date} — <i className="fas fa-clock mr-1"></i>
                                                {movie.time}
                                            </p>
                                            <p>
                                                <i className="fas fa-map-marker-alt mr-1"></i>
                                                {movie.cinema}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                            {movie.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex gap-1">
                                                <a
                                                    href={movie.trailer}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition transform hover:scale-110"
                                                    title="Xem Trailer"
                                                >
                                                    <i className="fas fa-play"></i>
                                                </a>
                                                <button
                                                    onClick={() => setShowDetailModal(movie)}
                                                    className="bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition transform hover:scale-110"
                                                    title="Chi tiết"
                                                >
                                                    <i className="fas fa-info-circle"></i>
                                                </button>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(movie)}
                                                    className="bg-yellow-500 text-white p-1.5 rounded-full hover:bg-yellow-600 transition transform hover:scale-110"
                                                    title="Sửa"
                                                    disabled={isLoading}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(movie.id)}
                                                    className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition transform hover:scale-110"
                                                    title="Xóa"
                                                    disabled={isLoading}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            {filteredMovies.length === 0 && (
                <div className="text-center text-gray-600 text-sm">
                    Không tìm thấy phim phù hợp với bộ lọc.
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl w-full max-w-lg shadow-2xl transform transition-all scale-100 animate-fadeIn">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                            <i className="fas fa-film"></i>{" "}
                            {isEdit ? "Chỉnh sửa phim" : "Thêm phim mới"}
                        </h3>
                        <form
                            onSubmit={handleAddOrEditMovie}
                            className="space-y-3 max-h-[80vh] overflow-y-auto"
                        >
                            <input
                                name="title"
                                value={newMovie.title}
                                onChange={handleChange}
                                placeholder="Tên phim"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <textarea
                                name="description"
                                value={newMovie.description}
                                onChange={handleChange}
                                placeholder="Mô tả phim"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                rows="3"
                                disabled={isLoading}
                            />
                            <div className="flex gap-3">
                                <input
                                    name="date"
                                    type="date"
                                    value={newMovie.date}
                                    onChange={handleChange}
                                    className="w-1/2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                />
                                <input
                                    name="time"
                                    type="time"
                                    value={newMovie.time}
                                    onChange={handleChange}
                                    className="w-1/2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                />
                            </div>
                            <input
                                name="cinema"
                                value={newMovie.cinema}
                                onChange={handleChange}
                                placeholder="Hội trường Beethoven"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <select
                                name="genre"
                                value={newMovie.genre}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                <option value="">-- Thể loại --</option>
                                <option value="Hành động">Hành động</option>
                                <option value="Khoa học viễn tưởng">Khoa học viễn tưởng</option>
                                <option value="Hoạt hình">Hoạt hình</option>
                                <option value="Tiểu sử">Tiểu sử</option>
                                <option value="Tâm lý">Tâm lý</option>
                            </select>
                            <input
                                name="duration"
                                type="number"
                                value={newMovie.duration}
                                onChange={handleChange}
                                placeholder="Thời lượng (phút)"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <input
                                name="maxTickets"
                                type="number"
                                value={newMovie.maxTickets}
                                onChange={handleChange}
                                placeholder="Số vé tối đa"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <input
                                name="bookedTickets"
                                type="number"
                                value={newMovie.bookedTickets}
                                onChange={handleChange}
                                placeholder="Số vé đã đặt"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <input
                                name="trailer"
                                type="url"
                                value={newMovie.trailer}
                                onChange={handleChange}
                                placeholder="Link trailer (YouTube)"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <input
                                name="poster"
                                type="url"
                                value={newMovie.poster}
                                onChange={handleChange}
                                placeholder="Link poster phim"
                                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="registrationOpen"
                                    checked={newMovie.registrationOpen}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                />
                                <label className="text-xs text-gray-600">
                                    Cho phép đăng ký
                                </label>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    Huỷ
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-1 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        <i className="fas fa-save"></i>
                                    )}
                                    {isEdit ? "Lưu" : "Thêm phim"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl w-full max-w-lg shadow-2xl transform transition-all scale-100 animate-fadeIn">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fas fa-info-circle"></i> {showDetailModal.title}
                        </h3>
                        <div className="space-y-3">
                            <img
                                src={showDetailModal.poster}
                                alt={showDetailModal.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <p className="text-xs text-gray-600">
                                {showDetailModal.description}
                            </p>
                            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                                <p>
                                    <i className="fas fa-clock mr-1"></i>Thời lượng:{" "}
                                    {showDetailModal.duration} phút
                                </p>
                                <p>
                                    <i className="fas fa-calendar-alt mr-1"></i>Ngày chiếu:{" "}
                                    {showDetailModal.date}
                                </p>
                                <p>
                                    <i className="fas fa-clock mr-1"></i>Giờ chiếu:{" "}
                                    {showDetailModal.time}
                                </p>
                                <p>
                                    <i className="fas fa-map-marker-alt mr-1"></i>Rạp:{" "}
                                    {showDetailModal.cinema}
                                </p>
                                <p>
                                    <i className="fas fa-ticket-alt mr-1"></i>Vé tối đa:{" "}
                                    {showDetailModal.maxTickets}
                                </p>
                                <p>
                                    <i className="fas fa-ticket-alt mr-1"></i>Vé đã đặt:{" "}
                                    {showDetailModal.bookedTickets}
                                </p>
                                <p>
                                    <i className="fas fa-ticket-alt mr-1"></i>Vé còn lại:{" "}
                                    {showDetailModal.maxTickets - showDetailModal.bookedTickets}
                                </p>
                                <p>
                                    <i className="fas fa-tags mr-1"></i>Thể loại:{" "}
                                    {showDetailModal.genre}
                                </p>
                                <p>
                                    <i className="fas fa-check-circle mr-1"></i>Trạng thái:{" "}
                                    {showDetailModal.registrationOpen ? "Mở" : "Đóng"}
                                </p>
                                <p>
                                    <i className="fas fa-calendar-check mr-1"></i>Tình trạng:{" "}
                                    {showDetailModal.date < today ? "Đã qua" : "Sắp tới"}
                                </p>
                            </div>
                            <div className="mt-3">
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${showDetailModal.trailer.split("v=")[1]?.split("&")[0]
                                        }`}
                                    title={`${showDetailModal.title} Trailer`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg"
                                ></iframe>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowDetailModal(null)}
                                className="px-3 py-1.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toaster position="top-right" />
        </div>
    );
};

export default ManageMovies;
