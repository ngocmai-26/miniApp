import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getAllNews } from "../thunks/NewsThunks";
import { followOA, getUserInfo } from "zmp-sdk/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";

const MiniAppZalo = () => {
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const handleFollowOA = () => {
    followOA({
      id: "1098752924141594070",
      success: (res) => {
        console.log("Follow OA thành công:", res);
        
        // Đợi 2 giây trước khi gọi getUserInfo
        setTimeout(() => {
          getUserInfo({
            success: (data) => {
              console.log("Thông tin người dùng sau khi follow:", data);
            },
            fail: (error) => {
              console.log("Lỗi khi lấy thông tin người dùng:", error);
            },
          });
        }, 2000);
      },
      fail: (err) => {
        console.error("Follow OA thất bại:", err);
      },
    });
  };

  useEffect(() => {
    // Lấy thông tin người dùng khi tải component
    getUserInfo({
      success: (data) => {
        console.log("Thông tin người dùng:", data.userInfo);
      },
      fail: (error) => {
        console.log("Lỗi khi lấy thông tin người dùng:", error);
      },
    });
  }, []);


  return (
    <div className="min-h-screen ">
      <div className="relative">
        <img
          src="https://www.bdu.edu.vn/uploads/slider/chon-bdu-la-nv1-nhan-ngay-combo-2024.jpg"
          alt="Banner"
          className="w-full h-72 object-cover"
        />
      </div>

      <div className="p-4 bg-white rounded-t-lg shadow-lg">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVSR380o2QfSymT2DLVkZWjODhiuVwvLrgTSNb9LnU0l3n96vrMc7gCCcvqpEEAvNmncM&usqp=CAU"
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-blue-500 mr-3"
          />
          <div>
            <p className="text-lg font-bold">Trường Đại học Bình Dương</p>
            <p className="text-gray-600">Tiện Ích Công</p>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white text-lg px-6 py-2 w-full rounded-full mt-4"
          onClick={handleFollowOA}
        >
          Quan tâm
        </button>

        <div className="mt-4">
          <div className="flex items-center mt-2">
            <i className="fas fa-map-marker-alt text-gray-600 mr-2"></i>
            <p>504 Đại lộ Bình Dương, Hiệp Thành, Thủ Dầu Một, Bình Dương 82000</p>
          </div>
          <div className="flex items-center mt-2">
            <i className="fas fa-phone-alt text-gray-600 mr-2"></i>
            <p>0789 269 219</p>
          </div>
          <div className="flex items-center mt-2">
            <i className="fas fa-clock text-gray-600 mr-2"></i>
            <p>Đang mở cửa - Đóng cửa lúc 17:00</p>
          </div>
          <div className="flex items-center mt-2">
            <i className="fas fa-globe text-gray-600 mr-2"></i>
            <a href="https://www.bdu.edu.vn/" className="text-blue-500">
              https://www.bdu.edu.vn/
            </a>
          </div>
          <div className="mt-2">
            <p>Tài khoản Zalo của Trường Đại học Bình Dương</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold">Dịch vụ</h2>
        <div className="flex mt-2">
          <div className="bg-white p-4 rounded-lg shadow-lg mr-2">
            <NavLink to="/HomePage">
              <h3 className="text-gray-700">Thông tin chung</h3>
              <p className="text-gray-500">Tin hoạt động</p>
            </NavLink>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-700">Tốt nghiệp</h3>
            <p className="text-gray-500">Thông tin chung</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold">Tin tức</h2>
        <div className="relative bg-white my-5">
          <div className="mx-3 mb-6 pb-5">
            <div className="flex justify-between py-5">
              <div>
                <p className="text-xl font-bold text-[#ad171c]">
                  Tin tức / Sự kiện
                </p>
              </div>
              <div className="my-auto">
                <a href="" className="underline text-xs">
                  Xem thêm
                </a>
              </div>
            </div>
            <Swiper
              spaceBetween={15}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 4 },
              }}
            >
              {allNews.map((item) => (
                <SwiperSlide key={item.id}>
                  <div>
                    <a href={item.link}>
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-48 w-full"
                        />
                      </div>
                      <div>
                        <p className="line-clamp-2 text-sm pt-3 font-bold">
                          {item.title}
                        </p>
                      </div>
                      <div className="text-right text-gray-400 text-xs">
                        Ngày: {moment(item.created_at).format("YYYY/MM/DD")}
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniAppZalo;
