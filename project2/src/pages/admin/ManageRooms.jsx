import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { ArrowLeft } from 'lucide-react';

const ManageRooms = () => {
    const [roomName, setRoomName] = useState('');
    const [cols, setCols] = useState(25);
    const [rows, setRows] = useState(20);
    const [backgroundColor, setBackgroundColor] = useState('#f4f4f4');
    const [elements, setElements] = useState([]);
    const [customId, setCustomId] = useState(1);
    const [chairCount, setChairCount] = useState(1);
    const [customName, setCustomName] = useState('');
    const [customWidth, setCustomWidth] = useState(1);
    const [customHeight, setCustomHeight] = useState(1);
    const [customColor, setCustomColor] = useState('#636e72');
    const [customShape, setCustomShape] = useState('square');
    const [customCount, setCustomCount] = useState(1);

    const [arrowDirection, setArrowDirection] = useState('left');
    const [arrowLabel, setArrowLabel] = useState('Lối vào');

    const addChairs = (count) => {
        const existingIds = elements
            .filter(el => el.type === 'chair')
            .map(el => parseInt(el.label.replace('C', '')))
            .filter(n => !isNaN(n));

        const newChairs = [];
        let currentX = 0;
        let currentY = 0;

        let nextId = 1;
        const getNextAvailableId = () => {
            while (existingIds.includes(nextId)) {
                nextId++;
            }
            existingIds.push(nextId);
            return nextId;
        };

        for (let i = 0; i < count; i++) {
            const id = getNextAvailableId();
            const chairCode = `C${id}`;
            const chair = {
                i: `chair-${id}`,
                type: 'chair',
                label: chairCode,
                x: currentX,
                y: currentY,
                w: 1,
                h: 1,
                color: '#3498db',
                shape: 'square',
            };

            newChairs.push(chair);
            currentX++;
            if (currentX >= cols) {
                currentX = 0;
                currentY++;
            }
        }

        setElements([...elements, ...newChairs]);
    };

    const addCustomElement = () => {
        if (!customName || customWidth <= 0 || customHeight <= 0 || customCount <= 0) return;

        const newCustoms = [];
        for (let i = 0; i < customCount; i++) {
            const id = `custom-${customId + i}`;
            const custom = {
                i: id,
                type: 'custom',
                label: `${customName} ${customId + i}`,
                x: 0,
                y: Infinity,
                w: customWidth,
                h: customHeight,
                color: customColor,
                shape: customShape,
            };
            newCustoms.push(custom);
        }

        setElements([...elements, ...newCustoms]);
        setCustomId(customId + customCount);
        setCustomName('');
        setCustomWidth(1);
        setCustomHeight(1);
        setCustomColor('#636e72');
        setCustomCount(1);
    };

    const addArrow = () => {
        const id = `arrow-${Date.now()}`;
        const arrowElement = {
            i: id,
            type: 'arrow',
            label: arrowLabel,
            x: 0,
            y: Infinity,
            w: 2,
            h: 1,
            color: 'transparent',
            shape: 'arrow',
            direction: arrowDirection,
        };
        setElements([...elements, arrowElement]);
    };

    const handleLayoutChange = (layout) => {
        const updated = layout.map((item) => {
            const el = elements.find((e) => e.i === item.i);
            return { ...el, ...item };
        });
        setElements(updated);
    };

    const handleDelete = (id) => {
        setElements(elements.filter((e) => e.i !== id));
    };

    const handleSaveRoom = () => {
        const data = {
            roomName,
            cols,
            rows,
            backgroundColor,
            elements,
        };
        console.log('Room saved:', data);
        alert(`Phòng "${roomName}" đã được lưu!`);
    };

    const handleExportJSON = () => {
        const data = {
            roomName,
            cols,
            rows,
            backgroundColor,
            elements,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${roomName || 'room'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportJSON = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                setRoomName(data.roomName || '');
                setCols(data.cols || 25);
                setRows(data.rows || 20);
                setBackgroundColor(data.backgroundColor || '#f4f4f4');
                setElements(data.elements || []);

                const maxCustom = data.elements?.filter(el => el.type === 'custom')
                    .map(el => parseInt(el.i?.replace('custom-', '')))
                    .filter(n => !isNaN(n));

                setCustomId(maxCustom.length ? Math.max(...maxCustom) + 1 : 1);
            } catch (err) {
                alert('Tệp JSON không hợp lệ!');
            }
        };
        reader.readAsText(file);
    };

    const getArrowRotation = (direction) => {
        switch (direction) {
            case 'up': return '-90deg';
            case 'down': return '90deg';
            case 'right': return '180deg';
            case 'left':
            default:
                return '0deg';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">🏫 Quản lý Phòng học</h2>

            <div className="bg-white shadow rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Tên phòng" className="border px-4 py-2 rounded w-full" />
                    <input type="number" min={4} max={50} value={cols} onChange={(e) => setCols(Number(e.target.value))} placeholder="Cột" className="border px-4 py-2 rounded w-full" />
                    <input type="number" min={4} max={50} value={rows} onChange={(e) => setRows(Number(e.target.value))} placeholder="Hàng" className="border px-4 py-2 rounded w-full" />
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Nền:</label>
                        <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-10 h-8 border" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 items-center mb-4">
                    <input type="number" min={1} value={chairCount} onChange={(e) => setChairCount(Number(e.target.value))} className="w-20 px-2 py-1 border rounded" />
                    <button onClick={() => addChairs(chairCount)} className="bg-blue-600 text-white px-4 py-2 rounded">+ Ghế</button>

                    <input type="text" value={arrowLabel} onChange={(e) => setArrowLabel(e.target.value)} placeholder="Văn bản mũi tên" className="border px-2 py-1 rounded w-40" />
                    <select value={arrowDirection} onChange={(e) => setArrowDirection(e.target.value)} className="border px-2 py-1 rounded">
                        <option value="left">⬅ Trái</option>
                        <option value="right">➡ Phải</option>
                        <option value="up">⬆ Trên</option>
                        <option value="down">⬇ Dưới</option>
                    </select>
                    <button onClick={addArrow} className="bg-black text-white px-4 py-2 rounded">➕ Thêm mũi tên</button>

                    <button onClick={handleSaveRoom} className="bg-green-600 text-white px-4 py-2 rounded">💾 Lưu phòng học</button>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" id="jsonUpload" />
                    <label htmlFor="jsonUpload" className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer">📂 Tải sơ đồ</label>
                    <button onClick={handleExportJSON} className="bg-purple-600 text-white px-4 py-2 rounded">⬇️ Lưu JSON</button>
                </div>

                <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">➕ Tạo vật dụng tuỳ chỉnh</h4>
                    <div className="flex flex-wrap gap-2 items-center">
                        <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Tên vật dụng" className="border px-2 py-1 rounded" />
                        <input type="number" min={1} value={customCount} onChange={(e) => setCustomCount(Number(e.target.value))} placeholder="Số lượng" className="border px-2 py-1 rounded w-20" />
                        <input type="number" min={1} value={customWidth} onChange={(e) => setCustomWidth(Number(e.target.value))} placeholder="Chiều rộng (cột)" className="border px-2 py-1 rounded w-28" />
                        <input type="number" min={1} value={customHeight} onChange={(e) => setCustomHeight(Number(e.target.value))} placeholder="Chiều dài (hàng)" className="border px-2 py-1 rounded w-28" />
                        <select value={customShape} onChange={(e) => setCustomShape(e.target.value)} className="border px-2 py-1 rounded">
                            <option value="square">Hình vuông</option>
                            <option value="circle">Hình tròn</option>
                            <option value="diamond">Hình thoi</option>
                        </select>
                        <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-10 h-8 border" />
                        <button onClick={addCustomElement} className="bg-indigo-600 text-white px-4 py-2 rounded">Thêm vật dụng</button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
                <h3 className="text-lg font-semibold mb-2">
                    🪑 Bố trí ghế trong phòng: <span className="text-blue-600">{roomName || '(chưa đặt tên)'}</span>
                </h3>
                <div className="overflow-auto border p-4 rounded-md grid-bg" style={{ backgroundColor, height: '1000px' }}>
                    <GridLayout
                        layout={elements.map((el) => ({
                            ...el,
                            isResizable: el.type !== 'chair',
                        }))}
                        cols={cols}
                        rowHeight={60}
                        width={cols * 60}
                        onLayoutChange={handleLayoutChange}
                        isDraggable
                        preventCollision
                        compactType={null}
                    >
                        {elements.map((el) => (
                            <div
                                key={el.i}
                                className="shadow text-white font-bold flex items-center justify-center relative"
                                style={{
                                    backgroundColor: el.type === 'arrow' ? 'transparent' : el.color,
                                    fontSize: 16,
                                    borderRadius: el.shape === 'circle' ? '50%' : '0',
                                    transform: el.shape === 'diamond' ? 'rotate(45deg)' : 'none',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'normal',
                                    wordBreak: 'break-word',
                                    padding: 4,
                                    textAlign: 'center'
                                }}
                            >
                                {el.type === 'arrow' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                        <ArrowLeft
                                            size={32}
                                            stroke="black"
                                            style={{ transform: `rotate(${getArrowRotation(el.direction)})` }}
                                        />
                                        <span className="text-black font-semibold text-center">{el.label}</span>
                                    </div>
                                ) : (
                                    <div style={{ transform: el.shape === 'diamond' ? 'rotate(-45deg)' : 'none', width: '100%' }}>
                                        {el.label || el.i}
                                    </div>
                                )}
                                <button onClick={() => handleDelete(el.i)} className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl">✖</button>
                            </div>
                        ))}
                    </GridLayout>
                </div>
            </div>
        </div>
    );
};

export default ManageRooms;
