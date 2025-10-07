import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

const EventCard = ({ 
  id,
  title, 
  description, 
  startAt, 
  location, 
  registrationLink,
  eventType = 'Event',
  color = 'blue',
  icon: Icon,
  className = '',
  additionalInfo = '',
  statusText = 'LIMITED SEATS AVAILABLE',
  buttonText = 'Learn More'
}) => {
  const date = startAt ? new Date(startAt) : null;
  
  // Date and time formatting options
  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const colorVariants = {
    blue: {
      bg: 'from-blue-500/20 to-indigo-500/20',
      accent: 'from-blue-400 to-indigo-400',
      icon: 'text-blue-300',
      iconBg: 'from-blue-500/20 to-indigo-500/20',
      dot: 'bg-blue-400',
      hover: 'hover:from-blue-500/30 hover:to-indigo-500/30',
      button: 'from-blue-400/20 to-transparent'
    },
    orange: {
      bg: 'from-orange-500/20 to-red-500/20',
      accent: 'from-orange-400 to-red-400',
      icon: 'text-orange-300',
      iconBg: 'from-orange-500/20 to-red-500/20',
      dot: 'bg-orange-400',
      hover: 'hover:from-orange-500/30 hover:to-red-500/30',
      button: 'from-orange-400/20 to-transparent'
    },
    green: {
      bg: 'from-green-500/20 to-emerald-500/20',
      accent: 'from-green-400 to-emerald-400',
      icon: 'text-green-300',
      iconBg: 'from-green-500/20 to-emerald-500/20',
      dot: 'bg-green-400',
      hover: 'hover:from-green-500/30 hover:to-emerald-500/30',
      button: 'from-green-400/20 to-transparent'
    }
  };

  const colors = colorVariants[color] || colorVariants.blue;

  return (
    <div className={`relative bg-white/5 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg w-full ${className}`}>
      <div className="flex flex-col md:flex-row">
        {/* Left side - 60% */}
        <div className="p-6 w-full md:w-[60%]">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${colors.iconBg} flex items-center justify-center mr-3`}>
                <Calendar className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <div>
                <div className="text-white/60 text-xs">Date & Time</div>
                <div className="text-white font-medium">
                  {date ? (
                    <>
                      {date.toLocaleDateString('en-US', dateOptions)}
                      {' • '}
                      {date.toLocaleTimeString('en-US', timeOptions)}
                    </>
                  ) : 'TBA'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${colors.iconBg} flex items-center justify-center mr-3`}>
                <MapPin className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <div>
                <div className="text-white/60 text-xs">Venue</div>
                <div className="text-white font-medium">{location || 'TBA'}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - 40% with extended gradient */}
        <div className={`relative p-6 flex flex-col justify-between w-full md:w-[40%] overflow-hidden`}>
          {/* Liquid glass background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} backdrop-blur-lg border-l border-white/10`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" 
                 style={{ '--tw-gradient-from-pos': '0% 0%', '--tw-gradient-to-pos': '100% 100%' }}>
            </div>
          </div>
          
          {/* Extended corner */}
          <div className={`absolute -left-6 top-0 bottom-0 w-6 bg-gradient-to-r ${colors.bg.replace('20', '0')} ${colors.bg.replace('20', '30')}`}></div>
          
          <div className="relative z-10">
            <div className="text-white/90 text-sm mb-4">
              <div className="font-medium mb-1 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full ${colors.dot} mr-2 animate-pulse`}></span>
                {eventType}
              </div>
              <div className="text-xs opacity-80">
                {additionalInfo || 
                  (eventType === 'TownHall' ? 'Important updates' : 
                   eventType === 'Fest' ? 'Cultural celebration' : 'Event details')}
              </div>
            </div>
            
            {registrationLink && (
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/20 group"
              >
                <span className="relative z-10 flex items-center">
                  Learn More
                  <svg className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className={`absolute inset-0 bg-gradient-to-r ${colors.button} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}></span>
              </a>
            )}
            
            <div className="mt-8 mb-2 text-center">
              <div className="text-white/60 text-xs tracking-wider font-medium">{statusText}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ticket perforation */}
      <div className="absolute top-0 right-[40%] h-full w-0.5 bg-gradient-to-b from-transparent via-gray-500/50 to-transparent z-10">
        <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-gray-900 border border-gray-700"></div>
        <div className="absolute -left-1.5 -bottom-1.5 w-3 h-3 rounded-full bg-gray-900 border border-gray-700"></div>
      </div>
    </div>
  );
};

export default EventCard;
//kuch bhi 