import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import Tilt from "react-parallax-tilt";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminReport = () => {
    const [timeRange, setTimeRange] = useState("all");
    const [highlightedStat, setHighlightedStat] = useState(null);

    // Simulated data (replace with real data from ManageEvents.jsx and ManageStudents.jsx)
    const rawData = useMemo(
        () => ({
            events: [
                {
                    id: 1,
                    title: "Hội thảo AI 2025",
                    date: "2025-06-20",
                    status: "Sắp diễn ra",
                    participants: 120
                },
                {
                    id: 2,
                    title: "Lễ hội Công nghệ 2025",
                    date: "2025-07-15",
                    status: "Sắp diễn ra",
                    participants: 500
                },
                {
                    id: 3,
                    title: "Hội nghị Blockchain",
                    date: "2025-08-10",
                    status: "Đang diễn ra",
                    participants: 200
                },
                {
                    id: 4,
                    title: "Seminar Lập trình AI",
                    date: "2025-09-05",
                    status: "Đã diễn ra",
                    participants: 80
                }
            ],
            students: [
                {
                    id: 1,
                    name: "Nguyễn Văn A",
                    events: [{ points: 10 }, { points: 15 }, { points: 20 }]
                },
                { id: 2, name: "Trần Thị B", events: [{ points: 10 }, { points: 25 }] },
                { id: 3, name: "Lê Văn C", events: [] },
                { id: 4, name: "Phạm Thị D", events: [{ points: 15 }, { points: 8 }] }
            ]
        }),
        []
    );

    // Filter data by time range
    const filteredData = useMemo(() => {
        const now = new Date();
        let events = rawData.events;
        if (timeRange !== "all") {
            const days = timeRange === "30days" ? 30 : 7;
            const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
            events = events.filter((e) => new Date(e.date) >= cutoff);
        }
        return {
            events,
            students: rawData.students
        };
    }, [rawData, timeRange]);

    // Calculate statistics
    const stats = useMemo(() => {
        const totalEvents = filteredData.events.length;
        const upcomingEvents = filteredData.events.filter(
            (e) => e.status === "Sắp diễn ra"
        ).length;
        const totalStudents = filteredData.students.length;
        const noEventsStudents = filteredData.students.filter(
            (s) => s.events.length === 0
        ).length;
        const totalParticipants = filteredData.events.reduce(
            (sum, e) => sum + e.participants,
            0
        );
        const averagePoints = filteredData.students.length
            ? (
                filteredData.students.reduce(
                    (sum, s) => sum + s.events.reduce((p, e) => p + e.points, 0),
                    0
                ) / filteredData.students.length
            ).toFixed(1)
            : 0;

        return [
            {
                id: uuidv4(),
                title: "Tổng sự kiện",
                value: totalEvents,
                icon: "📅",
                color: "from-blue-600 to-blue-900"
            },
            {
                id: uuidv4(),
                title: "Sắp diễn ra",
                value: upcomingEvents,
                icon: "⏰",
                color: "from-yellow-600 to-yellow-900"
            },
            {
                id: uuidv4(),
                title: "Tổng sinh viên",
                value: totalStudents,
                icon: "👩‍🎓",
                color: "from-green-600 to-green-900"
            },
            {
                id: uuidv4(),
                title: "Không tham gia",
                value: noEventsStudents,
                icon: "🚫",
                color: "from-red-600 to-red-900"
            },
            {
                id: uuidv4(),
                title: "Tổng người tham gia",
                value: totalParticipants,
                icon: "👥",
                color: "from-purple-600 to-purple-900"
            },
            {
                id: uuidv4(),
                title: "Điểm trung bình",
                value: averagePoints,
                icon: "⭐",
                color: "from-orange-600 to-orange-900"
            }
        ];
    }, [filteredData]);

    // Chart data
    const eventChartData = {
        labels: ["Sắp diễn ra", "Đang diễn ra", "Đã diễn ra"],
        datasets: [
            {
                label: "Số sự kiện",
                data: [
                    filteredData.events.filter((e) => e.status === "Sắp diễn ra").length,
                    filteredData.events.filter((e) => e.status === "Đang diễn ra").length,
                    filteredData.events.filter((e) => e.status === "Đã diễn ra").length
                ],
                backgroundColor: ["#FBBF24", "#10B981", "#6B7280"],
                borderColor: ["#F59E0B", "#059669", "#4B5563"],
                borderWidth: 1
            }
        ]
    };

    const studentChartData = {
        labels: ["Có sự kiện", "Không có sự kiện"],
        datasets: [
            {
                data: [
                    filteredData.students.filter((s) => s.events.length > 0).length,
                    filteredData.students.filter((s) => s.events.length === 0).length
                ],
                backgroundColor: ["#3B82F6", "#EF4444"],
                borderColor: ["#2563EB", "#DC2626"],
                borderWidth: 1
            }
        ]
    };

    // Export functions
    const handleCopyToClipboard = () => {
        const jsonData = JSON.stringify(
            stats.map((item) => ({ title: item.title, value: item.value })),
            null,
            2
        );
        navigator.clipboard.writeText(jsonData);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        alert("Dữ liệu thống kê đã được sao chép vào clipboard!");
    };

    const handleExportExcel = () => {
        const exportData = stats.map((item) => ({
            Tiêu_đề: item.title,
            Giá_trị: item.value
        }));
        const ws = utils.json_to_sheet(exportData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Báo cáo");
        writeFile(wb, "BaoCaoThongKe.xlsx");
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Báo cáo Thống kê", 10, 10);
        doc.setFontSize(12);
        stats.forEach((item, idx) => {
            doc.text(`${item.title}: ${item.value}`, 10, 20 + idx * 10);
        });
        doc.save("BaoCaoThongKe.pdf");
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    };

    const handlePrint = () => {
        window.print();
    };

    // Highlight stat card
    const handleHighlightStat = (id) => {
        setHighlightedStat(id === highlightedStat ? null : id);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen font-sans relative overflow-hidden">
            {/* Animated Particle Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 animate-bounce relative z-10">
                <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-800">
                    📊 Báo cáo Thống kê
                </h2>
                <div className="flex gap-4 flex-wrap">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-3 border rounded-lg focus:ring-4 focus:ring-purple-500 bg-white shadow-lg text-gray-800"
                    >
                        <option value="all">Tất cả thời gian</option>
                        <option value="30days">30 ngày qua</option>
                        <option value="7days">7 ngày qua</option>
                    </select>
                    <button
                        onClick={handleCopyToClipboard}
                        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 animate-glow-button"
                    >
                        📋 Sao chép JSON
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 animate-glow-button"
                    >
                        📊 Xuất Excel
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 animate-glow-button"
                    >
                        📄 Xuất PDF
                    </button>
                    <button
                        onClick={handlePrint}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 animate-glow-button"
                    >
                        🖨️ In báo cáo
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
                {stats.map((item) => (
                    <Tilt
                        key={item.id}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        perspective={1000}
                        scale={1.05}
                    >
                        <div
                            onClick={() => handleHighlightStat(item.id)}
                            className={`relative bg-gradient-to-r ${item.color
                                } p-6 rounded-2xl shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer
                                ${highlightedStat === item.id
                                    ? "ring-4 ring-yellow-400 animate-glow"
                                    : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-5xl">{item.icon}</span>
                                <div>
                                    <h4 className="text-lg text-white font-semibold opacity-90">
                                        {item.title}
                                    </h4>
                                    <p className="text-4xl font-extrabold text-white">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Tilt>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 relative z-10">
                {/* Event Status Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-2xl animate-chart-in">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        📈 Trạng thái sự kiện
                    </h3>
                    <div className="h-80">
                        <Bar
                            data={eventChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: "top", labels: { font: { size: 14 } } },
                                    title: {
                                        display: true,
                                        text: "Phân bố trạng thái sự kiện",
                                        font: { size: 18 }
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: { display: true, text: "Số sự kiện" }
                                    },
                                    x: { title: { display: true, text: "Trạng thái" } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Student Participation Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-2xl animate-chart-in">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        🥧 Tham gia sự kiện
                    </h3>
                    <div className="h-80">
                        <Pie
                            data={studentChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: "top", labels: { font: { size: 14 } } },
                                    title: {
                                        display: true,
                                        text: "Tỷ lệ sinh viên tham gia",
                                        font: { size: 18 }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Print-Friendly Section (Hidden in Normal View) */}
            <div className="hidden print:block bg-white p-6 rounded-2xl shadow-2xl relative z-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Báo cáo Thống kê
                </h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Tiêu đề</th>
                            <th className="p-2">Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-2">{item.title}</td>
                                <td className="p-2">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CSS for Particle Background and Glow Buttons */}
            <style>
                {`
                    .particle {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        animation: float 15s infinite;
                    }
                    .particle-1 { width: 20px; height: 20px; top: 10%; left: 20%; animation-delay: 0s; }
                    .particle-2 { width: 15px; height: 15px; top: 50%; left: 70%; animation-delay: 5s; }
                    .particle-3 { width: 25px; height: 25px; top: 80%; left: 40%; animation-delay: 10s; }
                    @keyframes float {
                        0% { transform: translateY(0) translateX(0); opacity: 0.3; }
                        50% { transform: translateY(-100px) translateX(50px); opacity: 0.5; }
                        100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    }
                    .animate-glow-button {
                        animation: glowButton 1.5s ease-in-out infinite;
                    }
                    @keyframes glowButton {
                        0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
                        50% { box-shadow: 0 0 20px rgba(255, 255, 255, 1); }
                    }
                    .animate-chart-in {
                        animation: chartIn 0.8s ease-out;
                    }
                    @keyframes chartIn {
                        0% { opacity: 0; transform: scale(0.95); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                `}
            </style>
        </div>
    );
};

export default AdminReport;
