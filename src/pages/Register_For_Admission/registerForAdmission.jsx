import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationForm } from "../../thunks/registrationFormThunks";
import { getAllMajor } from "../../thunks/MajorThunks";
import { getAllEvaluation } from "../../thunks/EvaluationThunks";
import { getAllCollegeExamGroup } from "../../thunks/CollegeExamGroupThunks";
import { admissionRegister } from "../../thunks/AdmissionRegisterThunks";
import NotificationComponent from "../../components/notificationComponent";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import { setStatus } from "../../slices/AdmissionRegisterSlice";
import { openMediaPicker } from "zmp-sdk/apis";

const RegisterForAdmission = () => {
  const dispatch = useDispatch();
  const { allRegistrationForm } = useSelector(
    (state) => state.registrationFormReducer
  );
  const { allMajors } = useSelector((state) => state.majorReducer);
  const { allEvaluation } = useSelector((state) => state.evaluationReducer);
  const { allCollegeExamGroups } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );
  const { status } = useSelector((state) => state.admissionRegisterReducer);

  const [subjects, setSubjects] = useState([]);
  const [educationLevel, setEducationLevel] = useState("");
  const [location, setLocation] = useState(0);

  const [selectedAcademic, setSelectedAcademic] = useState(null);

  const [formData, setFormData] = useState({
    evaluation_method: "",
    major: 0,
    college_exam_group: null,
    student: {
      fullname: "",
      gender: true,
      date_of_birth: "",
      citizen_id: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      high_school: "",
    },
    subject_scores: null,
    competency_assessment_exam_score: null,
    files: [],
  });
  useEffect(() => {
    dispatch(getRegistrationForm());
  }, [dispatch]);

  useEffect(() => {
    if (educationLevel && location && location !== 0) {
      dispatch(getAllMajor({ id: educationLevel, location: location }));
    }
  }, [dispatch, location, educationLevel]);

  useEffect(() => {
    if (formData.major) {
      dispatch(getAllCollegeExamGroup(formData.major));
      dispatch(getAllEvaluation(formData.major));
    }
  }, [dispatch, formData.major]);

  useEffect(() => {
    if (formData.college_exam_group) {
      const selectedGroup = allCollegeExamGroups?.find(
        (group) => group.id === formData.college_exam_group
      );
      const newSubjects = selectedGroup ? selectedGroup.subjects : [];
      setSubjects(newSubjects);

      if (formData.evaluation_method === "5_semesters_of_high_school") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          subject_scores: newSubjects.flatMap((subject) => [
            { score: "", grade: 10, semester: 1, subject: subject.id },
            { score: "", grade: 10, semester: 2, subject: subject.id },
            { score: "", grade: 11, semester: 1, subject: subject.id },
            { score: "", grade: 11, semester: 2, subject: subject.id },
            { score: "", grade: 12, semester: 1, subject: subject.id },
          ]),
        }));
      } else if (formData.evaluation_method === "grade_12") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          subject_scores: newSubjects.flatMap((subject) => [
            { score: "", grade: 12, semester: 0, subject: subject.id },
          ]),
        }));
      } else if (formData.evaluation_method === "high_school_graduation_exam") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          subject_scores: newSubjects.flatMap((subject) => [
            { score: "", grade: 0, semester: 0, subject: subject.id },
          ]),
        }));
      } else if (formData.evaluation_method === "grades_10_11_12") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          subject_scores: newSubjects.flatMap((subject) => [
            { score: "", grade: 10, semester: 0, subject: subject.id },
            { score: "", grade: 11, semester: 0, subject: subject.id },
            { score: "", grade: 12, semester: 0, subject: subject.id },
          ]),
        }));
      } else if (formData.evaluation_method === "competency_assessment_exam") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          subject_scores: null,
          competency_assessment_exam_score: {
            score: "",
          },
        }));
      }
    } else {
      setSubjects([]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        subject_scores: [],
      }));
    }
  }, [
    formData.college_exam_group,
    allCollegeExamGroups,
    formData.evaluation_method,
  ]);

  useEffect(() => {
    allRegistrationForm?.academic_levels?.forEach((item) => {
      if (item.need_evaluation_method) {
        setFormData({
          ...formData,
          college_exam_group: null,
          subject_scores: null,
          competency_assessment_exam_score: null,
        });
      }
    });
    console.log("formData", formData);
  }, [educationLevel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("student.")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        student: {
          ...prevFormData.student,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]:
          name === "college_exam_group" || name === "major"
            ? parseInt(value, 10)
            : value,
      }));
    }
  };

  const handleResultChange = (index, field, value) => {
    const updatedScores = [...formData.subject_scores];
    updatedScores[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject_scores: updatedScores,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(admissionRegister(formData));
  };

  const renderResultInputs = () => {
    if (formData.evaluation_method === "5_semesters_of_high_school") {
      return (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2 font-semibold">
            <span>Môn học</span>
            <span>Điểm</span>
            <span>Lớp</span>
            <span>Học kì</span>
          </div>
          {formData?.subject_scores?.map((score, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 mt-2 items-center"
            >
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                {subjects?.find((sub) => sub.id === score.subject)?.name ||
                  "N/A"}
              </div>
              <input
                type="text"
                value={score.score}
                onChange={(e) =>
                  handleResultChange(index, "score", e.target.value)
                }
                className="p-2 border border-gray-300 rounded  bg-white"
                placeholder="Nhập điểm"
              />
              <input
                type="text"
                value={score.grade}
                className="p-2 border border-gray-300 rounded  bg-gray-200 cursor-not-allowed"
                readOnly
              />
              <input
                type="text"
                value={score.semester}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
            </div>
          ))}
          <>
            <div className="grid grid-cols-3 gap-4">
              {formData?.files?.map((fileUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={fileUrl}
                    alt={`Uploaded file ${index + 1}`}
                    className="w-full h-26 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-gray-300 text-white rounded-full p-1 px-2 hover:bg-red-700"
                    aria-label="Xóa"
                    style={{ transform: "translate(50%, -50%)" }}
                    type="button"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <label className="block text-gray-700">
                Tải hình ảnh học bạ:<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={pickMedia}
                className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                required
              />
            </div>
          </>
        </div>
      );
    } else if (formData.evaluation_method === "grade_12") {
      return (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2 font-semibold">
            <span>Môn học</span>
            <span>Điểm</span>
            <span>Lớp</span>
            <span>Học kì</span>
          </div>
          {formData?.subject_scores?.map((score, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 mt-2 items-center"
            >
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                {subjects?.find((sub) => sub.id === score.subject)?.name ||
                  "N/A"}
              </div>
              <input
                type="text"
                value={score.score}
                onChange={(e) =>
                  handleResultChange(index, "score", e.target.value)
                }
                className="p-2 border border-gray-300 rounded  bg-white"
                placeholder="Nhập điểm"
              />
              <input
                type="text"
                value={score.grade}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
              <input
                type="text"
                value={score.semester}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
            </div>
          ))}
          <>
            <div className="grid grid-cols-3 gap-4">
              {formData?.files?.map((fileUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={fileUrl}
                    alt={`Uploaded file ${index + 1}`}
                    className="w-full h-26 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-gray-300 text-white rounded-full p-1 px-2 hover:bg-red-700"
                    aria-label="Xóa"
                    style={{ transform: "translate(50%, -50%)" }}
                    type="button"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <label className="block text-gray-700">
                Tải hình ảnh học bạ:<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={pickMedia}
                className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                required
              />
            </div>
          </>
        </div>
      );
    } else if (formData.evaluation_method === "high_school_graduation_exam") {
      return (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2 font-semibold">
            <span>Môn học</span>
            <span>Điểm</span>
            <span>Lớp</span>
            <span>Học kì</span>
          </div>
          {formData?.subject_scores?.map((score, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 mt-2 items-center"
            >
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                {subjects?.find((sub) => sub.id === score.subject)?.name ||
                  "N/A"}
              </div>
              <input
                type="text"
                value={score.score}
                onChange={(e) =>
                  handleResultChange(index, "score", e.target.value)
                }
                className="p-2 border border-gray-300 rounded  bg-white"
                placeholder="Nhập điểm"
              />
              <input
                type="text"
                value={score.grade}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
              <input
                type="text"
                value={score.semester}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
            </div>
          ))}
        </div>
      );
    } else if (formData.evaluation_method === "grades_10_11_12") {
      return (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2 font-semibold">
            <span>Môn học</span>
            <span>Điểm</span>
            <span>Lớp</span>
            <span>Học kì</span>
          </div>
          {formData?.subject_scores?.map((score, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 mt-2 items-center"
            >
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                {subjects?.find((sub) => sub.id === score.subject)?.name ||
                  "N/A"}
              </div>
              <input
                type="text"
                value={score.score}
                onChange={(e) =>
                  handleResultChange(index, "score", e.target.value)
                }
                className="p-2 border border-gray-300 rounded  bg-white"
                placeholder="Nhập điểm"
              />
              <input
                type="text"
                value={score.grade}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
              <input
                type="text"
                value={score.semester}
                className="p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                readOnly
              />
            </div>
          ))}
          <>
            <div className="grid grid-cols-3 gap-4">
              {formData?.files?.map((fileUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={fileUrl}
                    alt={`Uploaded file ${index + 1}`}
                    className="w-full h-26 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-gray-300 text-white rounded-full p-1 px-2 hover:bg-red-700"
                    aria-label="Xóa"
                    style={{ transform: "translate(50%, -50%)" }}
                    type="button"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <label className="block text-gray-700">
                Tải hình ảnh học bạ:<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={pickMedia}
                className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                required
              />
            </div>
          </>
        </div>
      );
    } else if (formData.evaluation_method === "competency_assessment_exam") {
      return (
        <div className="mb-4">
          <label htmlFor="competency_assessment_exam_score">
            Điểm kiểm tra năng lực
          </label>
          <div className="w-full">
            <input
              id="competency_assessment_exam_score"
              type="text"
              value={formData.competency_assessment_exam_score?.score || ""}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  competency_assessment_exam_score: {
                    ...prevFormData.competency_assessment_exam_score,
                    score: e.target.value,
                  },
                }))
              }
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Nhập điểm"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const nav = useNavigate();

  useEffect(() => {
    const matchedLevel = allRegistrationForm?.academic_levels?.find(
      (level) => level.id === +educationLevel
    );

    if (matchedLevel) {
      setSelectedAcademic(matchedLevel?.need_evaluation_method);
    }
  }, [dispatch, educationLevel]);

  // const handleFileUpload = (event) => {
  //   // const selectedFile = event.target.files[0];

  //   // if (selectedFile) {
  //   //   const formData = new FormData();
  //   //   formData.append("file", selectedFile);
  //   //   dispatch(createMedia(formData)).then((reps) => {
  //   //     if (reps.payload) {
  //   //       setFormData((prevFormData) => ({
  //   //         ...prevFormData,
  //   //         files: [...prevFormData.files, reps.payload.data],
  //   //       }));
  //   //     }
  //   //   });
  //   // }

  // };

  const pickMedia = async () => {
    try {
      const { data } = await openMediaPicker({
        type: "photo",
        serverUploadUrl: "https://cds.bdu.edu.vn/apis/media",
      });

      console.log("Raw data:", data);

      // Kiểm tra và parse JSON
      let parsedData;
      try {
        parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData);
      } catch (parseError) {
        console.error("Failed to parse data:", parseError);
        return;
      }

      // Kiểm tra phản hồi hợp lệ
      if (parsedData.error === 0 && Array.isArray(parsedData.data?.urls)) {
        const processedUrls = parsedData.data.urls.map(
          (url) => new URL(url).href
        );

        // Cập nhật formData.files
        setFormData((prevFormData) => ({
          ...prevFormData,
          files: [...prevFormData.files, ...processedUrls],
        }));

        console.log("Updated formData.files:", processedUrls);
      } else {
        console.error("Invalid response structure:", parsedData);
      }
    } catch (error) {
      console.error("Error picking media:", error);
    }
  };

  const handleRemoveFile = (index) => {
    // Xóa file tại index cho trước
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: prevFormData.files.filter((_, i) => i !== index), // Lọc ra file không cần xóa
    }));
  };

  const handleEducationLevel = (index) => {
    setEducationLevel(index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: [],
    }));
  };

  const handleConfirm = () => {
    nav("/");
    dispatch(setStatus(false));
    setShowModal(false);
  };

  const handleCancel = () => {
    dispatch(setStatus(false));
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 mb-16">
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Đăng Ký Xét Tuyển Đại Học
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700">
              Họ tên:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="student.fullname"
              value={formData.student.fullname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Giới tính:<span className="text-red-500">*</span>
            </label>
            <select
              name="student.gender"
              value={formData.student.gender}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "student.gender",
                    value: e.target.value === "true",
                  },
                })
              }
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            >
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Ngày sinh:<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="student.date_of_birth"
              value={formData.student.date_of_birth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white "
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              CMND/CCCD:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="student.citizen_id"
              value={formData.student.citizen_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Email:<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="student.email"
              value={formData.student.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Số điện thoại:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="student.phone"
              value={formData.student.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Địa chỉ:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="student.address"
              value={formData.student.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Tỉnh:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="student.city"
              value={formData.student.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Trường THPT:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="student.high_school"
              value={formData.student.high_school}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Bậc học:<span className="text-red-500">*</span>
            </label>
            <select
              name="educationLevel"
              value={educationLevel}
              onChange={(e) => handleEducationLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
              required
            >
              <option value="">Chọn bậc học</option>
              {allRegistrationForm?.academic_levels?.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          {educationLevel && educationLevel != 0 && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Địa điểm đăng kí học:<span className="text-red-500">*</span>
              </label>
              <select
                name="location"
                value={location}
                onChange={(e) => setLocation(+e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                required
              >
                <option value="">Chọn địa điểm</option>
                {allRegistrationForm?.training_location?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {allMajors?.length > 0 && location && location !== 0 ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Ngành học:<span className="text-red-500">*</span>
                </label>
                <select
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                  required
                >
                  <option value="">Chọn ngành học</option>
                  {allMajors?.map((major) => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedAcademic && allEvaluation?.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Phương thức xét tuyển:
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="evaluation_method"
                    value={formData.evaluation_method}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                    required
                  >
                    <option value="">Chọn phương thức xét tuyển</option>
                    {allEvaluation?.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
          {formData.evaluation_method &&
            selectedAcademic &&
            formData.evaluation_method !== "competency_assessment_exam" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Khối xét tuyển:
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="college_exam_group"
                    value={+formData.college_exam_group}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                    required
                  >
                    <option value="">Chọn khối xét tuyển</option>
                    {allCollegeExamGroups?.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
                {(formData.college_exam_group && renderResultInputs()) || <></>}
              </>
            )}
          {formData.evaluation_method === "competency_assessment_exam" &&
            renderResultInputs()}
          {location && location !== 0 && !selectedAcademic ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                {formData?.files?.map((fileUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={fileUrl}
                      alt={`Uploaded file ${index + 1}`}
                      className="w-full h-26 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-gray-300 text-white rounded-full p-1 px-2 hover:bg-red-700"
                      aria-label="Xóa"
                      style={{ transform: "translate(50%, -50%)" }}
                      type="button"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div className="py-2">
                <label className="block text-gray-700">
                  Tải hình ảnh học bạ:
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  onChange={pickMedia}
                  className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                  required
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Đăng ký
            </button>
          </div>
        </form>
        {status && (
          <NotificationComponent
            title="Thông Báo"
            message="Đăng kí xét tuyển thành công"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RegisterForAdmission;
