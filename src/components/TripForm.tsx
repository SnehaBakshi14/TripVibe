import React, { useState } from 'react';
import { useTrip } from '../contexts/TripContext';
import { Plane, Calendar, MapPin, X } from 'lucide-react';

interface TripFormProps {
  onClose: () => void;
}

const TripForm: React.FC<TripFormProps> = ({ onClose }) => {
  const { createTrip } = useTrip();
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required';
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    createTrip(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-dark-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Plan Your Trip</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-opacity-10 hover:bg-black">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Trip Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Trip Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Plane size={18} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Summer Vacation"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg
                          focus:outline-none focus:ring-2
                          ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium mb-1">
              Destination
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Paris, France"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg
                          focus:outline-none focus:ring-2
                          ${errors.destination ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.destination && (
              <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
            )}
          </div>
          
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg
                            focus:outline-none focus:ring-2
                            ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                End Date
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg
                            focus:outline-none focus:ring-2
                            ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm opacity-80 hover:opacity-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm shadow-sm hover:shadow"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripForm;