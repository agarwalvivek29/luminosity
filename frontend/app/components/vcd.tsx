import React from "react";

const VcdGraph = ({vcd}:{vcd?: string}) => {
  return (
    <embed
      src={
        vcd|| "https://vc.drom.io/?github=agarwalvivek29/exec_files/main/test.vcd"
      }
      type="video/mp4"
      className="w-full h-96 rounded-lg"
    ></embed>
  );
};

export default VcdGraph;
