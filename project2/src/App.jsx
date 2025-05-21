// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { PATHS } from "./constant/pathnames";

// Layout & Pages
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import EventDetail from "./pages/EventDetail";
import SeatSelection from "./pages/SeatSelection";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layout/AdminLayout";
import ManageMovies from "./pages/admin/ManageMovies";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageRooms from "./pages/admin/ManageRooms";
import AcademicEvents from "./pages/AcademicEvents"; // Import trang mới
import AdminReport from "./pages/admin/AdminReport";

function App() {
  return (
    <Router>
      <Routes>
        {/* Mặc định chuyển về Home */}
        <Route path="/" element={<Navigate to={PATHS.HOME} />} />

        {/* Trang Đăng nhập (KHÔNG dùng Layout) */}
        <Route path="/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/rooms" element={<ManageRooms />} />
          <Route path="/admin/report" element={<AdminReport />} />
        </Route>

        {/* Các route chính có layout */}
        <Route element={<MainLayout />}>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.EVENT_DETAIL} element={<EventDetail />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route
            path={PATHS.ACADEMIC_EVENTS}
            element={<AcademicEvents />}
          />{" "}
          {/* Thêm route mới */}
        </Route>

        {/* Trang lỗi 404 (gợi ý thêm nếu cần) */}
        <Route path="*" element={<Navigate to={PATHS.HOME} />} />
      </Routes>
    </Router>
  );
}

export default App;
