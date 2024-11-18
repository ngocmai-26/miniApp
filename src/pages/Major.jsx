// Major.js
import React, { useEffect, useState } from "react";
import MajorDetail from "./Major/DetailMajorModal";
import MajorList from "./Major/MajorList";
import { Page } from "zmp-ui";
import Footer from "../components/footer";
import { getAllMajorTable } from "../thunks/MajorThunks";
import { useDispatch, useSelector } from "react-redux";

function Major() {
  const [selectedMajor, setSelectedMajor] = useState(null);

  const { allMajorsTable } = useSelector((state) => state.majorReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMajorTable());
  }, [dispatch]);

  return (
    <Page className="page">
      <div>
        <div className="w-full min-h-screen bg-white flex items-center justify-center p-5 pb-14">
          {selectedMajor ? (
            <MajorDetail
              major={selectedMajor}
              onBack={() => setSelectedMajor(null)}
            />
          ) : (
            <MajorList majorData={allMajorsTable} onSelectMajor={setSelectedMajor} />
          )}
        </div>
        <Footer />
      </div>
    </Page>
  );
}

export default Major;
