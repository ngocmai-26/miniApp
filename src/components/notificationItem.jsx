// src/components/NotificationItem.js
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NotificationItem = ({ notification }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img
        src={notification.userAvatar}
        alt="User Avatar"
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="ml-4 flex-1">
        <p className="text-sm text-gray-600">{notification.content}</p>
        <p className="text-xs text-gray-500">{notification.time}</p>
      </div>
      
      <FontAwesomeIcon icon={faEllipsis} className="nav-icon" />
    </div>
  );
};

export default NotificationItem;
