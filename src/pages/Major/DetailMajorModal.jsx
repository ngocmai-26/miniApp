import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationForm } from "../../thunks/registrationFormThunks";

const DetailMajorModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  const {
    name,
    expected_target,
    college_exam_groups,
    description,
    year,
    benchmark_30,
    benchmark_competency_assessment_exam,
    tuition_fee,

    academic_level,
    evaluation_methods,
    number_of_credits,
    benchmark_school_record,
    academic_level_name,
  } = item;

  const dispatch = useDispatch();
  const { allRegistrationForm } = useSelector(
    (state) => state.registrationFormReducer
  );

  useEffect(() => {
    dispatch(getRegistrationForm());
  }, [dispatch]);

  // Check if academic_level matches an item in allRegistrationForm and retrieve need_evaluation_method
  const matchingRegistration = allRegistrationForm.academic_levels.find(
    (formItem) => formItem.id === academic_level
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50 px-2"
      onClick={onClose} // Close modal when clicking outside content
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/4 py-8 px-2 relative max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-300"
          onClick={onClose}
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Chi Tiết Ngành Học
        </h2>
        <div className="space-y-6 text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong className="font-bold  text-[#be3455]">Tên Ngành:</strong>{" "}
              {name}
            </p>
            <p>
              <strong className="font-bold  text-[#be3455]">Chỉ Tiêu:</strong>{" "}
              {expected_target}
            </p>
            <p>
              <strong className="font-bold  text-[#be3455]">Năm:</strong> {year}
            </p>
            {matchingRegistration?.need_evaluation_method && (
              <>
                <p>
                  <strong className="font-bold  text-[#be3455]">
                    Điểm Chuẩn:
                  </strong>{" "}
                  {benchmark_30}
                </p>
                <p>
                  <strong className="font-bold  text-[#be3455]">
                    Điểm ĐG Năng Lực:
                  </strong>{" "}
                  {benchmark_competency_assessment_exam}
                </p>
                <p>
                  <strong className="font-bold  text-[#be3455]">
                    Điểm Chuẩn Học bạ:
                  </strong>{" "}
                  {benchmark_school_record}
                </p>
                <p>
                  <strong className="font-bold  text-[#be3455]">
                    Tín chỉ:
                  </strong>{" "}
                  {number_of_credits}
                </p>
              </>
            )}

            <p>
              <strong className="font-bold  text-[#be3455]">Học Phí:</strong>{" "}
              {tuition_fee}
            </p>
            <p>
              <strong className="font-bold  text-[#be3455]">
                Trình Độ Đăng Kí:
              </strong>{" "}
              {academic_level_name}
            </p>
          </div>

          <div className="space-y-2">
            {description ? (
              <div>
                 <strong className="font-bold  text-[#be3455]">
                Chuyên ngành:
              </strong>{" "}
                 {
                  description.includes("/n") ? (
                    <ul className="list-disc pl-6 text-sm text-gray-600">
                      {description.split("/n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">{description}</p>
                  )
                 }
              </div>
              
            ) : null}
          </div>

          {matchingRegistration?.need_evaluation_method && (
            <div className="space-y-2">
              <strong className="font-bold block text-[#be3455]">
                Tổ Hợp:
              </strong>
              <ul className="list-disc pl-6 text-sm text-gray-600">
                {college_exam_groups?.map((group, index) => (
                  <li key={index}>
                    <strong>{group.name}</strong> ({group.code}):{" "}
                    {group.subjects?.map((subject) => subject.name).join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matchingRegistration?.need_evaluation_method ? (
            <div className="space-y-2">
              <strong className="font-bold block text-[#be3455]">
                Phương Pháp Đánh Giá:
              </strong>
              <ul className="list-disc pl-6 text-sm ">
                {evaluation_methods?.map((method, index) => (
                  <li key={index}>{method.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}

          {academic_level === 2 ? (
            <div className="space-y-2">
              <strong className="font-bold  text-[#be3455]">
                Điều kiện xét tuyển:
              </strong>
              <ul className="list-disc pl-6 text-sm text-gray-600">
                <li>- Xét tuyển đầu vào.</li>
                <li>
                  - Đã tốt nghiệp (hoặc đủ điều kiện công nhận tốt nghiệp) đại
                  học trở lên ngành đúng/gần/khác.
                </li>
                <li>
                  - Có văn bằng hoặc chứng chỉ ngoại ngữ tương đương bậc 3 trở
                  lên theo quy định.
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}

          {academic_level === 3 ? (
            <div className="space-y-2">
              <strong className="font-bold  text-[#be3455]">
                Hình thức xét tuyển:
              </strong>
              <ul className="list-disc pl-6 text-sm text-gray-600">
                <li>
                  Đánh giá hồ sơ dự tuyển: căn cứ kết quả học tập của thí sinh ở
                  bậc đại học và thạc sĩ;
                </li>
                <li>
                  Đánh giá bài luận về dự định nghiên cứu: Thí sinh trình bày
                  trực tiếp/trực tuyến về các vấn đề có liên quan đến nội dung
                  bài luận dự định nghiên cứu trước Tiểu ban chuyên môn.
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}

          {academic_level === 5 || academic_level === 4 ? (
            <>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Đối tượng tuyển sinh:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>
                    Người đã tốt nghiệp các trình độ đào tạo của giáo dục nghề
                    nghiệp (trung cấp hoặc cao đẳng) được dự tuyển và học liên
                    thông lên trình độ đại học theo quy định hiện hành của Chính
                    phủ, Thủ tướng Chính phủ và quy chế của Trường Đại học Bình
                    Dương.
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Phạm vi tuyển sinh:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>Tuyển sinh trong phạm vi cả nước.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Ngưỡng điều kiện xét tuyển:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>
                    Xét điểm trung bình tích lũy toàn khóa trình độ tương ứng
                    đối tượng xét tuyển; điểm trung bình toàn khóa từ 5.00 điểm
                    trở lên theo thang điểm 10; từ 2.00 điểm trở lên theo thang
                    điểm 4.
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}

          {academic_level === 5 || academic_level === 4 ? (
            <>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Đối tượng tuyển sinh:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>
                    Người đã tốt nghiệp các trình độ đào tạo của giáo dục nghề
                    nghiệp (trung cấp hoặc cao đẳng) được dự tuyển và học liên
                    thông lên trình độ đại học theo quy định hiện hành của Chính
                    phủ, Thủ tướng Chính phủ và quy chế của Trường Đại học Bình
                    Dương.
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Phạm vi tuyển sinh:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>Tuyển sinh trong phạm vi cả nước.</li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          {academic_level === 7 ? (
            <>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Đối tượng tuyển sinh:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>Thí sinh đã tốt nghiệp đại học trở lên.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Phạm vi tuyển sinh:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>Tuyển sinh trong phạm vi cả nước.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <strong className="font-bold  text-[#be3455]">
                  Ngưỡng điều kiện xét tuyển:
                </strong>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>
                    Xét điểm trung bình tích lũy toàn khóa văn bằng 1 từ 5.00
                    điểm trở lên theo thang điểm 10 hoặc từ 2.00 điểm trở lên
                    theo thang điểm 4.
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="space-y-2">
            <strong className="font-bold block text-[#be3455]">
              Địa điểm đào tạo:
            </strong>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              <li>
                <p>
                  <strong>Bình Dương:</strong> Phòng Tuyển sinh, cổng trước
                  Trường Đại học Bình Dương Số 504, Đại lộ Bình Dương, P. Hiệp
                  Thành, TP. Thủ Dầu Một, T. Bình Dương
                </p>
                <p>
                  <strong>Điện thoại:</strong> 0789 269 219 – 0962 939 816 –
                  0274 6 511 756 – 02746 543 616
                </p>
              </li>
              <li>
                <p>
                  <strong>Cà Mau:</strong> PHÂN HIỆU TRƯỜNG ĐẠI HỌC BÌNH DƯƠNG
                  TẠI CÀ MAU Số 3, đường Lê Thị Riêng, P. 5, TP. Cà Mau, T. Cà
                  Mau
                </p>
                <p>
                  <strong>Điện thoại:</strong> 0290 6 539 468 – 0971 936 819
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMajorModal;
