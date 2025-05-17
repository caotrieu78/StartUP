import React from 'react';
import { utils, writeFile } from 'xlsx';

const AdminReport = () => {
    const data = [
        { title: 'Tổng phim', value: 12 },
        { title: 'Sự kiện sắp diễn ra', value: 5 },
        { title: 'Tổng sinh viên', value: 320 },
        { title: 'Phòng học đang dùng', value: 8 },
    ];

    const handleExportExcel = () => {
        const exportData = data.map(item => ({
            Tiêu_đề: item.title,
            Giá_trị: item.value
        }));
        const ws = utils.json_to_sheet(exportData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Báo cáo');
        writeFile(wb, 'BaoCaoThongKe.xlsx');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-600">Thống kê & Báo cáo</h2>
                <button
                    onClick={handleExportExcel}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Xuất Excel
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.map((item, index) => (
                    <div key={index} className="bg-white p-4 shadow rounded text-center">
                        <h4 className="text-sm text-gray-500">{item.title}</h4>
                        <p className="text-2xl font-bold text-blue-700">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminReport;
