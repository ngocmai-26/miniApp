import React from 'react';

const NotificationComponent = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          {/* <button onClick={onCancel} className="text-gray-500">
            Để sau
          </button> */}
          <button onClick={onConfirm} className="text-blue-500">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
