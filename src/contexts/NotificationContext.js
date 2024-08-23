import { notification } from 'antd';
import React, { createContext } from 'react';

const NotificationContext = createContext(null);

function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
