import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { Provider} from "react-redux";
import { store } from "../app/store";
import { initToken } from "../constants/api";
import { ClipLoader } from "react-spinners";
import AppZalo from "./AppZalo";

const MyApp = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const initializeApp = async () => {
      await initToken();
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <RecoilRoot>
      <React.StrictMode>
        <Provider store={store}>
          <AppZalo />
        </Provider>
      </React.StrictMode>
    </RecoilRoot>
  );
};
export default MyApp;
