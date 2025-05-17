import React from 'react';

const StudentDashboard = () => {
    const studentInfo = {
        name: 'Nguyễn Văn A',
        studentId: 'HB123456',
        email: 'vana@student.hbu.edu.vn',
        phone: '0123 456 789',
        class: 'DHKTPM17A',
        faculty: 'Công nghệ thông tin',
        avatar: '/img/avatar.png',
        totalPoints: 35,
        totalDuration: '7h20',
        totalEvents: 3,
    };

    const history = [
        {
            name: 'Hội thảo khởi nghiệp 2025',
            date: '12/06/2025',
            status: 'Đã tham gia',
            points: 10,
            duration: '2h30',
        },
        {
            name: 'Kỹ năng giao tiếp',
            date: '15/06/2025',
            status: 'Chưa tham gia',
            points: 0,
            duration: '0h',
        },
        {
            name: 'Kỹ năng làm việc nhóm',
            date: '20/06/2025',
            status: 'Đã tham gia',
            points: 25,
            duration: '4h50',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Thông tin sinh viên */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                        src={studentInfo.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{studentInfo.name}</h2>
                        <p className="text-sm text-gray-600">MSSV: <strong>{studentInfo.studentId}</strong></p>
                        <p className="text-sm text-gray-600">Lớp: {studentInfo.class}</p>
                        <p className="text-sm text-gray-600">Khoa: {studentInfo.faculty}</p>
                        <p className="text-sm text-gray-600">Email: {studentInfo.email}</p>
                        <p className="text-sm text-gray-600">SĐT: {studentInfo.phone}</p>
                    </div>
                </div>

                {/* Thống kê tổng quan */}
                <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-6 mt-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{studentInfo.totalPoints}</p>
                        <p className="text-sm text-gray-700">Điểm rèn luyện</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{studentInfo.totalDuration}</p>
                        <p className="text-sm text-gray-700">Tổng thời gian</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{studentInfo.totalEvents}</p>
                        <p className="text-sm text-gray-700">Sự kiện đã tham gia</p>
                    </div>
                </div>
            </div>

            {/* Lịch sử sự kiện */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-3">Sự kiện</th>
                            <th className="px-4 py-3">Ngày</th>
                            <th className="px-4 py-3">Trạng thái</th>
                            <th className="px-4 py-3">Điểm</th>
                            <th className="px-4 py-3">Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((e, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-4 py-3">{e.name}</td>
                                <td className="px-4 py-3">{e.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full font-medium ${e.status === 'Đã tham gia'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {e.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-semibold">{e.points}</td>
                                <td className="px-4 py-3">{e.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDashboard;
