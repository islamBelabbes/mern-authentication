import React from "react";
import { ClipLoader } from "react-spinners";
function BlockUi({ children, blocked, className, overlay = true }) {
  return (
    <div className="relative">
      {blocked && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center cursor-not-allowed ${
            overlay && "overlay"
          } ${className}`}
        >
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      {children}
    </div>
  );
}

export default BlockUi;
