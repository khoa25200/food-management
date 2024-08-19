import React from 'react';
import './LayoutFooter.less';
import { Layout } from 'antd';
const { Footer } = Layout;
function LayoutFooter({ role }) {
  return (
    <Footer> 
      <footer className="footer">
      <div className="footer-content">
        <p>
        &copy; 2024 Food Management All rights reserved | Term & Privacy | Hotline 24/7: 1900 4515
        </p>
        <div className="footer-icons">
          <span>Kết nối với chúng tôi</span>
          <a href="#" className="social-icon">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-facebook-facebook"></i>

            <i className="fab fa-twitter"></i>
          </a>
          <span>Ngôn ngữ:</span>
          {/* <a href="#" className="language-icon">🌐</a> */}
          <a href="#" className="language-icon">VN</a>
          <a href="#" className="language-icon">EN</a>
          <a href="#" className="language-icon">🌟</a>

        </div>
      </div>
    </footer>


    </Footer>
  );
}

export default LayoutFooter;