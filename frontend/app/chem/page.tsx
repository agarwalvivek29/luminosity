// import React from "react";
// import MoleculeStructure from "../components/MoleculeStructure/index.jsx";
// const page = () => {
//   return (
//     <div className="h-screen w-screen">
//       <MoleculeStructure
//         // id={`${key}`}
//         structure={"CC(=O)OC1=CC=CC=C1C(O)=O"}
//       />
//     </div>
//   );
// };

// export default page;

"use client";
import Molecule from "../components/MoleculeStructure/index.jsx";

export default function page(){
  return <Molecule />
}