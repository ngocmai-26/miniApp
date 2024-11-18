import React from "react";
import { NavLink } from "react-router-dom";
import { Page } from "zmp-ui";
import Footer from "../../components/footer";


function Handbook() {
    const links = [
        { name: "Ngành Kế Toán", href: "https://camnangtuyensinh.bdu.edu.vn/ketoan/index.html" },
        { name: "Ngành Công Nghệ Thực Phẩm", href: "https://camnangtuyensinh.bdu.edu.vn/congnghethucpham/index.html" },
        { name: "Ngành Công Nghệ Thông Tin", href: "https://camnangtuyensinh.bdu.edu.vn/congnghethongtin/index.html" },
        { name: "Ngành Logistics và Quản Lý Chuỗi Cung Ứng", href: "https://camnangtuyensinh.bdu.edu.vn/logistics/index.html" },
        { name: "Ngành Công Nghệ Kỹ Thuật Công Trình Xây Dựng", href: "https://camnangtuyensinh.bdu.edu.vn/xaydung/index.html" },
        { name: "Ngành Kiến Trúc", href: "https://camnangtuyensinh.bdu.edu.vn/kientruc/index.html" },
        { name: "Ngành Công Nghệ Kỹ Thuật Ô Tô", href: "https://camnangtuyensinh.bdu.edu.vn/congnghekythuatoto/index.html" },
        { name: "Ngành Dược Học", href: "https://camnangtuyensinh.bdu.edu.vn/duochoc/index.html" },
        { name: "Viện Châu Á Học", href: "https://camnangtuyensinh.bdu.edu.vn/hanquochoc-nhatbanhoc/index.html" },
        { name: "Ngành Ngôn Ngữ Anh", href: "https://camnangtuyensinh.bdu.edu.vn/ngonnguanh/index.html" },
        { name: "Ngành Quản Trị Kinh Doanh", href: "https://camnangtuyensinh.bdu.edu.vn/quantrikinhdoanh/index.html" },
        { name: "Ngành Tài Chính - Ngân Hàng", href: "https://camnangtuyensinh.bdu.edu.vn/taichinhnganhang/index.html" },
        { name: "Ngành Luật Kinh Tế", href: "https://camnangtuyensinh.bdu.edu.vn/luat/index.html" },
    ];

    return (
        <Page className="page">
            <div className="space-y-4 m-5 mb-16">
                {links.map((link, index) => (
                    <NavLink
                        key={index}
                        to={`/notebook?src=${link.href}&homePath=/handbook`}
                   
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-red-600 to-pink-300 text-white rounded-lg p-4 flex justify-between items-center"
                    >
                        ➤ {link.name}
                    </NavLink>
                ))}
            </div>
            
      <Footer />
        </Page>
    );
}

export default Handbook;
