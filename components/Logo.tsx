
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-24 h-24" }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Listras de movimento laterais */}
      <rect x="15" y="70" width="35" height="10" rx="5" transform="rotate(-25 15 70)" fill="#84cc16" />
      <rect x="18" y="100" width="35" height="10" rx="5" transform="rotate(-25 18 100)" fill="#1e40af" />
      <rect x="25" y="130" width="35" height="10" rx="5" transform="rotate(-25 25 130)" fill="#84cc16" />
      
      {/* Marcador (Pin) Azul */}
      <path 
        d="M115 20C81.8629 20 55 46.8629 55 80C55 113.137 115 180 115 180C115 180 175 113.137 175 80C175 46.8629 148.137 20 115 20Z" 
        fill="#1e40af" 
      />
      
      {/* Círculo Branco Interno */}
      <circle cx="115" cy="80" r="45" fill="white" />
      
      {/* Letra P Verde */}
      <path 
        d="M100 55H120C128.284 55 135 61.7157 135 70C135 78.2843 128.284 85 120 85H112V105H100V55ZM112 73V67H118C119.105 67 120 67.8954 120 69C120 70.1046 119.105 71 118 71H112V73Z" 
        fill="#84cc16" 
        stroke="#84cc16"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
