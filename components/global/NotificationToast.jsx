import { hideNotification } from "@/redux/slice/notificationSlice";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificationToast = () => {
  const dispatch = useDispatch();
  const { isVisible, message } = useSelector((state) => state.notification);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ opacity: { duration: 0.6 }, y: { duration: 0.6 } }}
          className={`
            fixed top-0 left-0 w-full bg-primary text-slate-100 px-4 py-3 shadow-lg flex justify-between items-center z-50 md:px-8`}
        >
          <span>{message}</span>
          <button
            onClick={() => dispatch(hideNotification())}
            className="text-slate-100 hover:text-slate-200 bg-transparent border-none ml-4 font-bold cursor-pointer text-lg"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
