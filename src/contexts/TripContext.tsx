import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Trip, DailyNote, PackingItem, TripContextType } from '../types';

// Default categories for packing list
const DEFAULT_CATEGORIES = [
  'Essentials',
  'Clothing',
  'Toiletries',
  'Electronics',
  'Documents',
  'Miscellaneous'
];

// Initialize context with default values
const TripContext = createContext<TripContextType>({
  trip: null,
  notes: [],
  packingItems: [],
  hasTrip: false,
  createTrip: () => {},
  resetTrip: () => {},
  getDayCount: () => 0,
  addNote: () => {},
  updateNote: () => {},
  removeNote: () => {},
  addPackingItem: () => {},
  togglePackingItem: () => {},
  removePackingItem: () => {},
  clearPackedItems: () => {},
  getPackingStats: () => ({ total: 0, packed: 0, percentage: 0 }),
  getTripUrl: () => null,
});

// Get trip ID from URL if present
const getTripIdFromUrl = (): string | null => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('trip');
  }
  return null;
};

// Update the URL with trip ID
const updateUrlWithTripId = (id: string | null) => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set('trip', id);
    } else {
      url.searchParams.delete('trip');
    }
    window.history.replaceState({}, '', url);
  }
};

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const urlTripId = getTripIdFromUrl();
  
  // Local storage hooks for trip data
  const [trip, setTrip] = useLocalStorage<Trip | null>('tripvibe-trip', null);
  const [notes, setNotes] = useLocalStorage<DailyNote[]>('tripvibe-notes', []);
  const [packingItems, setPackingItems] = useLocalStorage<PackingItem[]>('tripvibe-packing', []);
  
  // Set up default packing items if none exist
  useEffect(() => {
    if (trip && packingItems.length === 0) {
      const defaultItems: PackingItem[] = [
        { id: uuidv4(), text: 'Passport/ID', packed: false, category: 'Essentials' },
        { id: uuidv4(), text: 'Phone charger', packed: false, category: 'Electronics' },
        { id: uuidv4(), text: 'Toothbrush', packed: false, category: 'Toiletries' },
        { id: uuidv4(), text: 'T-shirts', packed: false, category: 'Clothing' },
        { id: uuidv4(), text: 'Medication', packed: false, category: 'Essentials' },
      ];
      setPackingItems(defaultItems);
    }
  }, [trip, packingItems.length, setPackingItems]);
  
  // Load shared trip if URL contains trip ID
  useEffect(() => {
    if (urlTripId && !trip) {
      // In a real app, this would fetch trip data from a backend
      // For this demo, we'll just check if there is any data in localStorage
      const localTrip = localStorage.getItem('tripvibe-trip');
      if (localTrip) {
        const tripData = JSON.parse(localTrip);
        setTrip(tripData);
      }
    }
  }, [urlTripId, trip, setTrip]);
  
  const hasTrip = trip !== null;

  // Create new trip
  const createTrip = (tripData: Omit<Trip, 'id' | 'created'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: uuidv4(),
      created: Date.now()
    };
    
    setTrip(newTrip);
    updateUrlWithTripId(newTrip.id);
  };
  
  // Reset trip and all associated data
  const resetTrip = () => {
    // Clear all trip data from localStorage
    localStorage.removeItem('tripvibe-trip');
    localStorage.removeItem('tripvibe-notes');
    localStorage.removeItem('tripvibe-packing');
    
    // Reset state
    setTrip(null);
    setNotes([]);
    setPackingItems([]);
    
    // Remove trip ID from URL
    updateUrlWithTripId(null);
    
    // Force reload the page to ensure clean state
    window.location.href = window.location.pathname;
  };
  
  const getDayCount = (): number => {
    if (!trip) return 0;
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  // Notes management
  const addNote = (day: number, note: string) => {
    if (!note.trim()) return;
    
    const newNote: DailyNote = {
      id: uuidv4(),
      day,
      note
    };
    
    setNotes([...notes, newNote]);
  };
  
  const updateNote = (id: string, note: string) => {
    setNotes(notes.map(n => n.id === id ? {...n, note} : n));
  };
  
  const removeNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // Packing list management
  const addPackingItem = (text: string, category: string = 'Miscellaneous') => {
    if (!text.trim()) return;
    
    const newItem: PackingItem = {
      id: uuidv4(),
      text,
      packed: false,
      category: DEFAULT_CATEGORIES.includes(category) ? category : 'Miscellaneous'
    };
    
    setPackingItems([...packingItems, newItem]);
  };
  
  const togglePackingItem = (id: string) => {
    setPackingItems(packingItems.map(item => 
      item.id === id ? {...item, packed: !item.packed} : item
    ));
  };
  
  const removePackingItem = (id: string) => {
    setPackingItems(packingItems.filter(item => item.id !== id));
  };
  
  const clearPackedItems = () => {
    setPackingItems(packingItems.filter(item => !item.packed));
  };
  
  const getPackingStats = () => {
    const total = packingItems.length;
    const packed = packingItems.filter(item => item.packed).length;
    const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);
    
    return { total, packed, percentage };
  };
  
  const getTripUrl = (): string | null => {
    if (!trip) return null;
    const url = new URL(window.location.href);
    url.searchParams.set('trip', trip.id);
    return url.toString();
  };

  const contextValue: TripContextType = {
    trip,
    notes,
    packingItems,
    hasTrip,
    createTrip,
    resetTrip,
    getDayCount,
    addNote,
    updateNote,
    removeNote,
    addPackingItem,
    togglePackingItem,
    removePackingItem,
    clearPackedItems,
    getPackingStats,
    getTripUrl,
  };

  return (
    <TripContext.Provider value={contextValue}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);