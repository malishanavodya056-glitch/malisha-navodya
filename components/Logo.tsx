
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 64 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full scale-150 animate-pulse-slow"></div>
      
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]"
      >
        {/* Geometric NM Monogram */}
        <path 
          d="M15 80V20L45 55V20H55V80L25 45V80H15Z" 
          fill="white" 
        />
        <path 
          d="M55 80V20L72.5 50L90 20V80H80V40L72.5 55L65 40V80H55Z" 
          fill="white" 
        />
        
        {/* Subtle accent line */}
        <path 
          d="M48 15L52 15" 
          stroke="rgba(239,68,68,0.8)" 
          strokeWidth="1" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
};

export default Logo;
