// "use client";
// import initRd

// const initRDKit = (() => {
//     let rdkitLoadingPromise;
  
//     return () => {
//         if (!rdkitLoadingPromise) {
//         rdkitLoadingPromise = new Promise((resolve, reject) => {
//             initRDKitModule()
//             .then((RDKit) => {
//               window.RDKit = RDKit;
//               resolve(RDKit);
//             })
//             .catch((e) => {
//                 console.log(e)
//               reject();
//             });
//         });
//       }
  
//       return rdkitLoadingPromise;
//     };
//   })();
  
//   export default initRDKit;