const events = [
    {
        id: 1,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2023/02/z4079030922121_5c7c9db54a32aeca0315e93b99e23e2e-1-2-2-870x285.jpg',
        title: 'CUỘC THI TÌM HIỂU 93 NĂM LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM (03/02/1930 – 03/02/2023) – CHỦ ĐỀ: “SẮT SON NIỀM TIN VỚI ĐẢNG”',
        description: 'Chào mừng kỷ niệm 93 năm Ngày thành lập Đảng Cộng sản Việt Nam (03/02/1930–03/02/2023), đồng thời nâng cao nhận thức, củng cố niềm tin của Đoàn viên thanh niên; qua đó, vận dụng Nghị quyết của Đảng vào từng vị trí công tác, học tập một cách hiệu quả.',
        readMoreUrl: '#'
    },
    {
        id: 2,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2023/03/DSC03048-800x285.jpg',
        title: 'Sinh viên HIU hào hứng giao lưu cùng các sếp',
        description:
            '“Cơ hội cho ai – Whose chance?” một chương trình truyền hình thực tế về việc làm được yêu thích tại Việt Nam đã mang các “Sếp lớn” về với trường Đại học Quốc tế Hồng Bàng, trong chương trình “GEN Z hỏi, các Sếp trả lời” với khách mời...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/sinh-vien-hiu-hao-hung-giao-luu-cung-cac-sep/'
    },
    {
        id: 3,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2022/12/thumnail-800x285.jpg',
        title: 'Chương trình Hội nghị Khoa học – Công nghệ HIU mở rộng',
        description:
            'Nằm trong chuỗi các sự kiện chào mừng kỷ niệm 25 năm xây dựng và phát triển Trường Đại học Quốc tế Hồng Bàng (HIU), ngày 16/12/2022 nhà trường tổ chức Hội nghị Khoa học – Công nghệ mở rộng với hơn 130 phần báo cáo khoa học lĩnh vực...',
        readMoreUrl: 'https://hiu.vn/hiu-student-center/chuong-trinh-hoi-nghi-khoa-hoc-cong-nghe-hiu-mo-rong/'
    },
    {
        id: 4,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2025/05/thum-ngay-hoi-quoc-te-dieu-duong-hiu-2025-800x285.jpg',
        title: 'Ngày Quốc tế Điều dưỡng 2025: Sinh viên HIU tiếp lửa Florence Nightingale',
        description:
            'Sáng ngày 12/5, Trường Đại học Quốc tế Hồng Bàng (HIU) đã tổ chức Lễ kỷ niệm 60 năm Ngày Quốc tế Điều dưỡng 12/5 (12/5/1965 – 12/5/2025) tại hội trường Beethoven, nhằm tri ân và tôn vinh những đóng góp thầm lặng mà to lớn của đội ngũ điều...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/ngay-quoc-te-dieu-duong-2025-sinh-vien-hiu-tiep-lua-florence-nightingale/'
    },
    {
        id: 5,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/12/2-870x285.jpg',
        title: 'CHÚC MỪNG VÒNG CHUNG KẾT OLYMPIC TIẾNG ANH 2024 ĐÃ THÀNH CÔNG RỰC RỠ!',
        description:
            '🎉 CHÚC MỪNG VÒNG CHUNG KẾT OLYMPIC TIẾNG ANH 2024 ĐÃ THÀNH CÔNG RỰC RỠ! 🎉 Hôm nay, tại Hội trường Beethoven, Trường Đại học Quốc tế Hồng Bàng đã diễn ra Vòng Chung kết cuộc thi Olympic Tiếng Anh 2024 vô cùng gay cấn và đầy cảm xúc. Chúng ta...',
        readMoreUrl: 'https://hiu.vn/hiu-student-center/chuc-mung-vong-chung-ket-olympic-tieng-anh-2024-da-thanh-cong-ruc-ro/'
    },
    {
        id: 6,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/10/SSS-870x285.jpg',
        title: 'TALKSHOW NÂNG CAO SỨC KHỎE TINH THẦN CHO SINH VIÊN VỚI THÔNG ĐIỆP “KHÔNG ỔN CŨNG KHÔNG SAO”',
        description:
            'Ngày 10 tháng 10 năm 2024 là ngày Sức khỏe Tâm thần Thế giới (WMHD – World Mental Health Day). Talkshow Nâng cao sức khỏe tinh thần cho sinh viên với thông điệp “Không ổn cũng không sao” do Trường Đại học Quốc tế Hồng Bàng (HongBang International University) phối...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/talkshow-nang-cao-suc-khoe-tinh-than-cho-sinh-vien-voi-thong-diep-khong-on-cung-khong-sao/'
    },
    {
        id: 7,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/09/VS110-800x285.jpg',
        title: 'HIU đồng tổ chức Hướng dẫn viên Du lịch triển vọng toàn Thành 2024',
        description:
            'Với mong muốn mang đến cho sinh viên ngành đang theo học ngành Quản trị Dịch vụ Du lịch và Lữ hành cơ hội giao lưu, học hỏi, cọ xát thực tế, Trường Đại học Quốc tế Hồng Bàng phối hợp cùng với Nhà văn hóa Sinh viên Tp.HCM...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/hiu-dong-to-chuc-huong-dan-vien-du-lich-trien-vong-toan-thanh-2024/'
    },
    {
        id: 8,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/06/447729001_424865507120950_2290725292462772115_n-870x285.jpg',
        title: 'TỌA ĐÀM TÌM HIỂU ÂM NHẠC DÂN TỘC HỌC ĐƯỜNG NGHỆ THUẬT CẢI LƯƠNG” – ÂM VANG HỒN VIỆT',
        description:
            'Vừa qua vào lúc 17g00 ngày 6/6/2024 tại Hội trường Beethoven trường Đại học Quốc tế Hồng Bàng đã diễn ra thành công chương trình Tọa đàm tìm hiểu âm nhạc dân tộc học đường “Nghệ thuật Cải lương” – Âm vang hồn Việt. Nhận được rất nhiều sự quan tâm...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/toa-dam-tim-hieu-am-nhac-dan-toc-hoc-duong-nghe-thuat-cai-luong-am-vang-hon-viet/'
    },
    {
        id: 9,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/04/2-2-640x285.jpg',
        title: 'SẴN SÀNG BÙNG NỔ CHO ĐÊM GALA TALENT GENERATION 2024',
        description:
            '🌟 SẴN SÀNG BÙNG NỔ CHO ĐÊM GALA TALENT GENERATION 2024 🌟✨ Tối ngày 14/4/2024, Đêm GALA Talent Generation 2024 với chủ đề “Dẫn bước sinh viên – Vươn tầm quốc tế” sẽ chính thức diễn ra với nhiều hứa hẹn mang đến cho các bạn sinh viên những trải...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/san-sang-bung-no-cho-dem-gala-talent-generation-2024/'
    },
    {
        id: 10,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/03/z5244900136193_31f8d00b8d1b713686b6955bfb7bd85b-800x285.jpg',
        title: 'Nhanh tay đăng ký: Cuộc thi Rung chuông vàng',
        description:
            'Ngày 30/03/2024 (thứ 7), BM Ngôn ngữ & Văn hoá Hàn Quốc – HIU cùng với sự tài trợ đồng hành của Văn phòng đại diện tỉnh Jeonlanam-do hân hạnh được tổ chức chương trình “Rung chuông vàng 2024” (tìm hiểu về Hàn Quốc và tỉnh Jeonlanam-do)...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/nhanh-tay-dang-ky-cuoc-thi-rung-chuong-vang/'
    }, {
        id: 11,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/03/3-1-526x285.jpg',
        title: 'KING & QUEEN CHÍNH THỨC QUAY TRỞ LẠI',
        description:
            '👑 KING & QUEEN CHÍNH THỨC QUAY TRỞ LẠI 👑 💓 Hai bạn là một cặp đôi hoặc bạn bè hợp cạ? 🤭 Đang muốn thử độ ăn ý của nhau? 🤯 Mong muốn trở thành VUA và HOÀNG HẬU tại một vương quốc nào đó? Đến với KING & QUEEN 2024, các bạn sẽ được...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/king-queen-chinh-thuc-quay-tro-lai/'
    },
    {
        id: 12,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2024/03/rung-chuong-vang_07-03-2024-822x285.jpg',
        title: '🔔 CUỘC THI RUNG CHUÔNG VÀNG 🔔',
        description:
            '🔔 CUỘC THI RUNG CHUÔNG VÀNG 🔔 🌼 Ngày 30/03/2024 (thứ 7), BM Ngôn ngữ & Văn hoá Hàn Quốc, ĐHQT Hồng Bàng cùng với sự tài trợ đồng hành của Văn phòng đại diện tỉnh Jeonlanam-do hân hạnh được tổ chức chương trình “Rung chuông vàng 2024” (tìm hiểu về Hàn Quốc và...',
        readMoreUrl: 'https://hiu.vn/hiu-student-center/cuoc-thi-rung-chuong-vang/'
    },
    {
        id: 13,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2023/06/Thie%CC%82%CC%81t-ke%CC%82%CC%81-kho%CC%82ng-te%CC%82n-10-800x285.png',
        title: 'Giây phút đấu trí đầy kịch tính của Top 6 đội thi tại vòng Chung kết cuộc thi HIU Logistics Talent 2023',
        description:
            'Sau hơn 2 tháng khởi động, Top 6 của cuộc thi HIU Logistics Talent 2023 đã chính thức lộ diện và có màn tranh tài vô cùng hấp dẫn, ghi điểm ấn tượng với Ban giám khảo trong vòng Chung kết chiều nay. Đảm nhiệm vai trò “cầm cân nảy mực”…',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/top-6-doi-thi-tai-vong-chung-ket-cuoc-thi-hiu-logistics-talent-2023/'
    },
    {
        id: 14,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2023/05/DSC00392-800x285.jpg',
        title: 'Dự án Bột mặt nạ AraFace của DNDN giành chiến thắng tại HIU Startup 2023',
        description:
            'Tại đêm Chung kết và trao giải HIU Startup 2023 diễn ra vào ngày 18/5/2023 tại hội trường Beethoven, nhóm DNDN đã xuất sắc đăng quang ngôi vị Quán quân HIU Startup 2023 với dự án Bột mặt nạ AraFace làm từ cây đinh lăng. Giải Nhì lần lượt thuộc...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/du-an-bot-mat-na-araface-cua-dndn-gianh-chien-thang-tai-hiu-startup-2023/'
    },
    {
        id: 15,
        type: 'custom',
        image: 'https://hiu.vn/wp-content/uploads/2023/05/Thie%CC%82%CC%81t-ke%CC%82%CC%81-kho%CC%82ng-te%CC%82n-8-800x285.png',
        title: 'Những khoảnh khắc ấn tượng của sinh viên ngành ngôn ngữ Anh HIU tại cuộc thi Olympic Tiếng Anh',
        description:
            'Cuộc thi Olympic tiếng Anh là hoạt động đầu tiên của English Zone trong chương trình Ký kết hợp tác giữa HIU và Tesol TP.HCM, Horizon Tesol về chương trình ESSENTIAL IELTS. Cuộc thi đã quy tụ hơn 300 sinh viên ngành ngôn ngữ Anh các khóa để tìm ra...',
        readMoreUrl:
            'https://hiu.vn/hiu-student-center/nhung-khoanh-khac-an-tuong-cua-sinh-vien-nganh-ngon-ngu-anh-hiu-tai-cuoc-thi-olympic-tieng-anh/'
    }
];
export default events;