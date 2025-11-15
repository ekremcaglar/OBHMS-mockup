import React from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-5 right-5 z-50 w-80">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-lg mb-2 text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <div className="flex justify-between items-center">
            <p className="font-bold">{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</p>
            <button onClick={() => removeNotification(notification.id)} className="text-white">&times;</button>
          </div>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
