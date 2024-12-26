import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationForm } from "../../thunks/registrationFormThunks";
import DetailMajorModal from "./DetailMajorModal";
import { getAllLocation } from "../../thunks/LocationThunk";
const MajorList = ({ majorData }) => {
  const [selectedLevel, setSelectedLevel] = useState(14); 
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { allRegistrationForm } = useSelector(
    (state) => state.registrationFormReducer
  );
  const { allLocation } = useSelector((state) => state.locationReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRegistrationForm.length <= 0) {
      dispatch(getRegistrationForm());
    }
  }, []);

  useEffect(() => {
    if (allLocation.length <= 0) {
      dispatch(getAllLocation());
    }
  }, []);

  // Lọc danh sách ngành học theo bậc học và địa điểm đào tạo đã chọn
  const filteredData = majorData
    .filter((major) => {
      const matchesLevel = selectedLevel
        ? major.academic_level === +selectedLevel
        : true;

      return matchesLevel;
    })
    // Loại bỏ các ngành học trùng mã ngành (code)
    .reduce((acc, current) => {
      const exists = acc.find((major) => major.code === current.code);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

  // Xử lý khi người dùng chọn ngành học
  const handleSelectMajor = (major) => {
    setSelectedMajor(major);
    setIsModalOpen(true);
  };

  // Đóng modal và xoá ngành học đã chọn
  const handleCloseModal = () => {
    setSelectedMajor(null);
    setIsModalOpen(false);
  };


  return (
    <div className="mb-5 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Danh sách các ngành học
      </h1>

      {/* Bộ lọc bậc học và địa điểm đào tạo */}
      <div className="flex justify-between">
        <div className="mb-4 text-center w-full">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-2 border border-[#17683d] rounded w-full max-w-md"
          >
            <option value="">Tất cả các bậc học</option>
            {allRegistrationForm?.academic_levels?.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách các ngành học đã lọc */}
      <div className="space-y-4">
        {filteredData?.map((major) => (
          <div
            key={major.id}
            className="p-4 border-2 rounded-lg border-green-500 cursor-pointer"
            onClick={() => handleSelectMajor(major)}
          >
            <h2 className="text-lg font-semibold">{major.name}</h2>
            <p className="text-sm text-gray-500">Mã ngành: {major.code}</p>
            <p className="text-sm text-gray-500">
              Điểm chuẩn: {major.benchmark_30}
            </p>
            <p className="text-sm text-gray-500">
              Điểm chuẩn thi đánh giá năng lực:{" "}
              {major.benchmark_competency_assessment_exam}
            </p>
          </div>
        ))}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500">
            Không có ngành học nào phù hợp.
          </p>
        )}
      </div>
      
      {/* Modal chi tiết ngành học */}
      <DetailMajorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedMajor}
      />
    </div>
  );
};

export default MajorList;
