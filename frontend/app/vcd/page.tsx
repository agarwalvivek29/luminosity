import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen">
      <embed
        src={"https://vc.drom.io/?github=dpretet/vcd/master/test1.vcd"}
        type="video/mp4"
        width="100%"
        height="100%"
      ></embed>
    </div>
  );
};

export default page;
