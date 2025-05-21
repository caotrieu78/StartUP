import React, { useEffect, useRef, useState } from "react";
import Flickity from "flickity";
import "flickity/dist/flickity.min.css";
import events from "../constant/eventData";

// Fallback image
const FALLBACK_IMAGE =
    "https://via.placeholder.com/1200x600?text=Sự+kiện+UniFlow";

// Tùy chỉnh style Flickity
const flickityStyles = `
  .flickity-prev-next-button {
    @apply bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition duration-300 w-10 h-10 shadow-lg;
  }
  .flickity-prev-next-button:disabled {
    @apply bg-gray-300 cursor-not-allowed;
  }
  .flickity-page-dots {
    @apply bottom-6;
  }
  .flickity-page-dots .dot {
    @apply w-2 h-2 bg-white opacity-70 rounded-full mx-1;
  }
  .flickity-page-dots .dot.is-selected {
    @apply opacity-100 bg-red-500 w-3 h-3;
  }
`;

const Banner = () => {
    const carouselRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const flkty = new Flickity(carouselRef.current, {
            cellAlign: "center",
            contain: true,
            prevNextButtons: true,
            pageDots: true,
            autoPlay: 3000,
            wrapAround: true,
            lazyLoad: 1
        });

        const updateCountdown = () => {
            const now = new Date("2025-05-17T14:59:00+07:00"); // Thời gian hiện tại
            const updatedTimeLeft = events.reduce((acc, event) => {
                const eventDate = new Date(event.date);
                const diff = eventDate - now;
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    acc[event.id] = { days, hours, minutes, seconds };
                } else {
                    acc[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
                return acc;
            }, {});
            setTimeLeft(updatedTimeLeft);
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000); // Cập nhật mỗi giây
        return () => {
            flkty.destroy();
            clearInterval(timer);
        };
    }, []);

    const banners = events.filter((e) => e.type === "custom" && e.image);

    if (!banners.length) {
        return (
            <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100">
                <p className="text-gray-600 text-xl font-semibold">
                    Chưa có sự kiện để hiển thị!
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-[70vh] max-h-[600px] overflow-hidden relative font-poppins bg-gray-100">
            {/* Font Google */}
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            {/* Flickity styles */}
            <style>{flickityStyles}</style>
            <div className="w-full h-full" ref={carouselRef}>
                {banners.map((event, index) => {
                    const countdown = timeLeft[event.id] || {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };
                    return (
                        <div
                            key={event.id || index}
                            className="carousel-cell w-full h-full"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Ảnh nền */}
                                <div className="w-full max-w-[1200px] h-[80%] mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-red-600">
                                    <img
                                        src={event.image || FALLBACK_IMAGE}
                                        alt={event.title}
                                        className="w-full h-full object-contain bg-gray-200 transform transition-transform duration-1000"
                                        style={{ transform: `translateY(${index * 10}px)` }}
                                        onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                                    />
                                </div>

                                {/* Lớp mờ với gradient đỏ-đen */}
                                <div className="absolute inset-0 bg-gradient-to-t from-red-600/70 via-black/50 to-transparent flex items-center justify-center px-4 sm:px-6 text-center">
                                    {/* Nội dung */}
                                    <div className="flex flex-col items-center space-y-3 hover:scale-105 transition duration-300">
                                        {/* Tiêu đề */}
                                        <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-2xl mb-1 animate-fade-in">
                                            {event.title}
                                        </h2>
                                        {/* Thông tin sự kiện */}
                                        <p className="text-white text-sm sm:text-base mb-1 max-w-md">
                                            {event.time} | {event.location}
                                        </p>
                                        {/* Đếm ngược với hiệu ứng */}
                                        <div className="text-white text-sm sm:text-base flex space-x-2 bg-black/70 rounded-lg px-4 py-2">
                                            <span className="countdown animate-countdown">
                                                {countdown.days}
                                            </span>
                                            d
                                            <span className="countdown animate-countdown">
                                                {countdown.hours}
                                            </span>
                                            h
                                            <span className="countdown animate-countdown">
                                                {countdown.minutes}
                                            </span>
                                            m
                                            <span className="countdown animate-countdown">
                                                {countdown.seconds}
                                            </span>
                                            s
                                        </div>
                                        {/* Mô tả ngắn */}
                                        <p className="text-white text-xs sm:text-sm max-w-md hidden sm:block">
                                            {event.description?.slice(0, 60)}...
                                        </p>
                                        {/* Nút CTA */}
                                        <a
                                            href={`/event/${event.id}`}
                                            className="px-5 py-2 sm:px-6 sm:py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 animate-fade-in delay-100"
                                        >
                                            Đăng ký ngay
                                        </a>
                                        {/* Nút Chia sẻ */}
                                        <button
                                            onClick={() => {
                                                const shareUrl =
                                                    window.location.href + `/event/${event.id}`;
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: event.title,
                                                        text: `Tham gia sự kiện ${event.title} tại ${event.location}!`,
                                                        url: shareUrl
                                                    });
                                                } else {
                                                    alert("Chia sẻ không hỗ trợ. Sao chép: " + shareUrl);
                                                }
                                            }}
                                            className="px-4 py-2 sm:px-5 sm:py-2 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300 animate-fade-in delay-200"
                                        >
                                            Chia sẻ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Banner;
