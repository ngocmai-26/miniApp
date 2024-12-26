import React, { useEffect } from "react";
import "../css/footer.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "../thunks/NotificationThunks";

function Footer() {
  const dispatch = useDispatch();
  const { allNotification } = useSelector((state) => state.notificationReducer);

  useEffect(() => {
    dispatch(getAllNotification());
  }, [dispatch]);

  // Tính số lượng thông báo chưa đọc
  const unreadNotificationsCount = allNotification?.filter(
    (item) => item.read_at === null
  ).length || 0;

  return (
    <footer className="footer-nav z-40">
      <NavLink to="/" className="nav-item">
        <div>
          <FontAwesomeIcon icon={faHome} className="nav-icon" style={{ fontSize: 20 }} />
          <div>Trang chủ</div>
        </div>
      </NavLink>
      <div
        style={{
          background: "#ad171c",
          width: "50px",
          height: "50px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          borderRadius: "50%",
        }}
      >
        <NavLink to="/qrcode" className="nav-item">
          <FontAwesomeIcon
            icon={faQrcode}
            className="nav-icon"
            style={{ color: "white", margin: "auto", fontSize: 24 }}
          />
        </NavLink>
      </div>

      <NavLink to="/notifications" className="nav-item">
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon icon=
          {faBell} className="nav-icon" style={{ fontSize: 20 }} />
          {(
            <span
              style={{
                position: "absolute",
                top: "-5px",
        
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 8px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {unreadNotificationsCount}
            </span>
          )}
          <div>Thông báo</div>
        </div>
      </NavLink>
    </footer>
  );
}

export default Footer;
