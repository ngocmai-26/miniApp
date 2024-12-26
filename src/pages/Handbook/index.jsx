import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Page } from "zmp-ui";
import Footer from "../../components/footer";
import { getAllHandbook } from "../../thunks/HandbookThunk";
import { useDispatch, useSelector } from "react-redux";


function Handbook() {
    const { allHandbook } = useSelector((state) => state.handbookReducer);


    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllHandbook());
    }, [dispatch]);

    return (
        <Page className="page">
            <div className="space-y-4 m-5 mb-16">
                {allHandbook?.map((item, index) => (
                    <NavLink
                        key={index}
                        to={`/so-tay-sinh-vien?src=${item.link}&homePath=/cam-nang-sinh-vien`}
                   
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-red-600 to-pink-300 text-white rounded-lg p-4 flex justify-between items-center"
                    >
                        ➤ {item.name}
                    </NavLink>
                ))}
            </div>
            
      <Footer />
        </Page>
    );
}

export default Handbook;
