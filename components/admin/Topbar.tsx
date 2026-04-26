"use client";

import React, { /* useState, useRef, useEffect */ } from "react";
import { Search, /* Bell, */ Menu } from "lucide-react";
// import NotificationsPanel from "./Notification"; // Renamed for clarity

// Define props interface
interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  /* const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]); */

  return (
    <header className="sticky top-0 flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-8 py-3 sm:py-4 shadow-sm z-40">
      <div className="flex w-full items-center gap-2">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-1"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search bar */}
        <div className="hidden w-full sm:block">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full rounded-xl border-[1.173px] border-[#E8E3DC] bg-[#FAF9F7] py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Right side: Notifications + Profile */}
      <div className="flex items-center space-x-5">
        {/* <div className="relative" ref={notificationRef}>
          <button
            onClick={toggleNotifications}
            className="p-1 rounded-full hover:bg-gray-100 transition focus:outline-none "
            aria-expanded={showNotifications}
            aria-label="Toggle notifications panel"
          >
            <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white leading-none">
              3
            </span>
          </button>

          <NotificationsPanel
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div> */}

        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#8B6F47] text-white font-semibold text-base shrink-0">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-[#1A1410] truncate">
              Admin
            </div>
            <div className="text-xs text-gray-500 truncate">
              admin@thundra.com
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
