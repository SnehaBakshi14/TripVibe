import React, { useState } from 'react';
import { useTrip } from './contexts/TripContext';
import { useTheme } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import CountdownTimer from './components/CountdownTimer';
import DailyPlanner from './components/DailyPlanner';
import PackingList from './components/PackingList';
import Weather from './components/Weather';
import Itinerary from './components/Itinerary';
import TripForm from './components/TripForm';
import { Plane, RotateCcw, PlusCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { trip, hasTrip, resetTrip } = useTrip();
  const { theme } = useTheme();
  const [showTripForm, setShowTripForm] = useState(false);
  
  // Apply theme-specific classes to background
  const getContainerClasses = () => {
    const baseClasses = 'min-h-screen transition-colors duration-500';
    
    switch (theme) {
      case 'minimalist':
        return `${baseClasses} bg-minimalist-background`;
      case 'colorful':
        return `${baseClasses} bg-colorful-background`;
      case 'retro':
        return `${baseClasses} bg-retro-background`;
      case 'dark':
        return `${baseClasses} bg-dark-background`;
      default:
        return `${baseClasses} bg-minimalist-background`;
    }
  };

  return (
    <div className={getContainerClasses()}>
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Plane className="mr-2" size={24} />
            <h1 className="text-2xl font-bold font-display">TripVibe</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            
            {hasTrip && (
              <button 
                onClick={resetTrip}
                className="p-2 rounded-lg flex items-center opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Reset trip"
                title="Reset trip"
              >
                <RotateCcw size={20} />
              </button>
            )}
          </div>
        </header>

        <main>
          {!hasTrip ? (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 text-4xl">
                  <Plane className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold font-display mb-2">Plan Your Next Adventure</h1>
                <p className="opacity-70">
                  Create a trip to start your countdown, plan daily activities, 
                  and keep track of your packing list.
                </p>
              </div>
              
              <button
                onClick={() => setShowTripForm(true)}
                className="px-6 py-3 rounded-xl flex items-center justify-center gap-2 
                         font-medium mx-auto shadow-md hover:shadow-lg 
                         transition-all duration-200"
              >
                <PlusCircle size={20} />
                <span>Create a Trip</span>
              </button>
              
              {showTripForm && (
                <TripForm onClose={() => setShowTripForm(false)} />
              )}
            </div>
          ) : (
            <>
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold font-display">{trip?.name}</h1>
                </div>
                
                <CountdownTimer 
                  targetDate={trip?.startDate || null} 
                  label={`Countdown to ${trip?.destination}`} 
                />
              </section>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <DailyPlanner />
                <PackingList />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Weather />
                <Itinerary />
              </div>
            </>
          )}
        </main>
      </div>
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: theme === 'dark' ? '#1E293B' : '#FFF',
            color: theme === 'dark' ? '#E2E8F0' : '#0F172A',
          },
        }}
      />
    </div>
  );
}

export default App;