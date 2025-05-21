import React, { useState, useMemo, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";

const ManageEvents = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Hội thảo AI 2025",
            date: "2025-06-20",
            participants: 120,
            points: 10,
            status: "Sắp diễn ra",
            facebook: "https://facebook.com/event1",
            criteria: 1,
            description:
                "<p>Sự kiện chuyên sâu về trí tuệ nhân tạo, thảo luận về tương lai AI.</p>",
            images: ["https://via.placeholder.com/300x200?text=AI+Workshop"],
            location: "Hanoi, Vietnam",
            organizer: "xAI Vietnam",
            createdAt: new Date().toISOString(),
            category: "Workshop"
        },
        {
            id: 2,
            title: "Lễ hội Công nghệ 2025",
            date: "2025-07-15",
            participants: 500,
            points: 15,
            status: "Sắp diễn ra",
            facebook: "https://facebook.com/event2",
            criteria: 2,
            description:
                "<p>Lễ hội công nghệ lớn nhất năm với các gian hàng và demo.</p>",
            images: ["https://via.placeholder.com/300x200?text=Tech+Festival"],
            location: "Ho Chi Minh City, Vietnam",
            organizer: "TechFest VN",
            createdAt: new Date().toISOString(),
            category: "Festival"
        },
        {
            id: 3,
            title: "Hội nghị Blockchain Quốc tế",
            date: "2025-08-10",
            participants: 200,
            points: 12,
            status: "Sắp diễn ra",
            facebook: "https://facebook.com/event3",
            criteria: 3,
            description:
                "<p>Khám phá công nghệ blockchain và ứng dụng thực tiễn.</p>",
            images: [
                "https://via.placeholder.com/300x200?text=Blockchain+Conference"
            ],
            location: "Da Nang, Vietnam",
            organizer: "Crypto VN",
            createdAt: new Date().toISOString(),
            category: "Conference"
        },
        {
            id: 4,
            title: "Seminar Lập trình AI",
            date: "2025-09-05",
            participants: 80,
            points: 8,
            status: "Sắp diễn ra",
            facebook: "https://facebook.com/event4",
            criteria: 1,
            description: "<p>Học cách lập trình AI với Python và TensorFlow.</p>",
            images: ["https://via.placeholder.com/300x200?text=AI+Programming"],
            location: "Can Tho, Vietnam",
            organizer: "AI Academy",
            createdAt: new Date().toISOString(),
            category: "Seminar"
        }
    ]);

    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        participants: "",
        points: "",
        status: "Sắp diễn ra",
        facebook: "",
        criteria: 1,
        description: "",
        images: [],
        location: "",
        organizer: "",
        category: "Workshop"
    });

    const [editEvent, setEditEvent] = useState(null);
    const [imageInput, setImageInput] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [selectedQR, setSelectedQR] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState("Tất cả");
    const [filterCategory, setFilterCategory] = useState("Tất cả");
    const [sortBy, setSortBy] = useState("date");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'
    const eventsPerPage = 10;

    // Handle input changes
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            if (editEvent) {
                setEditEvent((prev) => ({ ...prev, [name]: value }));
            } else {
                setNewEvent((prev) => ({ ...prev, [name]: value }));
            }
        },
        [editEvent]
    );

    // Handle image URL addition
    const handleAddImage = useCallback(() => {
        if (imageInput.trim()) {
            const updateImages = (prev) => ({
                ...prev,
                images: [...prev.images, imageInput.trim()]
            });
            if (editEvent) {
                setEditEvent(updateImages);
            } else {
                setNewEvent(updateImages);
            }
            setImageInput("");
        }
    }, [imageInput, editEvent]);

    // Handle image file upload (placeholder for backend integration)
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Simulate upload to backend and get URL
            // const imageUrl = await uploadImageToBackend(file);
            const imageUrl = URL.createObjectURL(file); // Temporary preview
            const updateImages = (prev) => ({
                ...prev,
                images: [...prev.images, imageUrl]
            });
            if (editEvent) {
                setEditEvent(updateImages);
            } else {
                setNewEvent(updateImages);
            }
        }
    };

    // Add new event
    const handleAddEvent = useCallback(
        (e) => {
            e.preventDefault();
            const {
                title,
                date,
                participants,
                points,
                facebook,
                location,
                organizer,
                category
            } = newEvent;
            if (
                !title ||
                !date ||
                !participants ||
                !points ||
                !facebook ||
                !location ||
                !organizer ||
                !category
            ) {
                alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
                return;
            }

            setEvents((prev) => [
                ...prev,
                {
                    ...newEvent,
                    id: uuidv4(),
                    participants: parseInt(participants),
                    points: parseInt(points),
                    criteria: parseInt(newEvent.criteria),
                    createdAt: new Date().toISOString()
                }
            ]);

            // Reset form
            setNewEvent({
                title: "",
                date: "",
                participants: "",
                points: "",
                status: "Sắp diễn ra",
                facebook: "",
                criteria: 1,
                description: "",
                images: [],
                location: "",
                organizer: "",
                category: "Workshop"
            });
            setImageFile(null);
            setShowModal(false);
        },
        [newEvent]
    );

    // Edit event
    const handleEditEvent = useCallback(
        (e) => {
            e.preventDefault();
            const {
                id,
                title,
                date,
                participants,
                points,
                facebook,
                location,
                organizer,
                category
            } = editEvent;
            if (
                !title ||
                !date ||
                !participants ||
                !points ||
                !facebook ||
                !location ||
                !organizer ||
                !category
            ) {
                alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
                return;
            }

            setEvents((prev) =>
                prev.map((ev) =>
                    ev.id === id
                        ? {
                            ...editEvent,
                            participants: parseInt(participants),
                            points: parseInt(points),
                            criteria: parseInt(editEvent.criteria)
                        }
                        : ev
                )
            );
            setEditEvent(null);
            setImageFile(null);
            setShowModal(false);
        },
        [editEvent]
    );

    // Delete event
    const handleDelete = useCallback((id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sự kiện này?")) {
            setEvents((prev) => prev.filter((e) => e.id !== id));
            setSelectedEvents((prev) =>
                prev.filter((selectedId) => selectedId !== id)
            );
        }
    }, []);

    // Bulk delete
    const handleBulkDelete = useCallback(() => {
        if (selectedEvents.length === 0) {
            alert("Vui lòng chọn ít nhất một sự kiện để xoá!");
            return;
        }
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xoá ${selectedEvents.length} sự kiện?`
            )
        ) {
            setEvents((prev) => prev.filter((e) => !selectedEvents.includes(e.id)));
            setSelectedEvents([]);
        }
    }, [selectedEvents]);

    // Toggle event selection
    const toggleEventSelection = (id) => {
        setSelectedEvents((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    // Filter and sort events
    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Search
        if (searchTerm) {
            result = result.filter(
                (e) =>
                    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.organizer.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (filterStatus !== "Tất cả") {
            result = result.filter((e) => e.status === filterStatus);
        }

        // Filter by category
        if (filterCategory !== "Tất cả") {
            result = result.filter((e) => e.category === filterCategory);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === "date") return new Date(a.date) - new Date(b.date);
            if (sortBy === "participants") return a.participants - b.participants;
            if (sortBy === "points") return a.points - b.points;
            return 0;
        });

        return result;
    }, [events, filterStatus, filterCategory, sortBy, searchTerm]);

    // Pagination
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * eventsPerPage;
        return filteredEvents.slice(start, start + eventsPerPage);
    }, [filteredEvents, currentPage]);

    // Event statistics
    const stats = useMemo(
        () => ({
            totalEvents: events.length,
            upcomingEvents: events.filter((e) => e.status === "Sắp diễn ra").length,
            totalParticipants: events.reduce((sum, e) => sum + e.participants, 0)
        }),
        [events]
    );

    // Status color mapping
    const statusColor = (status) => {
        switch (status) {
            case "Sắp diễn ra":
                return "bg-yellow-200 text-yellow-800";
            case "Đang diễn ra":
                return "bg-green-200 text-green-800";
            case "Đã diễn ra":
                return "bg-gray-300 text-gray-700";
            default:
                return "bg-gray-200 text-gray-600";
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-4xl font-extrabold text-blue-800">
                    📅 Quản lý Sự kiện
                </h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setEditEvent(null);
                            setShowModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
                    >
                        ➕ Thêm sự kiện
                    </button>
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50"
                        disabled={selectedEvents.length === 0}
                    >
                        🗑️ Xoá hàng loạt
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg"
                    >
                        {viewMode === "table" ? "🖼️ Chế độ thẻ" : "📋 Chế độ bảng"}
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-6 bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700">
                        {stats.totalEvents}
                    </p>
                    <p className="text-sm text-gray-600">Tổng sự kiện</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-700">
                        {stats.upcomingEvents}
                    </p>
                    <p className="text-sm text-gray-600">Sắp diễn ra</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">
                        {stats.totalParticipants}
                    </p>
                    <p className="text-sm text-gray-600">Tổng người tham gia</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-3 border rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Tất cả">Tất cả trạng thái</option>
                    <option value="Sắp diễn ra">Sắp diễn ra</option>
                    <option value="Đang diễn ra">Đang diễn ra</option>
                    <option value="Đã diễn ra">Đã diễn ra</option>
                </select>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Tất cả">Tất cả danh mục</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Festival">Festival</option>
                    <option value="Conference">Conference</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="date">Sắp xếp theo ngày</option>
                    <option value="participants">Sắp xếp theo số người</option>
                    <option value="points">Sắp xếp theo điểm</option>
                </select>
            </div>

            {/* Event Display */}
            {viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map((e) => (
                        <div
                            key={e.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={
                                        e.images[0] ||
                                        "https://via.placeholder.com/300x200?text=No+Image"
                                    }
                                    alt={e.title}
                                    className="w-full h-48 object-cover"
                                />
                                <span
                                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                                        e.status
                                    )}`}
                                >
                                    {e.status}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedEvents.includes(e.id)}
                                        onChange={() => toggleEventSelection(e.id)}
                                        className="w-5 h-5"
                                    />
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                        {e.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {e.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">📅 {e.date}</p>
                                <p className="text-sm text-gray-600 mb-1">📍 {e.location}</p>
                                <p className="text-sm text-gray-600 mb-1">
                                    👤 {e.participants} người
                                </p>
                                <p className="text-sm text-gray-600 mb-4">⭐ {e.points} điểm</p>
                                <div className="flex gap-3">
                                    <a
                                        href={e.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        Facebook
                                    </a>
                                    <button
                                        onClick={() => setSelectedQR(e)}
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        QR
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditEvent(e);
                                            setShowModal(true);
                                        }}
                                        className="text-green-500 hover:underline text-sm"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(e.id)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        Xoá
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-xl overflow-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-200 text-xs uppercase text-gray-600">
                            <tr>
                                <th className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedEvents.length === filteredEvents.length &&
                                            filteredEvents.length > 0
                                        }
                                        onChange={() =>
                                            setSelectedEvents(
                                                selectedEvents.length === filteredEvents.length
                                                    ? []
                                                    : filteredEvents.map((e) => e.id)
                                            )
                                        }
                                    />
                                </th>
                                <th>Tên sự kiện</th>
                                <th>Ngày</th>
                                <th>Địa điểm</th>
                                <th>Tổ chức</th>
                                <th>Danh mục</th>
                                <th>Số người</th>
                                <th>Điểm</th>
                                <th>Tiêu chí</th>
                                <th>Trạng thái</th>
                                <th>Facebook</th>
                                <th>QR</th>
                                <th>Chỉnh sửa</th>
                                <th>Xoá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEvents.map((e) => (
                                <tr key={e.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedEvents.includes(e.id)}
                                            onChange={() => toggleEventSelection(e.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">{e.title}</td>
                                    <td className="text-center">{e.date}</td>
                                    <td className="text-center">{e.location}</td>
                                    <td className="text-center">{e.organizer}</td>
                                    <td className="text-center">{e.category}</td>
                                    <td className="text-center">{e.participants}</td>
                                    <td className="text-center">{e.points}</td>
                                    <td className="text-center">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                            Tiêu chí {e.criteria}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(
                                                e.status
                                            )}`}
                                        >
                                            {e.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <a
                                            href={e.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline text-xs"
                                        >
                                            Facebook
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => setSelectedQR(e)}
                                            className="text-blue-500 hover:underline text-xs"
                                        >
                                            QR
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => {
                                                setEditEvent(e);
                                                setShowModal(true);
                                            }}
                                            className="text-green-500 hover:underline text-xs"
                                        >
                                            Sửa
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDelete(e.id)}
                                            className="text-red-500 hover:underline text-xs"
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                    >
                        Trước
                    </button>
                    <span className="px-6 py-3 text-gray-700">
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                    >
                        Sau
                    </button>
                </div>
            )}

            {/* Modal Thêm/Chỉnh sửa sự kiện */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            📝 {editEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
                        </h3>
                        <form
                            onSubmit={editEvent ? handleEditEvent : handleAddEvent}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    name="title"
                                    value={editEvent ? editEvent.title : newEvent.title}
                                    onChange={handleChange}
                                    placeholder="Tên sự kiện *"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    name="date"
                                    type="date"
                                    value={editEvent ? editEvent.date : newEvent.date}
                                    onChange={handleChange}
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    name="location"
                                    value={editEvent ? editEvent.location : newEvent.location}
                                    onChange={handleChange}
                                    placeholder="Địa điểm *"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    name="organizer"
                                    value={editEvent ? editEvent.organizer : newEvent.organizer}
                                    onChange={handleChange}
                                    placeholder="Đơn vị tổ chức *"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    name="participants"
                                    type="number"
                                    value={
                                        editEvent ? editEvent.participants : newEvent.participants
                                    }
                                    onChange={handleChange}
                                    placeholder="Số người tham gia *"
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    name="points"
                                    type="number"
                                    value={editEvent ? editEvent.points : newEvent.points}
                                    onChange={handleChange}
                                    placeholder="Điểm rèn luyện *"
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    name="facebook"
                                    type="url"
                                    value={editEvent ? editEvent.facebook : newEvent.facebook}
                                    onChange={handleChange}
                                    placeholder="Link Facebook sự kiện *"
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <select
                                    name="criteria"
                                    value={editEvent ? editEvent.criteria : newEvent.criteria}
                                    onChange={handleChange}
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="1">Tiêu chí 1</option>
                                    <option value="2">Tiêu chí 2</option>
                                    <option value="3">Tiêu chí 3</option>
                                    <option value="4">Tiêu chí 4</option>
                                    <option value="5">Tiêu chí 5</option>
                                </select>
                                <select
                                    name="status"
                                    value={editEvent ? editEvent.status : newEvent.status}
                                    onChange={handleChange}
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Sắp diễn ra">Sắp diễn ra</option>
                                    <option value="Đang diễn ra">Đang diễn ra</option>
                                    <option value="Đã diễn ra">Đã diễn ra</option>
                                </select>
                                <select
                                    name="category"
                                    value={editEvent ? editEvent.category : newEvent.category}
                                    onChange={handleChange}
                                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Workshop">Workshop</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Festival">Festival</option>
                                    <option value="Conference">Conference</option>
                                </select>
                            </div>

                            <Editor
                                apiKey="your-tinymce-api-key"
                                value={editEvent ? editEvent.description : newEvent.description}
                                onEditorChange={(content) => {
                                    const updateDesc = (prev) => ({
                                        ...prev,
                                        description: content
                                    });
                                    if (editEvent) {
                                        setEditEvent(updateDesc);
                                    } else {
                                        setNewEvent(updateDesc);
                                    }
                                }}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: "link image lists advlist",
                                    toolbar:
                                        "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image"
                                }}
                            />

                            {/* Image input list */}
                            <div>
                                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                    <input
                                        type="url"
                                        value={imageInput}
                                        onChange={(e) => setImageInput(e.target.value)}
                                        placeholder="Thêm link hình ảnh"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddImage}
                                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        + Thêm URL
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tải lên hình ảnh
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                </div>
                                {(editEvent ? editEvent.images : newEvent.images).length >
                                    0 && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {(editEvent ? editEvent.images : newEvent.images).map(
                                                (img, i) => (
                                                    <div key={i} className="relative">
                                                        <img
                                                            src={img}
                                                            alt={`Ảnh ${i + 1}`}
                                                            className="w-full h-32 object-cover rounded-lg border"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updateImages = (prev) => ({
                                                                    ...prev,
                                                                    images: prev.images.filter(
                                                                        (_, index) => index !== i
                                                                    )
                                                                });
                                                                if (editEvent) {
                                                                    setEditEvent(updateImages);
                                                                } else {
                                                                    setNewEvent(updateImages);
                                                                }
                                                            }}
                                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditEvent(null);
                                    }}
                                    className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Huỷ
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editEvent ? "Lưu thay đổi" : "Thêm sự kiện"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal QR */}
            {selectedQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-center">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">
                            Mã QR cho: {selectedQR.title}
                        </h4>
                        <div className="w-64 h-64 mx-auto flex items-center justify-center bg-gray-100 border-2 border-dashed rounded-lg">
                            {/* Placeholder for QR Code */}
                            {/* <QRCode value={selectedQR.facebook} size={256} /> */}
                            <span className="text-gray-500">
                                QR Code cho {selectedQR.facebook}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                // Pseudocode: Download QR code as image
                                // const canvas = document.querySelector('canvas'); // Get QR code canvas
                                // canvas.toBlob((blob) => saveAs(blob, `${selectedQR.title}-qrcode.png`));
                                alert(
                                    "Tính năng tải QR code sẽ được triển khai với thư viện QR!"
                                );
                            }}
                            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Tải QR Code
                        </button>
                        <button
                            onClick={() => setSelectedQR(null)}
                            className="mt-2 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
