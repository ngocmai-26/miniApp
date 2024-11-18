import React, { useState } from "react";
import { followOA, getUserInfo } from "zmp-sdk/apis";

const Notification = ({ onClose }) => {
  const [dataUser, setDataUser] = useState({});
  getUserInfo({
    success: (data) => {
      setDataUser(data);
    },
    fail: (error) => {
      console.log(error);
    },
  });
  followOA({
    id: "1098752924141594070",
    success: (res) => {
      getUserInfo({
          success: (data) => {
              console.log("Follow OA thành công:", data);
          },
          fail: (error) => {
            console.log(error);
          },
        });
      console.log("Follow OA thành công:", res);
    },
    fail: (err) => {
      console.error("Follow OA thất bại:", err);
    },
  });

  return (
    <div className="fixed bottom-0 right-0 bg-white p-5 shadow-lg rounded-lg z-50 left-0 ">
      <div className="text-center">
        <p className="mb-2 font-semibold text-lg">
          Cho phép BDU nhận các thông tin của bạn
        </p>
        <p className="mb-4">
          BDU cần truy cập các thông tin dưới đây từ tài khoản Zalo của bạn để
          phục vụ bạn trong quá trình sử dụng
        </p>
      </div>
      <div className="flex items-center mb-4 py-2 border-y border-color-bd500">
        <img
          src={dataUser?.userInfo?.avatar} // Thay đổi đường dẫn tới avatar của bạn
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-blue-500 mr-3"
        />
        <p className="text-lg font-bold">{dataUser?.userInfo?.name}</p> {/* Tên trường */}
      </div>
      <div>
      <p className="mb-4">
          Bằng cách nhấn "Quan tâm", để có thể nhận thông báo từ Trường Đại học Bình Dương
        </p>
      </div>
      <div className="flex">
      <button
        onClick={handleDeny}
        className="bg-blue-500 text-white px-4 py-3 rounded-2xl mr-2 w-[50%]"
      >
        Nhắn tin
      </button>
      <button
        onClick={handleAllow}
        className=" bg-[#ecf6ff] text-blue-500  px-4 py-3 rounded-2xl w-[50%] "
      >
        Quan tâm
      </button>
      </div>
    </div>
  );
};

export default Notification;
