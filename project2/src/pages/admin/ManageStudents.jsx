import React, { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const ManageStudents = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            studentId: "B21DCCN001",
            events: [
                { title: "Hội thảo AI 2025", points: 10, criteria: 1 },
                { title: "Orientation Week", points: 15, criteria: 3 },
                { title: "Ngày hội việc làm", points: 20, criteria: 4 }
            ]
        },
        {
            id: 2,
            name: "Trần Thị B",
            studentId: "B21DCCN002",
            events: [
                { title: "Hội thảo AI 2025", points: 10, criteria: 2 },
                { title: "Chiến dịch Mùa hè xanh", points: 25, criteria: 5 }
            ]
        },
        {
            id: 3,
            name: "Lê Văn C",
            studentId: "B21DCCN003",
            events: []
        },
        {
            id: 4,
            name: "Phạm Thị D",
            studentId: "B21DCCN004",
            events: [
                { title: "Lễ hội Công nghệ 2025", points: 15, criteria: 2 },
                { title: "Seminar Lập trình AI", points: 8, criteria: 1 }
            ]
        }
    ]);

    const MAX_POINTS = 100;
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({ name: "", studentId: "" });
    const [editStudent, setEditStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewMode, setViewMode] = useState("table");
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [criteriaFilter, setCriteriaFilter] = useState("Tất cả");
    const [pointFilter, setPointFilter] = useState({ min: 0, max: MAX_POINTS });
    const [eventStatusFilter, setEventStatusFilter] = useState("Tất cả");
    const studentsPerPage = 10;

    const criteriaColors = {
        1: "bg-blue-200 text-blue-800",
        2: "bg-green-200 text-green-800",
        3: "bg-yellow-200 text-yellow-800",
        4: "bg-orange-200 text-orange-800",
        5: "bg-red-200 text-red-800"
    };

    // Calculate total points
    const calculateTotalPoints = useCallback(
        (events) => events.reduce((total, event) => total + event.points, 0),
        []
    );

    // Get student status
    const getStudentStatus = useCallback(
        (events) => {
            const totalPoints = calculateTotalPoints(events);
            if (totalPoints >= MAX_POINTS)
                return { label: "Hoàn thành", color: "bg-green-600 text-white" };
            if (totalPoints > 0)
                return { label: "Đang tiến hành", color: "bg-yellow-600 text-white" };
            return { label: "Chưa bắt đầu", color: "bg-red-600 text-white" };
        },
        [calculateTotalPoints]
    );

    // Handle input changes
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            if (editStudent) {
                setEditStudent((prev) => ({ ...prev, [name]: value }));
            } else {
                setNewStudent((prev) => ({ ...prev, [name]: value }));
            }
        },
        [editStudent]
    );

    // Add new student
    const handleAddStudent = useCallback(
        (e) => {
            e.preventDefault();
            const { name, studentId } = newStudent;
            if (!name || !studentId) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }
            // Pseudocode: Validate studentId uniqueness and save to backend
            // if (await checkStudentIdExists(studentId)) { alert('MSSV đã tồn tại!'); return; }
            setStudents((prev) => [
                ...prev,
                { id: uuidv4(), name, studentId, events: [] }
            ]);
            setNewStudent({ name: "", studentId: "" });
            setShowModal(false);
            // Pseudocode: Save to backend
            // await saveStudentToBackend({ name, studentId, events: [] });
        },
        [newStudent]
    );

    // Edit student
    const handleEditStudent = useCallback(
        (e) => {
            e.preventDefault();
            const { id, name, studentId } = editStudent;
            if (!name || !studentId) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }
            setStudents((prev) =>
                prev.map((s) => (s.id === id ? { ...s, name, studentId } : s))
            );
            setEditStudent(null);
            setShowModal(false);
            // Pseudocode: Update backend
            // await updateStudentInBackend({ id, name, studentId });
        },
        [editStudent]
    );

    // Delete student
    const handleDelete = useCallback((id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sinh viên này?")) {
            setStudents((prev) => prev.filter((s) => s.id !== id));
            setSelectedStudents((prev) => prev.filter((sid) => sid !== id));
            // Pseudocode: Delete from backend
            // await deleteStudentFromBackend(id);
        }
    }, []);

    // Delete event
    const handleDeleteEvent = useCallback((studentId, eventIndex) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sự kiện này?")) {
            setStudents((prev) =>
                prev.map((s) =>
                    s.id === studentId
                        ? { ...s, events: s.events.filter((_, idx) => idx !== eventIndex) }
                        : s
                )
            );
            // Pseudocode: Update backend
            // await updateStudentEventsInBackend(studentId, updatedEvents);
        }
    }, []);

    // Bulk delete
    const handleBulkDelete = useCallback(() => {
        if (selectedStudents.length === 0) {
            alert("Vui lòng chọn ít nhất một sinh viên để xoá!");
            return;
        }
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xoá ${selectedStudents.length} sinh viên?`
            )
        ) {
            setStudents((prev) =>
                prev.filter((s) => !selectedStudents.includes(s.id))
            );
            setSelectedStudents([]);
            // Pseudocode: Bulk delete from backend
            // await bulkDeleteStudentsFromBackend(selectedStudents);
        }
    }, [selectedStudents]);

    // Toggle student selection
    const toggleStudentSelection = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    // Bulk assign event
    const handleBulkAssignEvent = useCallback(() => {
        if (selectedStudents.length === 0) {
            alert("Vui lòng chọn ít nhất một sinh viên!");
            return;
        }
        const eventTitle = prompt("Nhập tên sự kiện:");
        const points = parseInt(prompt("Nhập điểm rèn luyện:"));
        const criteria = parseInt(prompt("Nhập tiêu chí (1-5):"));
        if (
            !eventTitle ||
            isNaN(points) ||
            isNaN(criteria) ||
            criteria < 1 ||
            criteria > 5
        ) {
            alert("Thông tin sự kiện không hợp lệ!");
            return;
        }
        setStudents((prev) =>
            prev.map((s) =>
                selectedStudents.includes(s.id)
                    ? {
                        ...s,
                        events: [...s.events, { title: eventTitle, points, criteria }]
                    }
                    : s
            )
        );
        setSelectedStudents([]);
        // Pseudocode: Update backend
        // await bulkAssignEventToStudents(selectedStudents, { title: eventTitle, points, criteria });
    }, [selectedStudents]);

    // Copy to clipboard
    const copyToClipboard = useCallback(() => {
        const data = students.map((s) => ({
            studentId: s.studentId,
            name: s.name,
            totalPoints: calculateTotalPoints(s.events),
            events: s.events
        }));
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert("Dữ liệu sinh viên đã được sao chép vào clipboard!");
    }, [students, calculateTotalPoints]);

    // Filter and sort students
    const filteredStudents = useMemo(() => {
        return students
            .filter((student) => {
                const matchesSearch = `${student.name} ${student.studentId}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                const totalPoints = calculateTotalPoints(student.events);
                const matchesPoints =
                    totalPoints >= pointFilter.min && totalPoints <= pointFilter.max;
                const matchesEvents =
                    eventStatusFilter === "Tất cả" ||
                    (eventStatusFilter === "Có sự kiện" && student.events.length > 0) ||
                    (eventStatusFilter === "Không có sự kiện" &&
                        student.events.length === 0);
                return matchesSearch && matchesPoints && matchesEvents;
            })
            .sort((a, b) => {
                const totalA = calculateTotalPoints(a.events);
                const totalB = calculateTotalPoints(b.events);
                if (sortField === "name") {
                    return sortOrder === "asc"
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                } else if (sortField === "points") {
                    return sortOrder === "asc" ? totalA - totalB : totalB - totalA;
                }
                return 0;
            });
    }, [
        students,
        searchTerm,
        sortField,
        sortOrder,
        pointFilter,
        eventStatusFilter,
        calculateTotalPoints
    ]);

    // Pagination
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const paginatedStudents = useMemo(() => {
        const start = (currentPage - 1) * studentsPerPage;
        return filteredStudents.slice(start, start + studentsPerPage);
    }, [filteredStudents, currentPage]);

    // Statistics
    const stats = useMemo(
        () => ({
            totalStudents: students.length,
            averagePoints: students.length
                ? (
                    students.reduce(
                        (sum, s) => sum + calculateTotalPoints(s.events),
                        0
                    ) / students.length
                ).toFixed(1)
                : 0,
            noEvents: students.filter((s) => s.events.length === 0).length
        }),
        [students, calculateTotalPoints]
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-4xl font-extrabold text-blue-800 animate-pulse">
                    🎓 Quản lý Sinh viên
                </h2>
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={() => {
                            setEditStudent(null);
                            setShowModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                    >
                        ➕ Thêm sinh viên
                    </button>
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50 transform hover:scale-105 transition-transform"
                        disabled={selectedStudents.length === 0}
                    >
                        🗑️ Xoá hàng loạt
                    </button>
                    <button
                        onClick={handleBulkAssignEvent}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50 transform hover:scale-105 transition-transform"
                        disabled={selectedStudents.length === 0}
                    >
                        📌 Gán sự kiện
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                    >
                        📋 Sao chép dữ liệu
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                    >
                        {viewMode === "table" ? "🖼️ Chế độ thẻ" : "📋 Chế độ bảng"}
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-6 bg-white p-6 rounded-xl shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
                <div className="text-center">
                    <p className="text-3xl font-bold text-blue-700">
                        {stats.totalStudents}
                    </p>
                    <p className="text-sm text-gray-600">Tổng sinh viên</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-green-700">
                        {stats.averagePoints}
                    </p>
                    <p className="text-sm text-gray-600">Điểm trung bình</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-red-700">{stats.noEvents}</p>
                    <p className="text-sm text-gray-600">Chưa tham gia sự kiện</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 bg-white p-6 rounded-xl shadow-2xl flex flex-col gap-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm theo tên hoặc MSSV..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-3 border rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                        className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">Sắp xếp theo Tên</option>
                        <option value="points">Sắp xếp theo Điểm</option>
                    </select>
                    <button
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform"
                    >
                        {sortOrder === "asc" ? "⬆️ Tăng" : "⬇️ Giảm"}
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex gap-2 items-center">
                        <label className="text-sm text-gray-700">Điểm từ:</label>
                        <input
                            type="number"
                            value={pointFilter.min}
                            onChange={(e) =>
                                setPointFilter((prev) => ({
                                    ...prev,
                                    min: parseInt(e.target.value) || 0
                                }))
                            }
                            className="px-4 py-3 border rounded-lg w-24 focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-700">đến:</label>
                        <input
                            type="number"
                            value={pointFilter.max}
                            onChange={(e) =>
                                setPointFilter((prev) => ({
                                    ...prev,
                                    max: parseInt(e.target.value) || MAX_POINTS
                                }))
                            }
                            className="px-4 py-3 border rounded-lg w-24 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={eventStatusFilter}
                        onChange={(e) => setEventStatusFilter(e.target.value)}
                        className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Tất cả">Tất cả trạng thái</option>
                        <option value="Có sự kiện">Có sự kiện</option>
                        <option value="Không có sự kiện">Không có sự kiện</option>
                    </select>
                </div>
            </div>

            {/* Student Display */}
            {viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedStudents.map((student) => {
                        const totalPoints = calculateTotalPoints(student.events);
                        const percent = Math.min((totalPoints / MAX_POINTS) * 100, 100);
                        const status = getStudentStatus(student.events);
                        return (
                            <div
                                key={student.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => toggleStudentSelection(student.id)}
                                            className="w-5 h-5"
                                        />
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={`https://via.placeholder.com/48?text=${student.name[0]}`}
                                            alt={student.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {student.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {student.studentId}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        📊 {totalPoints} / {MAX_POINTS} điểm
                                    </p>
                                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-700 h-4 rounded-full text-white text-xs text-center transition-all duration-500"
                                            style={{ width: `${percent}%` }}
                                        >
                                            {Math.round(percent)}%
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-wrap">
                                        <button
                                            onClick={() => setSelectedStudent(student)}
                                            className="text-blue-500 hover:underline text-sm"
                                        >
                                            Chi tiết
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditStudent(student);
                                                setShowModal(true);
                                            }}
                                            className="text-green-500 hover:underline text-sm"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="text-red-500 hover:underline text-sm"
                                        >
                                            Xoá
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white shadow-2xl rounded-xl overflow-auto animate-fade-in">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-200 text-xs uppercase text-gray-600">
                            <tr>
                                <th className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedStudents.length === filteredStudents.length &&
                                            filteredStudents.length > 0
                                        }
                                        onChange={() =>
                                            setSelectedStudents(
                                                selectedStudents.length === filteredStudents.length
                                                    ? []
                                                    : filteredStudents.map((s) => s.id)
                                            )
                                        }
                                    />
                                </th>
                                <th className="px-6 py-4">Mã SV</th>
                                <th className="px-6 py-4">Họ tên</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-center">Tổng điểm</th>
                                <th className="px-6 py-4 text-center">Hoàn thành (%)</th>
                                <th className="px-6 py-4 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedStudents.map((student) => {
                                const totalPoints = calculateTotalPoints(student.events);
                                const percent = Math.min((totalPoints / MAX_POINTS) * 100, 100);
                                const status = getStudentStatus(student.events);
                                return (
                                    <tr
                                        key={student.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => toggleStudentSelection(student.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {student.studentId}
                                        </td>
                                        <td className="px-6 py-4">{student.name}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                                            >
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {totalPoints} / {MAX_POINTS}đ
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-blue-700 h-4 rounded-full text-white text-xs text-center transition-all duration-500"
                                                    style={{ width: `${percent}%` }}
                                                >
                                                    {Math.round(percent)}%
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center flex gap-2 justify-center">
                                            <button
                                                onClick={() => setSelectedStudent(student)}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Chi tiết
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditStudent(student);
                                                    setShowModal(true);
                                                }}
                                                className="text-green-600 hover:underline text-sm"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="text-red-600 hover:underline text-sm"
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {paginatedStudents.length === 0 && (
                        <div className="text-center text-gray-500 italic py-4">
                            Không tìm thấy sinh viên nào.
                        </div>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-3 animate-fade-in">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transform hover:scale-105 transition-transform"
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
                        className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transform hover:scale-105 transition-transform"
                    >
                        Sau
                    </button>
                </div>
            )}

            {/* Modal Add/Edit Student */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            {editStudent ? "Chỉnh sửa sinh viên" : "Thêm sinh viên mới"}
                        </h3>
                        <form
                            onSubmit={editStudent ? handleEditStudent : handleAddStudent}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ tên *
                                </label>
                                <input
                                    name="name"
                                    value={editStudent ? editStudent.name : newStudent.name}
                                    onChange={handleChange}
                                    placeholder="Nhập họ tên"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã số sinh viên *
                                </label>
                                <input
                                    name="studentId"
                                    value={
                                        editStudent ? editStudent.studentId : newStudent.studentId
                                    }
                                    onChange={handleChange}
                                    placeholder="Nhập MSSV"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditStudent(null);
                                    }}
                                    className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transform hover:scale-105 transition-transform"
                                >
                                    Huỷ
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform"
                                >
                                    {editStudent ? "Lưu thay đổi" : "Thêm sinh viên"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Student Details */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-8 relative">
                        <h3 className="text-2xl font-bold text-blue-700 mb-6">
                            🎯 Sự kiện của {selectedStudent.name}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lọc theo tiêu chí
                            </label>
                            <select
                                value={criteriaFilter}
                                onChange={(e) => setCriteriaFilter(e.target.value)}
                                className="px-4 py-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Tất cả">Tất cả tiêu chí</option>
                                <option value="1">Tiêu chí 1</option>
                                <option value="2">Tiêu chí 2</option>
                                <option value="3">Tiêu chí 3</option>
                                <option value="4">Tiêu chí 4</option>
                                <option value="5">Tiêu chí 5</option>
                            </select>
                        </div>
                        {selectedStudent.events.length > 0 ? (
                            <ul className="space-y-3 max-h-80 overflow-y-auto">
                                {selectedStudent.events
                                    .filter(
                                        (event) =>
                                            criteriaFilter === "Tất cả" ||
                                            event.criteria === parseInt(criteriaFilter)
                                    )
                                    .map((event, idx) => (
                                        <li
                                            key={idx}
                                            className="border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {event.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Điểm rèn luyện: <strong>+{event.points}đ</strong>
                                                </p>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${criteriaColors[event.criteria]
                                                        }`}
                                                >
                                                    Tiêu chí {event.criteria}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleDeleteEvent(selectedStudent.id, idx)
                                                }
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">Chưa tham gia sự kiện nào</p>
                        )}
                        <div className="mt-6 flex justify-between items-center">
                            <div className="text-sm font-medium">
                                <strong>Tổng điểm:</strong>{" "}
                                {calculateTotalPoints(selectedStudent.events)} / {MAX_POINTS}đ
                            </div>
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transform hover:scale-105 transition-transform"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStudents;
