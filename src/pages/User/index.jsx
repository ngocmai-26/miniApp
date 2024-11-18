// UserInfo.js
import React, { useState, useEffect } from 'react';
import { getUserInfo } from 'zmp-sdk/apis';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo({
      success: (data) => {
        const { userInfo } = data;
        setUser(userInfo);
        setLoading(false);
      },
      fail: (error) => {
        setError(error);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ClipLoader color="#36d7b7" size={50} /> {/* Spinner component */}
    </div>)
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Không thể tải thông tin người dùng</div>;
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Thông tin người dùng</h1>
      <div className="text-center">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-xl font-medium">{user.name}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-gray-600">{user.email}</p>
        {/* Add more user fields here */}
      </div>
    </div>
  );
};

export default UserInfo;
