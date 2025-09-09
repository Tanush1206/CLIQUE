import React from 'react';

const GridBackground = () => {
  // Grid configuration - 3 columns, 7 rows total with inverted size order
  // Sample image paths - replace these with your actual image paths in the public/images directory
  const imagePaths = [
    '/images/Screenshot 2025-08-29 at 10.20.48 AM.png',
    '/images/Screenshot 2025-08-29 at 10.21.51 AM.png',
    '/images/Screenshot 2025-08-29 at 10.22.50 AM.png',
    '/images/Screenshot 2025-08-29 at 10.23.26 AM.png',
    '/images/Screenshot 2025-08-29 at 10.23.53 AM.png',
    '/images/Screenshot 2025-08-29 at 10.24.12 AM.png',
    '/images/Screenshot 2025-08-29 at 10.24.34 AM.png',
    '/images/Screenshot 2025-08-29 at 10.24.48 AM.png',
    '/images/Screenshot 2025-08-29 at 10.25.03 AM.png',
    '/images/Screenshot 2025-08-29 at 10.25.17 AM.png',
    '/images/Screenshot 2025-08-29 at 10.25.34 AM.png',
    '/images/Screenshot 2025-08-29 at 10.25.50 AM.png',
    '/images/Screenshot 2025-08-29 at 10.26.04 AM.png',
    '/images/Screenshot 2025-08-29 at 10.26.21 AM.png',
    '/images/Screenshot 2025-08-29 at 10.26.37 AM.png',
    '/images/Screenshot 2025-08-29 at 10.26.57 AM.png',
    '/images/Screenshot 2025-08-29 at 10.27.27 AM.png',
    '/images/Screenshot 2025-08-29 at 10.30.11 AM.png',
    '/images/Screenshot 2025-08-29 at 10.30.26 AM.png',
    '/images/Screenshot 2025-08-29 at 10.30.36 AM.png',
    '/images/Screenshot 2025-08-29 at 10.30.45 AM.png'
  ];

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
    <div className="hidden md:flex md:w-1/2 overflow-hidden bg-white/5 items-center justify-center relative h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-white/5"></div>
      
      {/* Main container */}
      <div className="w-full max-w-3xl h-full p-8 relative z-10 flex items-center">
        {/* Outer grid with 7 rows */}
        <div className="grid grid-cols-3 gap-6 w-full">
          {/* Left Column - 7 rows */}
          <div className="flex flex-col justify-center space-y-6">
            {gridItems
              .filter(item => item.col === 1)
              .map(item => (
                <div 
                  key={item.id}
                  className={`${getSizeClasses(item.size)} rounded-3xl mx-auto transition-all duration-300 overflow-hidden`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Grid item ${item.id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to colored background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = item.col === 2 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  )}
                </div>
              ))}
          </div>

          {/* Middle Column - Same as outer columns */}
          <div className="flex flex-col justify-center space-y-6">
            {gridItems
              .filter(item => item.col === 2)
              .map(item => (
                <div 
                  key={item.id}
                  className={`${getSizeClasses(item.size)} rounded-3xl mx-auto transition-all duration-300 overflow-hidden`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Grid item ${item.id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to colored background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = item.col === 2 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  )}
                </div>
              ))}
          </div>

          {/* Right Column - 7 rows */}
          <div className="flex flex-col justify-center space-y-6">
            {gridItems
              .filter(item => item.col === 3)
              .map(item => (
                <div 
                  key={item.id}
                  className={`${getSizeClasses(item.size)} rounded-3xl mx-auto transition-all duration-300 overflow-hidden`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Grid item ${item.id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to colored background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = item.col === 2 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default GridBackground;