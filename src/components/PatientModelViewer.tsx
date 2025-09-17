import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BodyPart {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  relatedReports: string[];
}

const bodyParts: BodyPart[] = [
  { id: "brain", name: "Brain", x: 45, y: 5, width: 10, height: 8, relatedReports: ["r1"] },
  { id: "heart", name: "Heart", x: 43, y: 25, width: 14, height: 10, relatedReports: ["r3", "r6"] },
  { id: "chest", name: "Chest", x: 35, y: 20, width: 30, height: 20, relatedReports: ["r7"] },
  { id: "abdomen", name: "Abdomen", x: 38, y: 40, width: 24, height: 15, relatedReports: ["r2", "r9"] },
  { id: "arms", name: "Arms", x: 20, y: 25, width: 60, height: 20, relatedReports: [] },
  { id: "legs", name: "Legs", x: 35, y: 55, width: 30, height: 40, relatedReports: [] },
];

interface PatientModelViewerProps {
  onBodyPartClick?: (bodyPartId: string, relatedReports: string[]) => void;
  className?: string;
}

export function PatientModelViewer({ onBodyPartClick, className }: PatientModelViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isRotating]);

  const handleBodyPartClick = (part: BodyPart) => {
    setSelectedPart(part.id);
    onBodyPartClick?.(part.id, part.relatedReports);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div className={cn("relative h-full bg-gradient-mesh rounded-2xl p-6", className)} ref={containerRef}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card/80 backdrop-blur-sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card/80 backdrop-blur-sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsRotating(!isRotating)}
          className={cn("bg-card/80 backdrop-blur-sm", isRotating && "bg-primary text-primary-foreground")}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-card/80 backdrop-blur-sm"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* 3D Model Container */}
      <div className="relative h-full flex items-center justify-center">
        <div
          className="relative transition-all duration-500"
          style={{
            transform: `scale(${zoom}) rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Human Body SVG Model */}
          <svg
            viewBox="0 0 100 100"
            className="w-96 h-96"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.1))" }}
          >
            {/* Body Parts - Interactive Regions */}
            {bodyParts.map((part) => (
              <g key={part.id}>
                <rect
                  x={part.x}
                  y={part.y}
                  width={part.width}
                  height={part.height}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="0"
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedPart === part.id && "fill-primary/20 stroke-primary stroke-2"
                  )}
                  onMouseEnter={() => setSelectedPart(part.id)}
                  onMouseLeave={() => setSelectedPart(null)}
                  onClick={() => handleBodyPartClick(part)}
                />
                {selectedPart === part.id && (
                  <text
                    x={part.x + part.width / 2}
                    y={part.y - 2}
                    textAnchor="middle"
                    className="fill-primary text-xs font-semibold pointer-events-none"
                  >
                    {part.name}
                  </text>
                )}
              </g>
            ))}

            {/* Anatomical Model Placeholder */}
            <g className="opacity-90">
              {/* Head */}
              <ellipse cx="50" cy="8" rx="6" ry="7" className="fill-red-300 stroke-red-400" strokeWidth="0.5" />
              
              {/* Neck */}
              <rect x="48" y="14" width="4" height="4" className="fill-red-200" />
              
              {/* Torso */}
              <path
                d="M 40 18 L 60 18 L 58 40 L 42 40 Z"
                className="fill-red-300 stroke-red-400"
                strokeWidth="0.5"
              />
              
              {/* Arms */}
              <rect x="20" y="22" width="18" height="4" rx="2" className="fill-red-200" />
              <rect x="62" y="22" width="18" height="4" rx="2" className="fill-red-200" />
              
              {/* Hands */}
              <circle cx="18" cy="24" r="2.5" className="fill-red-200" />
              <circle cx="82" cy="24" r="2.5" className="fill-red-200" />
              
              {/* Pelvis */}
              <path
                d="M 42 40 L 58 40 L 56 50 L 44 50 Z"
                className="fill-red-300"
              />
              
              {/* Legs */}
              <rect x="44" y="50" width="5" height="35" rx="2" className="fill-red-200" />
              <rect x="51" y="50" width="5" height="35" rx="2" className="fill-red-200" />
              
              {/* Feet */}
              <ellipse cx="46.5" cy="88" rx="3" ry="2" className="fill-red-200" />
              <ellipse cx="53.5" cy="88" rx="3" ry="2" className="fill-red-200" />
              
              {/* Muscle Details */}
              <g className="opacity-60">
                {/* Chest muscles */}
                <path d="M 42 22 Q 45 24 48 22" className="stroke-red-400 fill-none" strokeWidth="0.3" />
                <path d="M 52 22 Q 55 24 58 22" className="stroke-red-400 fill-none" strokeWidth="0.3" />
                
                {/* Abdominal muscles */}
                <line x1="50" y1="26" x2="50" y2="38" className="stroke-red-400" strokeWidth="0.3" />
                <line x1="46" y1="28" x2="46" y2="36" className="stroke-red-400" strokeWidth="0.3" />
                <line x1="54" y1="28" x2="54" y2="36" className="stroke-red-400" strokeWidth="0.3" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 max-w-xs">
        <p className="text-sm font-medium text-card-foreground">Interactive 3D Model</p>
        <p className="text-xs text-muted-foreground mt-1">
          Click on body parts to view related medical reports
        </p>
      </div>
    </div>
  );
}