import { useEffect, useState, useRef } from "react";

interface Circle {
    id: number;
    x: number;
    y: number;
    size: number;
    hue: number;
    originalX: number;
    originalY: number;
}

interface MousePosition {
    x: number;
    y: number;
}

export default function Spider() {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const generateCircles = (): void => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const numCircles = Math.floor((width * height) / 8000);
        
        const newCircles = [];
        for (let i = 0; i < numCircles; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 4 + 2;
            const hue = Math.random() * 360;
            newCircles.push({ 
                id: i, 
                x, 
                y, 
                size, 
                hue,
                originalX: x,
                originalY: y 
            });
        }
        setCircles(newCircles);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    useEffect(() => {
        generateCircles();
        
        const handleResize = (): void => {
            setTimeout(generateCircles, 100);
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getCircleStyle = (circle: Circle): React.CSSProperties => {
        const distanceX = mousePosition.x - circle.x;
        const distanceY = mousePosition.y - circle.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 200;
        
        let x = circle.originalX;
        let y = circle.originalY;
        let opacity = 0.6;
        let brightness = 50;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const pullStrength = force * 30;
            
            x = circle.originalX + (distanceX * force * 0.3);
            y = circle.originalY + (distanceY * force * 0.3);
            opacity = 0.6 + (force * 0.4);
            brightness = 50 + (force * 30);
        }
        
        return {
            position: "absolute" as const,
            left: x,
            top: y,
            width: circle.size,
            height: circle.size,
            borderRadius: "50%",
            backgroundColor: `hsl(${circle.hue}, 100%, ${brightness}%)`,
            opacity: opacity,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translate(-50%, -50%)`,
            pointerEvents: "none" as const
        };
    };

    return (
        <div 
            ref={containerRef}
            className="relative min-h-screen w-full bg-gray-900 overflow-hidden "
            onMouseMove={handleMouseMove}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
            
            {/* Title */}
            <div className="relative z-20 h-screen max-w-6xl mx-auto">
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-6xl py-4 font-bold bg-gradient-to-r from-[#00A4C4]/70 to-[#13094D]/70 bg-clip-text text-transparent text-center leading-tight">
                        Animating 
                        <br />
                        Pattern
                    </h1>
                </div>
            </div>
            
            {/* Spider web effect - connecting lines */}
            <svg className="absolute inset-0 z-10 w-full h-full pointer-events-">
                {circles.map((circle, index) => {
                    const distanceToMouse = Math.sqrt(
                        Math.pow(mousePosition.x - circle.x, 2) + 
                        Math.pow(mousePosition.y - circle.y, 2)
                    );
                    
                    if (distanceToMouse < 150) {
                        return (
                            <line
                                key={`line-${circle.id}`}
                                x1={circle.x}
                                y1={circle.y}
                                x2={mousePosition.x}
                                y2={mousePosition.y}
                                stroke={`hsl(${circle.hue}, 100%, 60%)`}
                                strokeWidth="1"
                                opacity={Math.max(0, 0.4 - (distanceToMouse / 150) * 0.4)}
                            />
                        );
                    }
                    return null;
                })}
                
                {/* Connect nearby circles */}
                {circles.map((circle1, i) => 
                    circles.slice(i + 1).map((circle2, j) => {
                        const distance = Math.sqrt(
                            Math.pow(circle1.x - circle2.x, 2) + 
                            Math.pow(circle1.y - circle2.y, 2)
                        );
                        
                        if (distance < 80) {
                            return (
                                <line
                                    key={`connect-${i}-${j}`}
                                    x1={circle1.x}
                                    y1={circle1.y}
                                    x2={circle2.x}
                                    y2={circle2.y}
                                    stroke="rgba(255, 255, 255, 0.1)"
                                    strokeWidth="0.5"
                                />
                            );
                        }
                        return null;
                    })
                )}
            </svg>
            
            {/* Animated circles */}
            <div className="absolute inset-0 z-15">
                {circles.map((circle) => (
                    <div
                        key={circle.id}
                        style={getCircleStyle(circle)}
                    />
                ))}
            </div>
            
            {/* Custom cursor */}
            {/* <div 
                className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-30 mix-blend-difference"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: "translate(-50%, -50%)",
                    transition: "all 0.1s ease-out"
                }}
            /> */}
        </div>
    );
}