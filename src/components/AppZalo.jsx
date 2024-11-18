import { useDispatch, useSelector } from "react-redux";
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast";
import { setAlert } from "../slices/AlertSlice";
import { toast, ToastContainer } from "react-toastify";
import React, { useLayoutEffect } from "react";
import Router from "../routes";
import "react-toastify/dist/ReactToastify.css";

function AppZalo() {
    const { msg } = useSelector((state) => state.alertReducer);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (Object.keys(msg).length > 0) {
          switch (msg.type) {
            case TOAST_SUCCESS:
              toast.success(msg.content);
              break;
            case TOAST_ERROR:
              toast.error(msg.content);
              break;
          }
          dispatch(setAlert({}));
        }
      }, [msg]);
    return ( 
        <div>
            <Router />
            <ToastContainer />
          </div>
     );
}

export default AppZalo;