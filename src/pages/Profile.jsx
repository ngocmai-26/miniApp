import React, { useEffect, useState } from 'react';
import { Page } from 'zmp-ui';
import Footer from '../components/footer';
import { getUserInfo } from 'zmp-sdk/apis';

function Profile() {
  const actions= [
    { text: 'Thông tin tuyển sinh', link: '#admission' },
    { text: 'Cài đặt', link: '/UserInfo' },
    { text: 'Liên hệ', link: '#contact' },
    { text: 'Đăng xuất', link: '#logout' },  // Thay đổi thành 'Đăng nhập' nếu cần
  ]

  const [user, setUser] = useState({})

  useEffect(() => {
    getUserInfo({
      success: (data) => {
        setUser(data.userInfo);
      },
      fail: (error) => {
        console.log(error);
      }
    });
  }, []);


  return (
    <>
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden h-screen">
      <div className="flex items-center p-6">
        <img className="h-24 w-24 rounded-full object-cover" src={user.avatar} alt="User Avatar" />
        <div className="ml-4">
          <div className="text-2xl font-semibold text-black">{user.name}</div>
        </div>
      </div>
      <ul className="border-t border-gray-200">
        {actions.map((action, index) => (
          <li key={index} className="border-b">
            <a
              href={action.link}
              className="block text-md p-4 hover:bg-gray-100 text-gray-600 font-semibold"
            >
              {action.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
     <Footer /></>
  );
}

export default Profile;
