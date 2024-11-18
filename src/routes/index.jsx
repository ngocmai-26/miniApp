import { Route, Routes, useLocation } from "react-router-dom";
import { AnimationRoutes, App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import Major from "../pages/Major";
import QRCode from "../pages/QRCode";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notification";
import RegisterForAdmission from "../pages/Register_For_Admission/registerForAdmission";
import LookUPPoints from "../pages/Points/Points";
import UserInfo from "../pages/User";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { session } from "../thunks/SessionThunks";
import { useDispatch } from "react-redux";
import MiniAppZalo from "../pages";
import HomePage from "../pages/Home";
import Feedback from "../pages/Feedback";
import Business from "../pages/Business";
import AllNews from "../pages/AllNews";
import { ClipLoader } from "react-spinners";
import ContactPage from "../pages/ContactPage";
import NoteBook from "../pages/notebook";
import Handbook from "../pages/Handbook";


function NoteBookWrapper() {
  const location = useLocation();
  const { src, homePath } = location.state || {};

  return <NoteBook src={src} homePath={homePath} />;
}



function Router() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Thêm trạng thái để theo dõi việc gọi session

  useEffect(() => {
    const initializeSession = async () => {
      await dispatch(session()); // Chờ session được gọi hoàn thành
      setLoading(false); // Đặt loading thành false khi session hoàn thành
    };

    initializeSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ClipLoader color="#36d7b7" size={50} /> {/* Spinner component */}
    </div>)
  }
    return ( 
        <App>
          <SnackbarProvider>
            <ZMPRouter config={{ showLeftIcon: false }}>
              <Routes>
                {/* <Route path="/" element={<MiniAppZalo />}></Route> */}
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/Major" element={<Major />} />
                <Route path="/qrcode" element={<QRCode />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route
                  path="/RegisterForAdmission"
                  element={<RegisterForAdmission />}
                />
                <Route path="/all-news/:type" element={<AllNews />} />
                <Route path="/LookUpPoints" element={<LookUPPoints />} />
                <Route path="/UserInfo" element={<UserInfo />} />
                <Route path="/Business" element={<Business />} />
                <Route path="/ContactPage" element={<ContactPage />} />
                <Route path="/notebook" element={<NoteBookWrapper  />} />
                <Route path="/handbook" element={<Handbook  />} />
              </Routes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
     );
}

export default Router;