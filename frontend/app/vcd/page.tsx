import React from "react";
import Image from "next/image";
import Typing from "../components/Typing";

const page = () => {
  return (
    // <img
    //   src="https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/output_test.png"
    //   alt="RTL Test"
    //   width={500}
    //   height={500}
    // />
    <Typing />
    // <img src='https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/rtl_test.svg' type="image/svg+xml" />
    // <svg href="https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/rtl_test.svg" height={100} width={100}/>
  );

};

export default page;
