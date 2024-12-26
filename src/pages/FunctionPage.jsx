import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConfigs,
  getShowDisable,
  getShowEnable,
} from "../thunks/ConfigThunks";
import { Page } from "zmp-ui";
import Footer from "../components/footer";

function FunctionPage() {
  const dispatch = useDispatch();
  // Danh sách ứng dụng và trạng thái bật/tắt
  const { allConfig } = useSelector((state) => state.configReducer);
  const [apps, setApps] = useState(allConfig);

  useEffect(() => {
    dispatch(getAllConfigs());
  }, [dispatch]);

  const toggleApp = (id) => {
    console.log("isssssg", allConfig)
    setApps((prevApps) =>
      prevApps.map((app) => {
        const updatedApp = {
          ...app,
          is_show_in_home:
            app.id === id ? !app.is_show_in_home : app.is_show_in_home,
        };

        // Gọi action tương ứng
        if (app.id === id) {
          if (!app.is_show_in_home) {
            dispatch(getShowEnable(id)); // Gọi khi bật
          } else {
            dispatch(getShowDisable(id)); // Gọi khi tắt
          }
        }

        return updatedApp;
      })
    );
  };
  console.log("allConfisssssg", allConfig)

  return (
    <Page className="page overflow-auto h-screen">
      <div>
        <div className="w-full min-h-screen bg-white  justify-center p-5 pb-14">
          <ul>
            {apps.map((app) => (
              <li
                key={app.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  {/* Icon giả định (dùng emoji cho đơn giản) */}
                  <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🟠
                  </div>
                  <span className="text-lg font-medium">{app.name}</span>
                </div>
                <button
                  className={`w-12 h-6 rounded-full p-1 ${
                    app.is_show_in_home ? "bg-green-500" : "bg-gray-300"
                  } flex items-center transition-colors duration-200`}
                  onClick={() => toggleApp(app.id)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transform ${
                      app.is_show_in_home ? "translate-x-6" : ""
                    } transition-transform duration-200`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </Page>
  );
}

export default FunctionPage;
