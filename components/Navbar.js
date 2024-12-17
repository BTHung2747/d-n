import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo hoặc tên trang */}
        <Link to="/" className="navbar-logo">
          Hệ thống tài liệu
        </Link>
        
        {/* Menu điều hướng */}
        <div className="navbar-menu">
          <Link to="/documents" className="navbar-item">Tài liệu</Link>
          <Link to="/upload" className="navbar-item">Tải lên</Link>
          
          {/* Thay đổi đăng nhập thành logo */}
          <Link to="/login" className="navbar-login">
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
