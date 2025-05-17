import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { v4 as uuidv4 } from 'uuid';

const ManageEvents = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Hội thảo AI 2025',
            date: '2025-06-20',
            participants: 120,
            points: 10,
            status: 'Sắp diễn ra',
            facebook: 'https://facebook.com/event1',
            criteria: 1,
            description: '<p>Sự kiện chuyên sâu về AI.</p>',
            images: [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/160',
            ],
        },
    ]);

    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        participants: '',
        points: '',
        status: 'Sắp diễn ra',
        facebook: '',
        criteria: 1,
        description: '',
        images: [],
    });

    const [imageInput, setImageInput] = useState('');
    const [selectedQR, setSelectedQR] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddImage = () => {
        if (imageInput.trim()) {
            setNewEvent({ ...newEvent, images: [...newEvent.images, imageInput.trim()] });
            setImageInput('');
        }
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        const { title, date, participants, points, facebook } = newEvent;
        if (!title || !date || !participants || !points || !facebook) return;

        setEvents([
            ...events,
            {
                ...newEvent,
                id: uuidv4(),
                participants: parseInt(participants),
                points: parseInt(points),
                criteria: parseInt(newEvent.criteria),
            },
        ]);

        // Reset
        setNewEvent({
            title: '',
            date: '',
            participants: '',
            points: '',
            status: 'Sắp diễn ra',
            facebook: '',
            criteria: 1,
            description: '',
            images: [],
        });

        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá sự kiện này?')) {
            setEvents(events.filter((e) => e.id !== id));
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case 'Sắp diễn ra':
                return 'bg-yellow-100 text-yellow-800';
            case 'Đang diễn ra':
                return 'bg-green-100 text-green-800';
            case 'Đã diễn ra':
                return 'bg-gray-200 text-gray-700';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">📅 Quản lý Sự kiện</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
                >
                    ➕ Thêm sự kiện
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-xl overflow-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-3">Tên sự kiện</th>
                            <th>Ngày</th>
                            <th>Số người</th>
                            <th>Điểm</th>
                            <th>Tiêu chí</th>
                            <th>Trạng thái</th>
                            <th>Facebook</th>
                            <th>QR</th>
                            <th>Xoá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((e) => (
                            <tr key={e.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{e.title}</td>
                                <td className="text-center">{e.date}</td>
                                <td className="text-center">{e.participants}</td>
                                <td className="text-center">{e.points}</td>
                                <td className="text-center">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                        Tiêu chí {e.criteria}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(e.status)}`}>
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
                                    <button onClick={() => setSelectedQR(e)} className="text-blue-500 text-xs hover:underline">
                                        QR
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button onClick={() => handleDelete(e.id)} className="text-red-500 text-xs hover:underline">
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm sự kiện */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-xl relative">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">📝 Thêm sự kiện mới</h3>
                        <form onSubmit={handleAddEvent} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                            <input name="title" value={newEvent.title} onChange={handleChange} placeholder="Tên sự kiện" className="w-full px-4 py-2 border rounded-md" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="date" type="date" value={newEvent.date} onChange={handleChange} className="px-4 py-2 border rounded-md" />
                                <input name="participants" type="number" value={newEvent.participants} onChange={handleChange} placeholder="Số người" className="px-4 py-2 border rounded-md" />
                                <input name="points" type="number" value={newEvent.points} onChange={handleChange} placeholder="Điểm rèn luyện" className="px-4 py-2 border rounded-md" />
                                <input name="facebook" type="url" value={newEvent.facebook} onChange={handleChange} placeholder="Link Facebook sự kiện" className="px-4 py-2 border rounded-md" />
                                <select name="criteria" value={newEvent.criteria} onChange={handleChange} className="px-4 py-2 border rounded-md">
                                    <option value="1">Tiêu chí 1</option>
                                    <option value="2">Tiêu chí 2</option>
                                    <option value="3">Tiêu chí 3</option>
                                    <option value="4">Tiêu chí 4</option>
                                    <option value="5">Tiêu chí 5</option>
                                </select>
                                <select name="status" value={newEvent.status} onChange={handleChange} className="px-4 py-2 border rounded-md">
                                    <option value="Sắp diễn ra">Sắp diễn ra</option>
                                    <option value="Đang diễn ra">Đang diễn ra</option>
                                    <option value="Đã diễn ra">Đã diễn ra</option>
                                </select>
                            </div>

                            <Editor
                                apiKey="your-tinymce-api-key" // Optional, free account available
                                value={newEvent.description}
                                onEditorChange={(content) => setNewEvent({ ...newEvent, description: content })}
                                init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: 'link image lists',
                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
                                }}
                            />

                            {/* Image input list */}
                            <div>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="url"
                                        value={imageInput}
                                        onChange={(e) => setImageInput(e.target.value)}
                                        placeholder="Thêm link hình ảnh"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    <button type="button" onClick={handleAddImage} className="px-4 py-2 bg-green-500 text-white rounded">
                                        + Thêm
                                    </button>
                                </div>
                                {newEvent.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {newEvent.images.map((img, i) => (
                                            <img key={i} src={img} alt={`Ảnh ${i + 1}`} className="w-full h-32 object-cover rounded border" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                    Huỷ
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Thêm sự kiện
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal QR */}
            {selectedQR && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <h4 className="text-lg font-semibold mb-4">Mã QR cho: {selectedQR.title}</h4>
                        <div className="w-40 h-40 mx-auto flex items-center justify-center bg-gray-100 border border-dashed text-gray-400">
                            QR Mô phỏng
                        </div>
                        <button onClick={() => setSelectedQR(null)} className="mt-4 px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400">
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
