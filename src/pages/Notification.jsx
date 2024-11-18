import React, { useEffect } from "react";
import { Page } from "zmp-ui";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification, patchRead, patchReadAll } from "../thunks/NotificationThunks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";

function Notifications() {
  const dispatch = useDispatch();
  const { allNotification } = useSelector((state) => state.notificationReducer);

  useEffect(() => {
    dispatch(getAllNotification());
  }, [dispatch]);

  const handleRead = (id) => {
    dispatch(patchRead(id));
  };

  const handleReadAll = () => {
    dispatch(patchReadAll());
  };

  // Sắp xếp allNotification theo created_at từ gần đến xa
  const sortedNotifications = [...allNotification].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <Page className="page">
      <div>
        {/* "Mark All as Read" button */}
        <div className="flex justify-end items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
   
          <button
            onClick={handleReadAll}
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            Đọc tất cả
          </button>
        </div>

        {/* Notifications list */}
        <div className="mx-auto bg-white min-h-screen shadow-md overflow-hidden pb-14">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleRead(notification.id)}
                className={`flex items-center p-4 border-b border-gray-200 cursor-pointer ${
                  notification.read_at === null ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <img
                  src="https://media.istockphoto.com/id/1344512181/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-loa-m%C3%A0u-%C4%91%E1%BB%8F.jpg?s=612x612&w=0&k=20&c=t8xmvCQKhdqmyG2ify0vXMIgK5ty7IpOyicWE-Rrpzg="
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm text-gray-600 font-bold">{notification.content}</p>
                  <p className="text-xs text-gray-500">{moment(notification.created_at).format("DD/MM/YYYY")}</p>
                </div>
                <FontAwesomeIcon icon={faEllipsis} className="nav-icon" />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Hiện tại chưa có thông báo</p>
          )}
        </div>
        <Footer />
      </div>
    </Page>
  );
}

export default Notifications;
