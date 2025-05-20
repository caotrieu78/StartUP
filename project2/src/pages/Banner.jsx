import React, { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';
import events from '../constant/eventData';

function Banner() {
    const carouselRef = useRef(null);

    useEffect(() => {
        const flkty = new Flickity(carouselRef.current, {
            cellAlign: 'center',
            contain: true,
            prevNextButtons: true,
            pageDots: true,
            autoPlay: 3000,
            wrapAround: true,
        });

        return () => flkty.destroy();
    }, []);

    const banners = events.filter((e) => e.type === 'custom' && e.image);
    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="carousel w-full h-full" ref={carouselRef}>
                {banners.map((event, index) => (
                    <div key={index} className="carousel-cell w-full h-full">
                        <div className="relative w-full h-full">
                            {/* Ảnh nền full */}
                            <img
                                src={event.image}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Lớp mờ + tiêu đề */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h2 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg px-6">
                                    {event.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Banner;
