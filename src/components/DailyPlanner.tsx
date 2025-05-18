import React, { useState, useEffect, useCallback } from 'react';
import { useTrip } from '../contexts/TripContext';
import { formatShortDate, generateDayList } from '../utils/dateUtils';
import { CalendarDays, Plus, Trash2 } from 'lucide-react';

const DailyPlanner: React.FC = () => {
  const { trip, notes, addNote, updateNote, removeNote } = useTrip();
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [noteText, setNoteText] = useState<string>('');
  const [days, setDays] = useState<{ date: Date; dayNumber: number }[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Generate day list when trip changes
  useEffect(() => {
    if (trip) {
      const dayList = generateDayList(trip.startDate, trip.endDate);
      setDays(dayList);
      
      // Set selected day to 1 when trip changes
      setSelectedDay(1);
    }
  }, [trip]);

  // Get notes for the selected day
  const dayNotes = notes.filter(note => note.day === selectedDay);

  // Handle adding a new note
  const handleAddNote = useCallback(() => {
    if (noteText.trim() === '') return;
    
    addNote(selectedDay, noteText);
    setNoteText('');
    setIsAdding(false);
  }, [addNote, noteText, selectedDay]);

  // Handle note input changes
  const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleAddNote();
  }, [handleAddNote]);

  if (!trip) {
    return null;
  }

  return (
    <div className="border rounded-xl p-4 shadow-sm animate-fadeIn">
      <div className="flex items-center mb-4">
        <CalendarDays size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">Daily Planner</h2>
      </div>

      {/* Day Selection */}
      <div className="mb-4 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {days.map(({ date, dayNumber }) => (
            <button
              key={dayNumber}
              onClick={() => setSelectedDay(dayNumber)}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200
                        ${selectedDay === dayNumber 
                          ? 'shadow-md font-medium' 
                          : 'opacity-70 hover:opacity-100'}`}
            >
              <div className="font-medium">Day {dayNumber}</div>
              <div className="text-xs opacity-80">{formatShortDate(date)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Notes for Selected Day */}
      <div className="space-y-3 mb-4 min-h-[100px]">
        {dayNotes.length === 0 && !isAdding ? (
          <p className="text-center py-4 opacity-60 text-sm">
            No notes for Day {selectedDay}. Add some activities!
          </p>
        ) : (
          dayNotes.map(note => (
            <div 
              key={note.id} 
              className="p-3 rounded-lg border group hover:shadow-sm transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <textarea
                  value={note.note}
                  onChange={(e) => updateNote(note.id, e.target.value)}
                  className="w-full bg-transparent resize-none outline-none text-sm"
                  rows={2}
                />
                <button 
                  onClick={() => removeNote(note.id)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
        
        {isAdding && (
          <form onSubmit={handleSubmit} className="mt-3 animate-fadeIn">
            <textarea
              value={noteText}
              onChange={handleNoteChange}
              placeholder="What's planned for this day?"
              className="w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 mb-2"
              rows={2}
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNoteText('');
                }}
                className="px-3 py-1 text-sm rounded-lg opacity-70 hover:opacity-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm rounded-lg shadow-sm hover:shadow"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Add Note Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-2 rounded-lg border border-dashed flex items-center justify-center gap-2 
                   text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <Plus size={16} />
          <span>Add note for Day {selectedDay}</span>
        </button>
      )}
    </div>
  );
};

export default DailyPlanner;