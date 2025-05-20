import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner';
import events from '../../constant/eventData';

function Home() {
    const [selectedCriteria, setSelectedCriteria] = useState('');
    const [suggestedEvents, setSuggestedEvents] = useState([]);

    const handleCriteriaChange = (e) => {
        const criteria = e.target.value;
        setSelectedCriteria(criteria);

        // Giả lập AI lọc sự kiện theo tiêu chí
        const filtered = events.filter(
            (event) =>
                event.criteria?.toString() === criteria || // tiêu chí nếu có
                event.title.toLowerCase().includes(criteria.toLowerCase())
        );
        setSuggestedEvents(filtered);
    };

    return (
        <>
            <Banner />

            <div className="home px-4 py-10 md:px-12 bg-gray-50 min-h-screen">
                {/* Bộ lọc AI gợi ý */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="bg-white shadow p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-blue-700 mb-2">🔍 AI Gợi ý sự kiện phù hợp với bạn</h3>
                        <select
                            value={selectedCriteria}
                            onChange={handleCriteriaChange}
                            className="border px-4 py-2 rounded w-full md:w-1/2"
                        >
                            <option value="">-- Chọn tiêu chí --</option>
                            <option value="1">Tiêu chí 1: Chính trị tư tưởng</option>
                            <option value="2">Tiêu chí 2: Đạo đức, lối sống</option>
                            <option value="3">Tiêu chí 3: Học tập</option>
                            <option value="4">Tiêu chí 4: Hoạt động xã hội</option>
                            <option value="5">Tiêu chí 5: Khác</option>
                        </select>
                    </div>
                </div>

                {/* Sự kiện sắp tới */}
                <section className="events max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-10">
                        {selectedCriteria ? '🎯 Sự kiện phù hợp' : 'Sự kiện sắp tới'}
                    </h2>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {(selectedCriteria ? suggestedEvents : events).map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
                            >
                                {event.type === 'custom' && (
                                    <>
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                        <h3 className="text-lg font-semibold text-blue-700 mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 flex-grow">
                                            {event.description}{' '}
                                            <a
                                                href={event.readMoreUrl}
                                                className="text-red-500 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Read More…
                                            </a>
                                        </p>
                                    </>
                                )}

                                <div className="mt-4 text-center">
                                    <Link
                                        to="/seat-selection"
                                        className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                                    >
                                        Đặt vé tham gia
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
