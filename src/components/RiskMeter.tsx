
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const RiskMeter: React.FC<RiskMeterProps> = ({ score, size = 'md' }) => {
  // Determine color based on score
  const getColor = (score: number) => {
    if (score < 30) return 'bg-trustshield-green';
    if (score < 70) return 'bg-trustshield-yellow';
    return 'bg-trustshield-red';
  };

  // Calculate rotation angle for the needle (from -90 to 90 degrees)
  const needleRotation = -90 + (score / 100) * 180;

  // Determine size
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-32 h-16',
    lg: 'w-48 h-24'
  };

  const needleSizes = {
    sm: 'w-1 h-8',
    md: 'w-1 h-16',
    lg: 'w-2 h-24'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <Card className={`overflow-hidden ${size === 'sm' ? 'p-2' : ''}`}>
      <CardHeader className={`pb-2 ${size === 'sm' ? 'p-2' : ''}`}>
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>Risk Score</span>
          <span className={`font-bold ${getColor(score).replace('bg-', 'text-')}`}>
            {score}/100
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`${size === 'sm' ? 'p-2' : ''}`}>
        <div className="relative flex justify-center">
          {/* Semicircle meter background */}
          <div className={`${sizeClasses[size]} rounded-t-full bg-gray-200 overflow-hidden relative`}>
            {/* Low risk segment */}
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-trustshield-green" />
            {/* Medium risk segment */}
            <div className="absolute bottom-0 left-1/3 w-1/3 h-full bg-trustshield-yellow" />
            {/* High risk segment */}
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-trustshield-red" />
            
            {/* Center point */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 z-10" />
            
            {/* Needle */}
            <div 
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${needleSizes[size]} bg-gray-800 origin-bottom z-20`}
              style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
            />
          </div>
        </div>
        
        {/* Labels */}
        <div className={`flex justify-between px-1 mt-1 ${textSizes[size]}`}>
          <div className="text-trustshield-green">Low</div>
          <div className="text-trustshield-yellow">Medium</div>
          <div className="text-trustshield-red">High</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMeter;
