import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const SeatSelection = () => {
    const [step, setStep] = useState(1);
    const [layoutData, setLayoutData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        fetch('/room.json')
            .then((res) => res.json())
            .then((data) => setLayoutData(data))
            .catch((err) => console.error('Không thể tải sơ đồ:', err));
    }, []);

    const handleSelectSeat = (id) => {
        setSelectedSeats((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const handleConfirm = () => {
        alert(`✅ Đặt vé thành công!\n\nHọ tên: ${formData.name}\nEmail: ${formData.email}\nSĐT: ${formData.phone}\nGhế: ${selectedSeats.join(', ')}`);
        setStep(1);
        setSelectedSeats([]);
        setFormData({ name: '', email: '', phone: '' });
    };

    const handleNext = () => {
        if (step === 1 && selectedSeats.length === 0) {
            alert('Vui lòng chọn ít nhất một ghế!');
            return;
        }
        if (step === 2 && (!formData.name || !formData.email || !formData.phone)) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    if (!layoutData) return <div className="p-10 text-center">Đang tải sơ đồ phòng...</div>;

    const { elements, cols, backgroundColor } = layoutData;

    return (
        <div className="seat-selection w-full min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
            {/* CSS để ẩn nút resize chỉ trong trang này */}
            <style>
                {`
                .seat-selection .react-resizable-handle {
                    display: none !important;
                }
                `}
            </style>

            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 text-center">
                {step === 1 && '🪑 Chọn ghế của bạn'}
                {step === 2 && '📝 Nhập thông tin đặt vé'}
                {step === 3 && '✅ Xác nhận đặt vé'}
            </h2>

            {/* Bước 1: Chọn ghế */}
            {step === 1 && (
                <div
                    className="flex-1 overflow-auto border p-4 rounded-lg shadow bg-white w-full mb-6"
                    style={{ backgroundColor, height: 'calc(100vh - 250px)' }}
                >
                    <GridLayout
                        layout={elements.map((el) => ({
                            ...el,
                            w: el.w || 1,
                            h: el.h || 1,
                        }))}
                        cols={cols}
                        rowHeight={60}
                        width={cols * 60}
                        isDraggable={false}
                        isResizable={false}
                        preventCollision
                        compactType={null}
                    >
                        {elements.map((el) => (
                            <div
                                key={el.i}
                                onClick={() => el.type === 'chair' && handleSelectSeat(el.i)}
                                className={`cursor-pointer flex items-center justify-center font-bold relative ${el.type === 'chair' ? 'hover:scale-105 transition-transform' : ''
                                    }`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: selectedSeats.includes(el.i)
                                        ? '#10b981'
                                        : el.color,
                                    borderRadius: el.shape === 'circle' ? '50%' : '0',
                                    transform: el.shape === 'diamond' ? 'rotate(45deg)' : 'none',
                                    color: el.type === 'chair' ? 'white' : 'black',
                                    fontSize: 14,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        transform: el.shape === 'diamond' ? 'rotate(-45deg)' : 'none',
                                        width: '100%',
                                        textAlign: 'center',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {el.label}
                                </div>
                            </div>
                        ))}
                    </GridLayout>
                </div>
            )}

            {/* Bước 2: Nhập thông tin */}
            {step === 2 && (
                <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mb-6">
                    <label className="block mb-2 font-medium">Họ tên:</label>
                    <input
                        type="text"
                        className="w-full mb-4 p-2 border rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label className="block mb-2 font-medium">Email:</label>
                    <input
                        type="email"
                        className="w-full mb-4 p-2 border rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label className="block mb-2 font-medium">Số điện thoại:</label>
                    <input
                        type="text"
                        className="w-full mb-4 p-2 border rounded"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
            )}

            {/* Bước 3: Xác nhận */}
            {step === 3 && (
                <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mb-6 text-left">
                    <p><strong>Họ tên:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Số điện thoại:</strong> {formData.phone}</p>
                    <p><strong>Ghế đã chọn:</strong> {selectedSeats.join(', ')}</p>
                </div>
            )}

            {/* Nút điều hướng */}
            <div className="flex gap-4">
                {step > 1 && (
                    <button
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        onClick={handleBack}
                    >
                        ← Quay lại
                    </button>
                )}
                {step < 3 && (
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={handleNext}
                    >
                        Tiếp tục →
                    </button>
                )}
                {step === 3 && (
                    <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        onClick={handleConfirm}
                    >
                        Xác nhận đặt vé
                    </button>
                )}
            </div>
        </div>
    );
};

export default SeatSelection;
