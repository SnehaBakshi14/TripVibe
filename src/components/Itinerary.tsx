import React, { useState } from 'react';
import { useTrip } from '../contexts/TripContext';
import { formatDate, getTripDurationText } from '../utils/dateUtils';
import { Share2, ClipboardCopy, Map } from 'lucide-react';

const Itinerary: React.FC = () => {
  const { trip, getTripUrl } = useTrip();
  const [copied, setCopied] = useState(false);

  if (!trip) {
    return null;
  }

  const tripUrl = getTripUrl();
  
  const copyToClipboard = async () => {
    if (!tripUrl) return;
    
    try {
      await navigator.clipboard.writeText(tripUrl);
      setCopied(true);
      
      // Reset "copied" state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };
  
  const duration = getTripDurationText(trip.startDate, trip.endDate);

  return (
    <div className="border rounded-xl p-4 shadow-sm animate-fadeIn">
      <div className="flex items-center mb-4">
        <Map size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">Trip Details</h2>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-sm opacity-70">Destination</div>
          <div className="text-xl font-semibold">{trip.destination}</div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="text-sm opacity-70">From</div>
            <div>{formatDate(trip.startDate)}</div>
          </div>
          <div className="flex-1">
            <div className="text-sm opacity-70">To</div>
            <div>{formatDate(trip.endDate)}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm opacity-70">Duration</div>
          <div>{duration}</div>
        </div>

        {tripUrl && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="flex items-center text-sm font-medium mb-2">
              <Share2 size={16} className="mr-2 opacity-70" />
              Share with friends
            </h3>
            
            <div className="flex items-center">
              <div className="flex-1 text-xs opacity-70 overflow-hidden text-ellipsis whitespace-nowrap">
                {tripUrl.substring(0, 30)}...
              </div>
              <button 
                onClick={copyToClipboard}
                className="ml-2 px-3 py-1.5 text-xs rounded flex items-center 
                         shadow-sm hover:shadow transition-shadow duration-200"
              >
                {copied ? (
                  <span className="flex items-center">
                    <Check size={14} className="mr-1" /> Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ClipboardCopy size={14} className="mr-1" /> Copy link
                  </span>
                )}
              </button>
            </div>
            
            <p className="text-xs opacity-70 mt-2">
              Once shared, friends can view and collaborate on your trip plans.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Import Check icon for the copy success state
const Check = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Itinerary;