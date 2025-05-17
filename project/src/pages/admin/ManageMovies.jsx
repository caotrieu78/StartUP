import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ManageMovies = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'Everything Everywhere All At Once',
            description: 'Một người phụ nữ bình thường được kéo vào một cuộc phiêu lưu đa vũ trụ kỳ lạ.',
            date: '2025-06-10',
            time: '18:00',
            cinema: 'Hội trường Beethoven',
            genre: 'Hành động',
            duration: 139,
            trailer: 'https://www.youtube.com/watch?v=wxN1T1uxQ2g',
            poster: 'https://phimimg.com/upload/vod/20250516-1/9a936cc39f0ea7a459c25de7071c6bb5.jpg',
            maxTickets: 100,
            registrationOpen: true
        }
    ]);

    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        cinema: '',
        genre: '',
        duration: '',
        trailer: '',
        poster: '',
        maxTickets: '',

        registrationOpen: true
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMovie({ ...newMovie, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddMovie = (e) => {
        e.preventDefault();
        const {
            title, description, date, time, cinema, genre, duration, trailer,
            poster, maxTickets, registrationOpen
        } = newMovie;

        if (!title || !description || !date || !time || !cinema || !genre || !duration || !trailer || !poster) return;

        setMovies([...movies, {
            ...newMovie,
            id: uuidv4(),
            duration: parseInt(duration),
            maxTickets: parseInt(maxTickets)
        }]);

        setNewMovie({
            title: '',
            description: '',
            date: '',
            time: '',
            cinema: '',
            genre: '',
            duration: '',
            trailer: '',
            poster: '',
            maxTickets: '',

            registrationOpen: true
        });

        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc muốn xoá phim này?')) {
            setMovies(movies.filter(movie => movie.id !== id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                    🎬 Quản lý Phim
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    ➕ Thêm phim
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                        <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover rounded mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{movie.genre} | {movie.duration} phút</p>
                        <p className="text-sm text-gray-500">📅 {movie.date} — 🕒 {movie.time}</p>
                        <p className="text-sm text-gray-500">📍 {movie.cinema}</p>
                        <p className="text-sm text-gray-500">🎫 {movie.maxTickets} vé</p>
                        <p className="text-sm text-gray-700 mt-2">{movie.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <a
                                href={movie.trailer}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-sm hover:underline"
                            >
                                ▶️ Trailer
                            </a>
                            <button
                                onClick={() => handleDelete(movie.id)}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Xoá
                            </button>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                            {movie.registrationOpen ? '✅ Đang mở đăng ký' : '⛔ Đã đóng đăng ký'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl relative">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">📽️ Thêm phim mới</h3>
                        <form onSubmit={handleAddMovie} className="space-y-4 max-h-[80vh] overflow-y-auto">
                            <input name="title" value={newMovie.title} onChange={handleChange} placeholder="Tên phim" className="w-full px-4 py-2 border rounded-md" />
                            <textarea name="description" value={newMovie.description} onChange={handleChange} placeholder="Mô tả phim" className="w-full px-4 py-2 border rounded-md" />
                            <div className="flex gap-4">
                                <input name="date" type="date" value={newMovie.date} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-md" />
                                <input name="time" type="time" value={newMovie.time} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-md" />
                            </div>
                            <input name="cinema" value={newMovie.cinema} onChange={handleChange} placeholder="Rạp chiếu / Hội trường" className="w-full px-4 py-2 border rounded-md" />
                            <select name="genre" value={newMovie.genre} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                                <option value="">-- Thể loại --</option>
                                <option value="Hành động">Hành động</option>
                                <option value="Hài">Hài</option>
                                <option value="Tình cảm">Tình cảm</option>
                                <option value="Tâm lý">Tâm lý</option>
                                <option value="Kinh dị">Kinh dị</option>
                                <option value="Tài liệu">Tài liệu</option>
                            </select>
                            <input name="duration" type="number" value={newMovie.duration} onChange={handleChange} placeholder="Thời lượng (phút)" className="w-full px-4 py-2 border rounded-md" />
                            <input name="maxTickets" type="number" value={newMovie.maxTickets} onChange={handleChange} placeholder="Số vé tối đa" className="w-full px-4 py-2 border rounded-md" />
                            <input name="trailer" type="url" value={newMovie.trailer} onChange={handleChange} placeholder="Link trailer (YouTube)" className="w-full px-4 py-2 border rounded-md" />
                            <input name="poster" type="url" value={newMovie.poster} onChange={handleChange} placeholder="Link poster phim" className="w-full px-4 py-2 border rounded-md" />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="registrationOpen" checked={newMovie.registrationOpen} onChange={handleChange} />
                                <label className="text-sm text-gray-700">Cho phép đăng ký</label>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Huỷ</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Thêm phim</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMovies;
