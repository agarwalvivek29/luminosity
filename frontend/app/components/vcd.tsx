import React from "react";

const VcdGraph = () => {
  return (
    <embed
      src={
        "https://vc.drom.io/?github=agarwalvivek29/exec_files/main/waveforms/test.vcd"
      }
      type="video/mp4"
      className="w-full h-96"
    ></embed>
  );
};

export default VcdGraph;
