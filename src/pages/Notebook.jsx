import React from "react";
import { Page } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faFileAlt,
  faHome,
  faQrcode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function NoteBook() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy tham số từ query string
  const queryParams = new URLSearchParams(location.search);
  const src = queryParams.get("src");
  const homePath = queryParams.get("homePath");

  const goHome = () => {
    // Nếu homePath là '/', điều hướng về trang chủ mặc định
    if (homePath === "/") {
      navigate("/"); // Quay lại trang chủ
    } else {
      navigate(`/${homePath}`); // Điều hướng về homePath
    }
  };

  return (
    <Page className="page">
      <div className="w-full h-full relative">
        {/* Nhúng link trong iframe */}
        <iframe
          src={src}           // Sử dụng tham số 'src' trong URL
          title="Student Handbook"   // Tiêu đề cho iframe
          width="100%"         // Đảm bảo iframe chiếm toàn bộ chiều rộng
          height="100%"        // Đảm bảo iframe chiếm toàn bộ chiều cao
          style={{ border: "none" }} // Xóa border mặc định của iframe
        />
        
        {/* Nút quay lại */}
        <button
          onClick={goHome} // Khi bấm, điều hướng về trang chủ
          className="fixed bottom-4 right-4 w-12 h-12 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 focus:outline-none"
          title="Go Home"   // Tiêu đề của nút khi hover
        >
           <FontAwesomeIcon icon={faHome} className="nav-icon"  style={{  fontSize: 20 }} />
        </button>
      </div>
    </Page>
  );
}

export default NoteBook;
