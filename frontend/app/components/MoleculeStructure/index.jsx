// "use client";

// import { useEffect } from "react";

// export default function Molecule(){
//     const UNIQUEID = 1738879681528634;
//     useEffect(() => {
//         const script = document.createElement("script")
//         script.src = `
//                     <div id="3dmolviewer_${UNIQUEID}"  style="position: relative; width: 640px; height: 480px;">
//                     <p id="3dmolwarning_UNIQUEID" style="background-color:#ffcccc;color:black">3Dmol.js failed to load for some reason.  Please check your browser console for error messages.<br></p>
//                     </div>
//             <script>

//             var loadScriptAsync = function(uri){
//             return new Promise((resolve, reject) => {
//                 //this is to ignore the existence of requirejs amd
//                 var savedexports, savedmodule;
//                 if (typeof exports !== 'undefined') savedexports = exports;
//                 else exports = {}
//                 if (typeof module !== 'undefined') savedmodule = module;
//                 else module = {}

//                 var tag = document.createElement('script');
//                 tag.src = uri;
//                 tag.async = true;
//                 tag.onload = () => {
//                     exports = savedexports;
//                     module = savedmodule;
//                     resolve();
//                 };
//             var firstScriptTag = document.getElementsByTagName('script')[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//             });
//             };

//             if(typeof $3Dmolpromise === 'undefined') {
//             $3Dmolpromise = null;
//             $3Dmolpromise = loadScriptAsync('https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.4.2/3Dmol-min.js');
//             }

//             var viewer_${UNIQUEID} = null;
//             var warn = document.getElementById("3dmolwarning_UNIQUEID");
//             if(warn) {
//                 warn.parentNode.removeChild(warn);
//             }
//             $3Dmolpromise.then(function() {
//             viewer_${UNIQUEID} = $3Dmol.createViewer(document.getElementById("3dmolviewer_${UNIQUEID}"),{backgroundColor:"white"});
//             viewer_${UNIQUEID}.zoomTo();
//                 viewer_${UNIQUEID}.addModel("\n     RDKit          3D\n\n 24 24  0  0  0  0  0  0  0  0999 V2000\n    2.2440    0.5421    0.2047 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9464    0.2185    0.8859 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3293   -1.0440    0.3249 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1830   -0.9440    0.2913 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6735    0.2229   -0.5428 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5825    1.2694   -0.5201 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0361    1.2394    0.7064 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0330    2.5586   -0.7389 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8616    0.6522    0.0394 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6580   -2.1502   -0.2516 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8240   -1.3727   -0.9182 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1861   -0.4660    0.3651 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6580    1.4648    0.6596 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0895    0.7718   -0.8820 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1414    0.0988    1.9563 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5562   -1.8762    1.0172 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5261   -0.8327    1.3461 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8258   -0.1806   -1.5653 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1216    1.0325   -1.3519 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9626    2.6466   -1.0132 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.3866    1.2765   -0.5010 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8502   -2.8024    0.4492 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4344   -2.1750   -0.8664 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.9759   -0.1501    0.9052 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  6  8  1  0\n  5  9  1  0\n  4 10  1  0\n  3 11  1  0\n  1 12  1  0\n  7  2  1  0\n  1 13  1  0\n  1 14  1  0\n  2 15  1  0\n  3 16  1  0\n  4 17  1  0\n  5 18  1  0\n  6 19  1  0\n  8 20  1  0\n  9 21  1  0\n 10 22  1  0\n 11 23  1  0\n 12 24  1  0\nM  END\n","mol");
//                 viewer_${UNIQUEID}.setStyle({"stick": {}});
//                 viewer_${UNIQUEID}.setBackgroundColor("0xeeeeee");
//                 viewer_${UNIQUEID}.zoomTo();

//             viewer_${UNIQUEID}.render();
//             });
//             </script>
//         `;
//         script.async = true
//         document.body.appendChild(script)
    
