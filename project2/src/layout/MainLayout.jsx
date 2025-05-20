import React from 'react';
import Header from '../components/Header';  // Import Header
import Footer from '../components/Footer';  // Import Footer
import { Outlet } from 'react-router-dom';  // Dùng để render các trang con (child routes)

function MainLayout() {
    return (
        <div className="main-layout">
            {/* Header */}
            <Header />

            {/* Content section - trang con sẽ được render ở đây */}
            <main>
                <Outlet /> {/* Dùng Outlet để render các trang con */}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default MainLayout;
