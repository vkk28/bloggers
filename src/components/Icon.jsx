import React from "react";

function Icon({ image }) {
    return (
      <div className="rounded-xl w-7 h-7">
        <img src={image} alt="Logo"  />
      </div>
    );
  }

export default Icon;
