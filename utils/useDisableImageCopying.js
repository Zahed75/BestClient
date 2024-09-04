import { useEffect } from "react";

const useDisableImageCopying = () => {
  useEffect(() => {
    const disableContextMenu = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    const disableDragging = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("dragstart", disableDragging);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("dragstart", disableDragging);
    };
  }, []);
};

export default useDisableImageCopying;
