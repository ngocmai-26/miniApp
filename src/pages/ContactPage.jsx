import React, { useEffect, useLayoutEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "zmp-ui";
import Footer from "../components/footer";
import { getAllLocation } from "../thunks/LocationThunk";
import { useDispatch, useSelector } from "react-redux";
import { openWebview } from "zmp-sdk/apis";
import { getAllContact } from "../thunks/ContactThunk";

const ContactPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(""); // Thêm trạng thái cho địa điểm học
  const [selectedMajor, setSelectedMajor] = useState("");
  const [showMajorNotification, setShowMajorNotification] = useState(false);
  const [phoneItem, setPhoneItem] = useState("");
  // Thông báo khi chọn ngành học mà chưa chọn địa điểm
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const { allLocation } = useSelector((state) => state.locationReducer);

  useEffect(() => {
    if (allLocation.length <= 0) {
      dispatch(getAllLocation());
    }
  }, [dispatch, allLocation.length]);

  useLayoutEffect(() => {
    setSelectedLocation("");
  }, []);

  const missionStatements = [
    {
      title: "Mục tiêu",
      content:
        "Mục tiêu của chúng tôi là phát huy tiềm năng của xã hội và xây dựng Trường Đại học Bình Dương trở thành đại học kinh tế sinh thái mở, đa lĩnh vực, đa hệ, đa cấp, để đáp ứng nhu cầu học tập của nhân dân và góp phần xây dựng nền giáo dục mở thông qua phương pháp cộng học.",
    },
    {
      title: "Sứ mạng",
      content:
        "Trường Đại học Bình Dương có sứ mạng tạo điều kiện thuận lợi để mọi người được tham gia học tập nâng cao trình độ, đào tạo cử nhân, kỹ sư thực hành; nghiên cứu khoa học, chuyển giao công nghệ, góp phần phát triển địa phương, đất nước và từng bước hội nhập nền giáo dục khu vực Đông Nam Á và thế giới.",
    },
    {
      title: "Tầm nhìn",
      content:
        "Trường Đại học Bình Dương là một trong những trường đại học đa lĩnh vực, chất lượng đào tạo phù hợp với chuẩn mực trong nước và quốc tế, các chương trình đào tạo được thực hiện thông qua phương pháp “Cộng học”, đối thoại trực tiếp được xây dựng trên nguyên tắc: Học - Hỏi – Hiểu – Hành.",
    },
    {
      title: "Giá trị cốt lõi",
      content:
        "Trường Đại học Bình Dương đào tạo ra những người lao động sáng tạo, lao động có hiệu quả, tạo ra những sản phẩm vật chất và tinh thần có chất lượng. Hoàn thành trách nhiệm với bản thân, với gia đình, với xã hội, với thiên nhiên là giá trị cốt lõi, là nhân cách, là phẩm chất đạo đức tối thiểu mỗi con người cần phải có để có được quyền bình đẳng tồn tại và phát triển.",
    },
  ];

  const { allContact } = useSelector((state) => state.contactReducer);

  useEffect(() => {
    if (allContact.length <= 0) {
      dispatch(getAllContact());
    }
  }, [dispatch, allLocation.length]);

  // Function to handle call button click
  const handleCallClick = () => {
    if (selectedLocation) {
      // Xác định số điện thoại dựa vào địa điểm và ngành
      const defaultPhone =
        selectedLocation === "Bình Dương" ? "0789269219" : "0901289750";
      const major = allContact?.find(
        (m) => m.name === selectedMajor && m.location_name === selectedLocation
      );

      console.log("major", major.phone);
      const phone = major ? major.phone : defaultPhone;

      // Mở link chat Zalo với số điện thoại đã chọn
      setPhoneItem(phone);
    } else {
      setShowMajorNotification(true);
      setTimeout(() => setShowMajorNotification(false), 2000);
    }
  };

  const openUrlInWebview = async (phone) => {
    try {
      const zaloUrl = `https://zalo.me/${phone}`;
      await openWebview({
        url: zaloUrl,
        config: {
          style: "normal",
          leftButton: "back",
        },
      });
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 3000);
    } catch (error) {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    const defaultPhone =
      selectedLocation === "Bình Dương" ? "0789269219" : "0901289750";

    const major = allContact?.find(
      (m) => m.name === selectedMajor && m.location_name === selectedLocation
    );

    const phone = major ? major.phone : defaultPhone;

    // Mở link chat Zalo với số điện thoại đã chọn
    setPhoneItem(phone);
  }, [selectedLocation, selectedMajor]);
  // Lọc ngành học dựa trên địa điểm đã chọn
  const filteredMajors = allContact?.filter(
    (major) => major.location_name === selectedLocation
  );

  console.log("filteredMajors", filteredMajors);
  console.log("allContact", allContact);
  console.log("selectedLocation", selectedLocation);

  // Thay đổi ngành học, kiểm tra xem đã chọn địa điểm hay chưa
  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center mb-16 pt-10 ">
        {/* Notification */}

        {/* Thông báo khi chưa chọn địa điểm mà chọn ngành học */}
        {showMajorNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-2 bg-yellow-500 text-white text-center font-semibold z-50 rounded-lg shadow-lg">
            Hãy chọn địa điểm bạn muốn liên hệ trước!
          </div>
        )}

        {/* Chọn địa điểm */}
        <div className="bg-white w-11/12 p-4 my-2 rounded-2xl shadow-md">
          <div className="w-full">
            <label className="text-center block text-lg font-semibold mb-2">
              Địa điểm học:
            </label>
            <select
              className="w-full p-3 rounded-md border"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Chọn địa điểm học</option>
              {allLocation?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Hiển thị phần chọn ngành học nếu đã chọn địa điểm */}
            {selectedLocation && (
              <>
                <label className="text-center block text-lg font-semibold mt-4 mb-2">
                  Ngành học:
                </label>
                <select
                  className="w-full p-3 rounded-md border"
                  value={selectedMajor}
                  onChange={handleMajorChange} // Gọi hàm xử lý khi thay đổi ngành học
                >
                  {filteredMajors?.map((major, key) => (
                    <option key={key} value={major.name}>
                      {major.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Button gọi điện và chat */}
          <div className="flex justify-around mt-4">
            {selectedLocation ? (
              <button
                onClick={() => openUrlInWebview(phoneItem)}
                disabled={isButtonDisabled}
                className={`w-full flex items-center justify-center ${
                  isButtonDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500"
                } text-white font-semibold px-6 py-2 rounded-3xl`}
              >
                {isButtonDisabled ? "Chờ 1 chút..." : "Chat Ngay"}
              </button>
            ) : (
              <button
                onClick={handleCallClick}
                className="w-full flex items-center justify-center pointer-events-none bg-gray-300 text-white font-semibold px-6 py-2 rounded-3xl"
              >
                Chat Ngay
              </button>
            )}
          </div>
        </div>

        {/* Thông tin và sứ mệnh */}
        <div className="my-2 w-11/12">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md py-4 px-2">
              <h2 className="text-3xl font-bold text-red-500 pb-2">~10,000</h2>
              <p className="text-center font-semibold text-lg">
                Sinh viên đang theo học
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md py-4 px-2">
              <h2 className="text-3xl font-bold text-red-500 pb-2">~300</h2>
              <p className="text-center font-semibold text-lg">
                Giảng viên và nhân viên
              </p>
            </div>
          </div>
        </div>

        <div className="w-11/12 bg-red-600 text-white rounded-lg mt-2">
          <Swiper
            spaceBetween={15}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
            }}
            className="text-white py-6"
            style={{
              "--swiper-pagination-bullet-inactive-color": "#fff",
            }}
          >
            {missionStatements.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="py-3 px-3">
                  <div>
                    <p className="line-clamp-2 text-lg pt-3 font-bold uppercase text-center pb-4">
                      {item.title}
                    </p>
                    <div className="text-left text-sm whitespace-pre-line">
                      {item.content}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
