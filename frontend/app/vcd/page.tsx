import React from "react";
// import Image from "next/image";
import Typing from "../components/Typing";

const page = () => {
  return (
    // <Image
    //   src="https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/rtl.svg"
    //   alt="RTL Test"
    //   width={500}
    //   height={500}
    //   typeof="image/svg+xml"
    //   className="bg-white"
    // />
    // <video
    //   src="https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/hello.mp4"
    //   width={500}
    //   height={500}
    //   className="bg-white"
    //   controls
    // >
    //   Your browser does not support the video tag.
    // </video>
    <video width="320" height="240" controls>
      <source src="https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/hello.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    // <img src='https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/rtl.svg' type="image/svg+xml" />
    // <svg href="https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/rtl_test.svg" height={100} width={100}/>
  );
};

export default page;
