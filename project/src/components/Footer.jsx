import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p className="text-sm text-center md:text-left">
                    &copy; 2025 Hệ thống quản lý sự kiện. Tất cả các quyền được bảo lưu.
                </p>

                <div className="flex space-x-6 text-sm">
                    <a
                        href="#"
                        className="hover:text-white transition duration-200"
                    >
                        Điều khoản sử dụng
                    </a>
                    <a
                        href="#"
                        className="hover:text-white transition duration-200"
                    >
                        Chính sách bảo mật
                    </a>
                    <a
                        href="#"
                        className="hover:text-white transition duration-200"
                    >
                        Hỗ trợ
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
