export type Theme = 'minimalist' | 'colorful' | 'retro' | 'dark';

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  created: number;
}

export interface DailyNote {
  id: string;
  day: number;
  note: string;
}

export interface PackingItem {
  id: string;
  text: string;
  packed: boolean;
  category: string;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  city: string;
  country: string;
  loading: boolean;
  error: string | null;
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface TripContextType {
  trip: Trip | null;
  notes: DailyNote[];
  packingItems: PackingItem[];
  hasTrip: boolean;
  createTrip: (tripData: Omit<Trip, 'id' | 'created'>) => void;
  resetTrip: () => void;
  getDayCount: () => number;
  addNote: (day: number, note: string) => void;
  updateNote: (id: string, note: string) => void;
  removeNote: (id: string) => void;
  addPackingItem: (text: string, category: string) => void;
  togglePackingItem: (id: string) => void;
  removePackingItem: (id: string) => void;
  clearPackedItems: () => void;
  getPackingStats: () => { total: number; packed: number; percentage: number };
  getTripUrl: () => string | null;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}