//         script.onload = () => {
//         //   if (viewerRef.current) {
//         //     const viewer = window.$3Dmol.createViewer(viewerRef.current, {
//         //       backgroundColor: "white",
//         //     })
//         //     setViewerInstance(viewer)
//         //     loadMolecule(viewer, pdbId)
//         //   }

//         }
    
//         return () => {
//           document.body.removeChild(script)
//         }
//     }, []) // Added pdbId to the dependency array

//     return <div>
//         3D Molecule Viewer
//     </div>
// }

"use client";

import React, { useEffect, useRef } from "react";

export default function Molecule() {
    const viewerRef = useRef(null);
    // const UNIQUEID = 1738879681528634;
    const UNIQUEID = 17389636806801507;

    useEffect(() => {
        // Load 3Dmol.js script
        const load3Dmol = async () => {
            if (typeof window.$3Dmol === 'undefined') {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.4.2/3Dmol-min.js';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
        };

        const initViewer = async () => {
            try {
                await load3Dmol();
                
                if (viewerRef.current) {
                    // Create viewer
                    const viewer = window.$3Dmol.createViewer(viewerRef.current, {
                        backgroundColor: "white"
                    });

                    // Add molecule model
                    // viewer.addModel(`
                    // RDKit          3D\n\n 24 24  0  0  0  0  0  0  0  0999 V2000\n    2.2440    0.5421    0.2047 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9464    0.2185    0.8859 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3293   -1.0440    0.3249 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1830   -0.9440    0.2913 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6735    0.2229   -0.5428 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5825    1.2694   -0.5201 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0361    1.2394    0.7064 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0330    2.5586   -0.7389 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8616    0.6522    0.0394 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6580   -2.1502   -0.2516 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8240   -1.3727   -0.9182 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1861   -0.4660    0.3651 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6580    1.4648    0.6596 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0895    0.7718   -0.8820 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1414    0.0988    1.9563 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5562   -1.8762    1.0172 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5261   -0.8327    1.3461 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8258   -0.1806   -1.5653 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1216    1.0325   -1.3519 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9626    2.6466   -1.0132 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.3866    1.2765   -0.5010 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8502   -2.8024    0.4492 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4344   -2.1750   -0.8664 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.9759   -0.1501    0.9052 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  6  8  1  0\n  5  9  1  0\n  4 10  1  0\n  3 11  1  0\n  1 12  1  0\n  7  2  1  0\n  1 13  1  0\n  1 14  1  0\n  2 15  1  0\n  3 16  1  0\n  4 17  1  0\n  5 18  1  0\n  6 19  1  0\n  8 20  1  0\n  9 21  1  0\n 10 22  1  0\n 11 23  1  0\n 12 24  1  0\nM  END\n`, "mol");

                    viewer.addModel(`
                    RDKit          3D\n\n  3  2  0  0  0  0  0  0  0  0999 V2000\n   -1.1478    0.0731    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0230   -0.3302    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1248   -0.8805    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  2  0\nM  END`, "mol");
    
                    // Set style and render
                    viewer.setStyle({"stick": {}});
                    viewer.setBackgroundColor("#000000");
                    viewer.zoomTo();
                    viewer.render();
                }
            } catch (error) {
                console.error("Error initializing 3Dmol viewer:", error);
            }
        };

        initViewer();

        // Cleanup
        return () => {
            if (viewerRef.current) {
                // Clean up viewer if needed
                viewerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div>
            <div
                ref={viewerRef}
                id={`3dmolviewer_${UNIQUEID}`}
                style={{
                    position: "relative",
                    width: "640px",
                    height: "480px"
                }}
            >
                <p 
                    id={`3dmolwarning_${UNIQUEID}`}
                    style={{
                        backgroundColor: "#000",
                        color: "black"
                    }}
                >
                    3Dmol.js failed to load. Please check your browser console for error messages.
                </p>
            </div>
        </div>
    );
}