import React, { useState, useEffect } from 'react';

const Notification: React.FC<{ message: string }> = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    // Hide the notification after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center fit-content fixed top-0 left-0 right-0 bg-red-500 w-1/4 mx-auto text-white font-semibold px-4 py-3 rounded-md transform transition-transform ease-out duration-500 ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {message}
    </div>

  );
};

export default Notification;
