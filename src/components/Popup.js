import React from "react";

import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup-container">
      <div className="popup-inner">{props.children}</div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
