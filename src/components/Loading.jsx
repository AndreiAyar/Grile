import React from "react";

const Loading = ({ second }) => {
  return !second ? (
    <div style={{ width: "30%", textAlign: "center", margin: "0 auto" }}>
      <img style={{ width: "40%" }} src="/loading.gif" />
    </div>
  ) : (
    <div style={{ width: "30%", textAlign: "center", margin: "0 auto" }}>
      <img style={{ width: "40%" }} src="/loading_second.gif" />
    </div>
  );
};

export default Loading;
