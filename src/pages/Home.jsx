import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import Footer from "../components/footer";
import lienhe from "../img/lienhe.png";
import add from "../img/add.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../thunks/NewsThunks";
import moment from "moment";
import { openWebview } from "zmp-sdk/apis";
import { getAllConfigs } from "../thunks/ConfigThunks";

const HomePage = () => {
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.newsReducer);
  const { allConfig } = useSelector((state) => state.configReducer);
  const [latestNewsType2, setLatestNewsType2] = useState(null);

  useEffect(() => {
    
    dispatch(getAllNews());
    dispatch(getAllConfigs());
  }, [dispatch]);

  console.log("allConfig", allConfig)

  useEffect(() => {
    const latest = allNews
      .filter((item) => item.type === 2)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    setLatestNewsType2(latest);
  }, [allNews]);

  const openUrlInWebview = async (url) => {
    try {
      await openWebview({
        url: url,
        config: {
          style: "bottomSheet",
          leftButton: "back",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page className="page">
      <div>
        {/* Banner Image */}
        <div className="relative mb-4">
          <img
            src={
              latestNewsType2
                ? latestNewsType2.image
                : "https://reviewedu.net/wp-content/uploads/2021/08/dai-hoc-binh-duong-bdu-3-1.jpg"
            }
            alt="Banner"
            className="w-full h-[270px]"
          />
        </div>

        <div className="page mb-16">
          <div className="my-5 grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4">
            {allConfig?.map(
              (item, key) =>
                item.is_show_in_home && (
                  <div className="" key={key}>
                    <NavLink
                      to={
                        item.name === "Sổ tay sinh viên"
                          ? "/so-tay-sinh-vien?src=https://daotao.bdu.edu.vn/so-tay-sinh-vien/index.html&homePath=/"
                          : item.direct_to
                      }
                      className="nav-item"
                    >
                      <div className="bg-white rounded-2xl h-32 flex flex-col items-center justify-center py-2 px-2 shadow-md">
                        <img
                          src={item.icon_url}
                          alt={item.name}
                          className="w-12 h-12 mt-2 mb-2"
                        />
                        <div className="text-center text-black text-base">
                          {item.name}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                )
            )}

            <div className="">
              <NavLink to="/them-chuc-nang" className="nav-item">
                <div className="bg-white rounded-2xl h-32 flex flex-col items-center justify-center py-2 px-2 shadow-md">
                  <img src={add} alt="Search" className="w-10 h-10 mt-2 mb-2" />
                  <div className="text-center text-black text-base">
                    Thêm chức năng
                  </div>
                </div>
              </NavLink>
            </div>
          </div>

          {/* News Section */}
          <div className="relative bg-white my-5">
            <div className="mx-3 mb-6 pb-5">
              <div className="flex justify-between py-5">
                <div>
                  <p className="text-xl font-bold text-[#ad171c]">
                    Tin tức / Sự kiện
                  </p>
                </div>
                <div className="my-auto">
                  <NavLink to={`/all-news/1`} className="underline text-xs">
                    Xem thêm
                  </NavLink>
                </div>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {allNews
                  .filter((item) => item.type === 1) // Lọc các bài viết có type = 1
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 4) // Sắp xếp theo thời gian mới nhất
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <button
                          onClick={() => {
                            openUrlInWebview(item.link);
                          }}
                          className="w-full text-start"
                        >
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
                            Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                          </div>
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          {/* Enrollment Section */}
          <div className="relative bg-white my-5">
            <div className="mx-3 mb-6 pb-5">
              <div className="flex justify-between py-5">
                <div>
                  <p className="text-xl font-bold text-[#ad171c]">Tuyển sinh</p>
                </div>
                <div className="my-auto">
                  <NavLink to={`/all-news/2`} className="underline text-xs">
                    Xem thêm
                  </NavLink>
                </div>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {allNews
                  .filter((item) => item.type === 2) // Lọc các bài viết có type = 1
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 4) // Sắp xếp theo thời gian mới nhất
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <button
                          onClick={() => {
                            openUrlInWebview(item.link);
                          }}
                          className="w-full text-start"
                        >
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
                            Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                          </div>
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          {/* Enrollment Section */}
          <div className="relative bg-white my-5">
            <div className="mx-3 mb-6 pb-5">
              <div className="flex justify-between py-5">
                <div>
                  <p className="text-xl font-bold text-[#ad171c]">
                    Góc học đường
                  </p>
                </div>
                <div className="my-auto">
                  <NavLink to={`/all-news/7`} className="underline text-xs">
                    Xem thêm
                  </NavLink>
                </div>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {allNews
                  .filter((item) => item.type === 7) // Lọc các bài viết có type = 1
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 4) // Sắp xếp theo thời gian mới nhất
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <button
                          onClick={() => {
                            openUrlInWebview(item.link);
                          }}
                          className="w-full text-start"
                        >
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
                            Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                          </div>
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          {/* Enrollment Section */}
          <div className="relative bg-white my-5">
            <div className="mx-3 mb-6 pb-5">
              <div className="flex justify-between py-5">
                <div>
                  <p className="text-xl font-bold text-[#ad171c]">Tốt nghiệp</p>
                </div>
                <div className="my-auto">
                  <NavLink to={`/all-news/5`} className="underline text-xs">
                    Xem thêm
                  </NavLink>
                </div>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {allNews
                  .filter((item) => item.type === 5) // Lọc các bài viết có type = 1
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 4) // Sắp xếp theo thời gian mới nhất
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <button
                          onClick={() => {
                            openUrlInWebview(item.link);
                          }}
                          className="w-full text-start"
                        >
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
                            Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                          </div>
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          {/* Enrollment Section */}
          <div className="relative bg-white my-5">
            <div className="mx-3 mb-6 pb-5">
              <div className="flex justify-between py-5">
                <div>
                  <p className="text-xl font-bold text-[#ad171c]">Việc Làm</p>
                </div>
                <div className="my-auto">
                  <NavLink to={`/all-news/6`} className="underline text-xs">
                    Xem thêm
                  </NavLink>
                </div>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {allNews
                  .filter((item) => item.type === 6) // Lọc các bài viết có type = 1
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 4) // Sắp xếp theo thời gian mới nhất
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <button
                          onClick={() => {
                            openUrlInWebview(item.link);
                          }}
                          className="w-full text-start"
                        >
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
                            Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                          </div>
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Page>
  );
};

export default HomePage;
