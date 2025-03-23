import React, { useState, useEffect } from "react";
import { images } from "../../assets/data";
import { io } from "socket.io-client";
import { fetchNotifications } from "../../utils/api";

const socket = io("https://zidio-task-management-10.onrender.com", { transports: ["websocket", "polling"] });

const Navbar = ({ toggleSidebar, user }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const handleNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  };

  useEffect(() => {
    handleNotificationPermission();

    const getNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
      console.log("Fetched notifications:", data);
    };
    getNotifications();

    const handleNotification = (notification) => {
      console.log("🔔 New Notification Received:", notification);
      setNotifications((prev) => [notification, ...prev]);
      setOpen(true);
      setTimeout(() => setOpen(false), 5000);

      if (Notification.permission === "granted") {
        const browserNotification = new Notification("📢 New Notification", {
          body: notification.message,
          icon: "/notification-icon.png",
        });

        browserNotification.onclick = () => {
          window.focus();
          setOpen(true);
        };
      }
    };

    socket?.on("receiveNotification", handleNotification);

    return () => {
      socket?.off("receiveNotification", handleNotification);
    };
  }, []);

  return (
    <div>
      <nav className="lg:w-[calc(100%-18.22%)] w-[99%] ml-3 border bg-lightase h-14 flex rounded-l-2xl rounded-r-2xl justify-between items-center lg:ml-[18.22%]" data-aos="fade" data-aos-duration="1000">
        <div className="burgermenu lg:hidden ml-6">
          <button className="text-3xl text-gray-500" onClick={toggleSidebar}>
            <i className="ri-menu-line"></i>
          </button>
        </div>

        <div className="serach-bar md:w-80 bg-white h-9 m-5 rounded-l-2xl rounded-r-2xl md:ml-10 p-1 relative" data-aos="fade-left" data-aos-duration="1500">
          <input type="text" className="md:w-full w-28 h-full p-2 pl-12 outline-none relative" placeholder="Search..." />
          <p className="absolute top-1 left-5 text-lg">
            <i className="ri-search-line"></i>
          </p>
        </div>

        <div className="right md:w-80 w-40 flex justify-center items-center p-1 h-12 -ml-18">
          <div className="relative">
            <button
              className="notification-div rounded-full w-10 h-10 bg-white flex justify-center items-center"
              data-aos="fade-right"
              data-aos-duration="1500"
              onClick={() => {
                if (Notification.permission !== "granted") {
                  handleNotificationPermission();
                  setOpen(!open);
                } else {
                  setOpen(!open);
                }
              }}
            >
              <p className="text-lg">
                <i className="ri-notification-4-line"></i>
              </p>
            </button>

            {/* Notification Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                <h4 className="text-gray-800 font-semibold mb-2">Notifications</h4>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="border-b last:border-0 p-2 text-gray-600 text-sm hover:bg-gray-100 rounded">
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No new notifications</p>
                )}
              </div>
            )}
          </div>

          <div className="Profile flex w-52 p-2 gap-4 justify-center items-center mr-5" data-aos="fade-right" data-aos-duration="1500">
            <div className="notification-div rounded-full w-10 h-10 flex justify-center items-center">
              <img src={images.p7} alt="Profile" className="rounded-full" />
            </div>
            <p className="font-base font-medium sr-only sm:not-sr-only text-lg">
              {user?.isAuthenticated ? user?.name : "Guest"}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
