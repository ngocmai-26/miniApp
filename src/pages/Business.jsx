import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../thunks/BusinessThunk";
import { useEffect } from "react";
import { Page } from "zmp-ui";
import moment from "moment";
import Footer from "../components/footer";
import { getAllNews } from "../thunks/NewsThunks";

function Business() {
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);
  return (
    <Page className="page bg-gray-100 min-h-screen">
      <div className="px-2 py-5 max-w-5xl mx-auto  mb-16">
        <h2 className="font-bold text-xl mb-6 text-gray-800">
          Việc làm mới cập nhật
        </h2>
        <div className="space-y-2">
          {allNews
            .filter((item) => item.type === 6)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sắp xếp theo thời gian mới nhất
            .map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-6 bg-white p-5 shadow-lg rounded-xl transition transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  {/* <p className="text-red-500 text-sm mb-1">Mức lương thỏa thuận</p> */}
                  <p className="text-gray-500 text-sm">
                    Ngày: {moment(item.created_at).format("DD/MM/YYYY")}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
      <Footer />
    </Page>
  );
}

export default Business;
