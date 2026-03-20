import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo = ({ className = '', size = 'md', showText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Abstract Infrastructure/Water Icon */}
        <svg 
          width={sizes[size].icon} 
          height={sizes[size].icon} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          {/* Outer Ring */}
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-20" />
          
          {/* Main "W" Structure / Pipe network */}
          <path 
            d="M8 12V28M8 28H32M32 28V12" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M14 20L20 26L26 20" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Water Drop Element */}
          <path 
            d="M20 10C20 10 16 14 16 16.5C16 18.7091 17.7909 20.5 20 20.5C22.2091 20.5 24 18.7091 24 16.5C24 14 20 10 20 10Z" 
            fill="currentColor" 
            className="text-surface-tint"
          />
          
          {/* Precision Crosshair */}
          <path d="M20 4V8M20 32V36M4 20H8M32 20H36" stroke="currentColor" strokeWidth="1" className="opacity-40" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-headline font-extrabold tracking-tighter text-primary leading-none uppercase`}>
            WSE <span className="text-surface-tint">Sydney</span>
          </span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 leading-none">
            Precision Estimating
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
