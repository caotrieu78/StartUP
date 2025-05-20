import React from 'react';
import { Link } from 'react-router-dom';  // Import Link từ react-router-dom để điều hướng

const EventDetail = () => {
    return (
        <div className="event-detail">
            <h1>[CHÍNH THỨC RA MẮT HIU CINEMA]</h1>
            <p className="event-description">
                Ngày 27/11/2020 vừa qua, tại Hội trường Beethoven, Đoàn Trường Đại học Quốc tế Hồng Bàng chính thức ra mắt dự án Rạp chiếu phim miễn phí - HIU Cinema.
            </p>
            <p className="event-description">
                Vậy là từ nay HIUers sẽ có sân chơi mới, được xem những bộ phim hấp dẫn không cần ra rạp, xem ngay tại trường rồi - VÉ MIỄN PHÍ NHÉ! ❤️❤️❤️
            </p>
            <h3>Thông tin sự kiện</h3>
            <ul className="event-info">
                <li><strong>Ngày tổ chức:</strong> 27/11/2020</li>
                <li><strong>Thời gian:</strong> 18:30, 14:00, 17:00</li>
                <li><strong>Địa điểm:</strong> Hội trường Beethoven, Trường Đại học Quốc tế Hồng Bàng</li>
                <li><strong>Chi tiết:</strong> Cập nhật thông tin trên Fanpage HIU Cinema</li>
            </ul>
            {/* Lịch chiếu */}
            <div className="event-schedule">
                <h4>Lịch chiếu:</h4>
                <ul>
                    <li>Thứ 6: 18:30</li>
                    <li>Thứ 7: 14:00 và 17:00</li>
                    <li>Chủ nhật: 09:00</li>
                </ul>
            </div>

            {/* Thông tin liên hệ */}
            <div className="contact-info">
                <p><strong>Fanpage:</strong> <a href="https://bit.ly/3o3zllo" target="_blank" rel="noopener noreferrer">HIU Cinema</a></p>
            </div>

            {/* Hình ảnh sự kiện */}
            <div className="event-images">
                <img src="/img/event-image1.jpg" alt="Event 1" />
                <img src="/img/event-image2.jpg" alt="Event 2" />
                <img src="/img/event-image3.jpg" alt="Event 3" />
            </div>

            {/* Nút đặt vé */}
            <div className="ticket-booking">
                <Link to="/seat-selection" className="book-ticket-btn">Đặt vé</Link>
            </div>
        </div>
    );
}

export default EventDetail;
