import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedback, getAllFeedback } from '../thunks/FeedBackThunk';
import Footer from '../components/footer';
import { setStatus } from '../slices/FeedBackSlide';
import NotificationComponent from '../components/notificationComponent';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    feedbacker_role: '',
    phone_number: '', 
  });
  const { allFeedback, status } = useSelector((state) => state.feedbacksReducer);


  useEffect(() => {
    dispatch(getAllFeedback());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(feedback(formData));
  };

  const handleConfirm = () => {
    nav("/");
    dispatch(setStatus(false))
    setShowModal(false);
  };

  const handleCancel = () => {
    dispatch(setStatus(false))
    setShowModal(false);
  };

  return (
    <div className="w-full mx-auto bg-white p-2 rounded-xl shadow-md h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Đóng Góp Ý Kiến</h2>
      <form className=' mb-16'>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Người đóng góp ý kiến
          </label>
          <input
            type="text"
            id="feedback"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Chủ đề đóng góp ý kiến"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="feedbacker_role" className="block text-sm font-medium text-gray-700">
            Vai trò
          </label>
          <select
            id="feedbacker_role"
            name="feedbacker_role"
            value={formData.feedbacker_role}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Chọn vai trò</option>
            {allFeedback?.role?.map((roleItem) => (
              <option key={roleItem.code} value={roleItem.code}>
                {roleItem.name}
              </option>
            ))}
          </select>
        </div>

        {/* NEW: Add the phone_number input field */}
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Nhập số điện thoại của bạn"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Ý kiến đóng góp
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full p-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Nhập ý kiến của bạn tại đây..."
            required
          ></textarea>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Gửi Ý Kiến
        </button>
      </form>
      {status && (
        <NotificationComponent
          title="Thông báo"
          message="Cám ơn bạn đã góp ý."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <Footer/>
    </div>
  );
};

export default Feedback;
