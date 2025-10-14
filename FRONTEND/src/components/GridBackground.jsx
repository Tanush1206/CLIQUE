import React from 'react';

// Import images directly
const imagePaths = [
  new URL('../../public/images/Screenshot 2025-08-29 at 10.20.48 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.21.51 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.22.50 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.23.26 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.23.53 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.24.12 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.24.34 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.24.48 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.25.03 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.25.17 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.25.34 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.25.50 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.26.04 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.26.21 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.26.37 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.26.57 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.27.27 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.30.11 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.30.26 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.30.36 AM.png', import.meta.url).href,
  new URL('../../public/images/Screenshot 2025-08-29 at 10.30.45 AM.png', import.meta.url).href
];

const GridBackground = () => {
  // Grid configuration - 3 columns, 7 rows total with inverted size order

  const gridItems = [
    // Left Column (7 rows)
    { id: 'l1', row: 1, col: 1, size: 'large', image: imagePaths[0] },
    { id: 'l2', row: 2, col: 1, size: 'medium', image: imagePaths[1] },
    { id: 'l3', row: 3, col: 1, size: 'small', image: imagePaths[2] },
    { id: 'l4', row: 4, col: 1, size: 'medium', image: imagePaths[3] },
    { id: 'l5', row: 5, col: 1, size: 'small', image: imagePaths[4] },
    { id: 'l6', row: 6, col: 1, size: 'medium', image: imagePaths[5] },
    { id: 'l7', row: 7, col: 1, size: 'large', image: imagePaths[6] },
    
    // Middle Column (7 rows)
    { id: 'm1', row: 1, col: 2, size: 'medium', image: imagePaths[7] },
    { id: 'm2', row: 2, col: 2, size: 'small', image: imagePaths[8] },
    { id: 'm3', row: 3, col: 2, size: 'large', image: imagePaths[9] },
    { id: 'm4', row: 4, col: 2, size: 'medium', image: imagePaths[10] },
    { id: 'm5', row: 5, col: 2, size: 'large', image: imagePaths[11] },
    { id: 'm6', row: 6, col: 2, size: 'small', image: imagePaths[12] },
    { id: 'm7', row: 7, col: 2, size: 'medium', image: imagePaths[13] },
    
    // Right Column (7 rows)
    { id: 'r1', row: 1, col: 3, size: 'large', image: imagePaths[14] },
    { id: 'r2', row: 2, col: 3, size: 'medium', image: imagePaths[15] },
    { id: 'r3', row: 3, col: 3, size: 'small', image: imagePaths[16] },
    { id: 'r4', row: 4, col: 3, size: 'medium', image: imagePaths[17] },
    { id: 'r5', row: 5, col: 3, size: 'small', image: imagePaths[18] },
    { id: 'r6', row: 6, col: 3, size: 'medium', image: imagePaths[19] },
    { id: 'r7', row: 7, col: 3, size: 'large', image: imagePaths[20] },
  ];

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return 'w-20 h-20';
      case 'medium':
        return 'w-28 h-28';
      case 'large':
        return 'w-36 h-36';
      default:
        return 'w-28 h-28';
    }
  };

  return (
    <div className="hidden md:flex md:w-1/2 overflow-hidden items-center justify-center relative h-screen bg-gradient-to-br from-slate-900/20 via-blue-900/30 to-slate-800/20">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-500/5 to-cyan-400/5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
      
      {/* Main container */}
      <div className="w-full max-w-3xl h-full p-8 relative z-10 flex items-center backdrop-blur-sm">
        {/* Outer grid with 7 rows */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Left Column - 7 rows */}
          <div className="flex flex-col justify-center space-y-4">
            {gridItems
              .filter(item => item.col === 1)
              .map(item => (
                <div 
                  key={item.id}
                  className={`${getSizeClasses(item.size)} rounded-2xl mx-auto transition-all duration-500 overflow-hidden hover:scale-105 hover:rotate-1 group cursor-pointer`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Grid item ${item.id}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to colored background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))';
                      }}
                    />
                  )}
                </div>
              ))}
          </div>

          {/* Middle Column - Same as outer columns */}
          <div className="flex flex-col justify-center space-y-4">
            {gridItems
              .filter(item => item.col === 2)
              .map(item => (
                <div 
                  key={item.id}
                  className={`${getSizeClasses(item.size)} rounded-2xl mx-auto transition-all duration-500 overflow-hidden hover:scale-105 hover:-rotate-1 group cursor-pointer`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Grid item ${item.id}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to colored background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))';
                      }}
                    />
                  )}
                </div>
              ))}
          </div>

          {/* Right Column - 7 rows */}
          <div className="flex flex-col justify-center space-y-4">
            {gridItems
              .filter(item => item.col === 3)
              .map(item => (
                <div 
                  key={item.id}
                  className={`${getSizeClasses(item.size)} rounded-2xl mx-auto transition-all duration-500 overflow-hidden hover:scale-105 hover:rotate-1 group cursor-pointer`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Grid item ${item.id}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to colored background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))';
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default GridBackground;