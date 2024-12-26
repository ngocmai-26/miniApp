import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../thunks/NewsThunks";
import moment from "moment";
import Footer from "../components/footer";
import { openWebview } from "zmp-sdk/apis";

const AllNews = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const openUrlInWebview = async (url) => {
    try {
      await openWebview({
        url: url, // Nhận URL từ tham số truyền vào
        config: {
          style: "bottomSheet",
          leftButton: "back",
        },
      });
    } catch (error) {
      // Xử lý khi gọi API thất bại
      console.log(error);
    }
  };

  return (
    <div className="all-news">
      <h2 className="text-2xl font-bold mb-4 mx-3">Danh sách tin tức</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14 mx-2">
        {allNews
          .filter((item) => item.type === parseInt(type))
          .map((item) => (
            <div
              key={item.id}
              className="news-item bg-white shadow-md rounded-lg p-4"
            >
              <button
                onClick={() => {
                  openUrlInWebview(item.link);
                }}
                className="w-full text-start"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-3 rounded"
                />
                <h3 className="text-lg font-bold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500 text-right">
                  Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default AllNews;
