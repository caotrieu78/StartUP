import React, { useState } from 'react';

const ManageStudents = () => {
    const [students] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            studentId: 'B21DCCN001',
            events: [
                { title: 'Hội thảo AI 2025', points: 10, criteria: 1 },
                { title: 'Orientation Week', points: 15, criteria: 3 },
                { title: 'Ngày hội việc làm', points: 20, criteria: 4 },
            ],
        },
        {
            id: 2,
            name: 'Trần Thị B',
            studentId: 'B21DCCN002',
            events: [
                { title: 'Hội thảo AI 2025', points: 10, criteria: 2 },
                { title: 'Chiến dịch Mùa hè xanh', points: 25, criteria: 5 },
            ],
        },
        {
            id: 3,
            name: 'Lê Văn C',
            studentId: 'B21DCCN003',
            events: [],
        },
    ]);

    const MAX_POINTS = 100;
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'

    const calculateTotalPoints = (events) =>
        events.reduce((total, event) => total + event.points, 0);

    const criteriaColors = {
        1: 'bg-blue-100 text-blue-700',
        2: 'bg-green-100 text-green-700',
        3: 'bg-yellow-100 text-yellow-800',
        4: 'bg-orange-100 text-orange-700',
        5: 'bg-red-100 text-red-700',
    };

    const filteredStudents = students
        .filter((student) =>
            `${student.name} ${student.studentId}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const totalA = calculateTotalPoints(a.events);
            const totalB = calculateTotalPoints(b.events);
            if (sortField === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortField === 'points') {
                return sortOrder === 'asc' ? totalA - totalB : totalB - totalA;
            }
            return 0;
        });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">🎓 Quản lý Sinh viên</h2>

            {/* Thanh tìm kiếm và sắp xếp */}
            <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo tên hoặc MSSV..."
                    className="w-full md:w-1/2 px-4 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2 items-center">
                    <select
                        className="px-3 py-2 border rounded-md"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="name">Sắp xếp theo Tên</option>
                        <option value="points">Sắp xếp theo Điểm</option>
                    </select>
                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? '⬆️ Tăng' : '⬇️ Giảm'}
                    </button>
                </div>
            </div>

            {/* Bảng sinh viên */}
            <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Mã SV</th>
                            <th className="px-4 py-3">Họ tên</th>
                            <th className="px-4 py-3 text-center">Tổng điểm</th>
                            <th className="px-4 py-3 text-center">Hoàn thành (%)</th>
                            <th className="px-4 py-3 text-center">Xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => {
                            const totalPoints = calculateTotalPoints(student.events);
                            const percent = Math.min((totalPoints / MAX_POINTS) * 100, 100);
                            return (
                                <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-medium">{student.studentId}</td>
                                    <td className="px-4 py-3">{student.name}</td>
                                    <td className="px-4 py-3 text-center">{totalPoints} / {MAX_POINTS}đ</td>
                                    <td className="px-4 py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div
                                                className="bg-blue-600 h-4 rounded-full text-white text-xs text-center"
                                                style={{ width: `${percent}%` }}
                                            >
                                                {Math.round(percent)}%
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            className="text-blue-600 underline text-sm"
                                            onClick={() => setSelectedStudent(student)}
                                        >
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredStudents.length === 0 && (
                    <div className="text-center text-gray-500 italic py-4">
                        Không tìm thấy sinh viên nào.
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-lg shadow-lg p-6 relative">
                        <h3 className="text-xl font-bold mb-4 text-blue-700">
                            🎯 Sự kiện của {selectedStudent.name}
                        </h3>

                        {selectedStudent.events.length > 0 ? (
                            <ul className="space-y-3 max-h-80 overflow-y-auto">
                                {selectedStudent.events.map((event, idx) => (
                                    <li
                                        key={idx}
                                        className="border border-gray-200 p-3 rounded-md shadow-sm"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{event.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    Điểm rèn luyện: <strong>+{event.points}đ</strong>
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${criteriaColors[event.criteria]}`}
                                            >
                                                Tiêu chí {event.criteria}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">Chưa tham gia sự kiện nào</p>
                        )}

                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm">
                                <strong>Tổng điểm:</strong>{' '}
                                {calculateTotalPoints(selectedStudent.events)} / {MAX_POINTS}đ
                            </div>
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
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
