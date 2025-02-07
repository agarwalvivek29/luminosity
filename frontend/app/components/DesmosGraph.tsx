import React, { useEffect, useRef } from "react";

declare global {
    interface Window {
        Desmos: any;
        desmosScriptLoaded?: boolean;
    }
}

export default function DesmosGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<any>(null);

    useEffect(() => {
        const initializeCalculator = () => {
            if (containerRef.current && !calculatorRef.current) {
                calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
                    expressions: true,
                });

                // Set initial equation
                calculatorRef.current.setExpressions([
                    { id: "1", latex: "x + y = 1" },
                ]);
            }
        };

        if (!window.desmosScriptLoaded) {
            const script = document.createElement("script");
            script.src = "https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
            script.async = true;
            script.onload = () => {
                window.desmosScriptLoaded = true;
                initializeCalculator();
            };
            document.body.appendChild(script);
        } else {
            initializeCalculator();
        }

        return () => {
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
                calculatorRef.current = null;
            }
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
}
