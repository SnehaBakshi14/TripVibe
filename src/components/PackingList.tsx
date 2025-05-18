import React, { useState, useMemo } from 'react';
import { useTrip } from '../contexts/TripContext';
import { Briefcase, Plus, Trash, Check, X, Archive } from 'lucide-react';

const PackingList: React.FC = () => {
  const { packingItems, addPackingItem, togglePackingItem, removePackingItem, clearPackedItems, getPackingStats } = useTrip();
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Essentials');
  const [showForm, setShowForm] = useState(false);

  const categories = useMemo(() => [
    'Essentials',
    'Clothing',
    'Toiletries',
    'Electronics',
    'Documents',
    'Miscellaneous'
  ], []);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, typeof packingItems> = {};
    
    // Initialize categories
    categories.forEach(category => {
      grouped[category] = [];
    });
    
    // Add items to categories
    packingItems.forEach(item => {
      const category = item.category || 'Miscellaneous';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });
    
    return grouped;
  }, [packingItems, categories]);

  // Stats for the progress bar
  const { total, packed, percentage } = getPackingStats();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim() !== '') {
      addPackingItem(newItemText, selectedCategory);
      setNewItemText('');
      setShowForm(false);
    }
  };

  const progressBarColor = percentage < 33 
    ? 'bg-red-500' 
    : percentage < 66 
      ? 'bg-yellow-500' 
      : 'bg-green-500';

  return (
    <div className="border rounded-xl p-4 shadow-sm animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Briefcase size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">Packing Checklist</h2>
        </div>
        
        {packingItems.some(item => item.packed) && (
          <button 
            onClick={clearPackedItems}
            className="flex items-center text-xs py-1 px-2 rounded-md opacity-70 hover:opacity-100"
          >
            <Archive size={14} className="mr-1" />
            Clear packed
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span>{packed} of {total} items packed</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressBarColor} transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Packing items by category */}
      <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-1">
        {categories.map(category => {
          const items = itemsByCategory[category];
          if (items.length === 0) return null;
          
          return (
            <div key={category} className="animate-slideIn">
              <h3 className="font-medium text-sm mb-2">{category}</h3>
              <ul className="space-y-2">
                {items.map(item => (
                  <li 
                    key={item.id}
                    className={`flex items-center p-2 rounded-lg group transition-all duration-200 ${
                      item.packed ? 'bg-opacity-50 border-opacity-50' : ''
                    }`}
                  >
                    <button
                      onClick={() => togglePackingItem(item.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center mr-3
                                transition-all duration-200 ${
                                  item.packed 
                                    ? 'bg-green-500 border-green-500 text-white' 
                                    : 'border-current hover:border-green-500'
                                }`}
                    >
                      {item.packed && <Check size={12} />}
                    </button>
                    <span className={`flex-grow text-sm ${item.packed ? 'line-through opacity-60' : ''}`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => removePackingItem(item.id)}
                      className="opacity-0 group-hover:opacity-70 hover:!opacity-100 p-1 -mr-1 text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        
        {packingItems.length === 0 && (
          <p className="text-center py-4 opacity-60 text-sm">
            Your packing list is empty. Add some items to get started!
          </p>
        )}
      </div>

      {/* Add item form */}
      {showForm ? (
        <form onSubmit={handleAddItem} className="space-y-3 animate-fadeIn">
          <input
            type="text"
            value={newItemText}
            onChange={e => setNewItemText(e.target.value)}
            placeholder="What do you need to pack?"
            className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
            autoFocus
          />
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`text-xs py-1 px-2 rounded-md transition-colors
                          ${category === selectedCategory 
                            ? 'bg-opacity-20 font-medium' 
                            : 'bg-opacity-5 hover:bg-opacity-10'}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setNewItemText('');
              }}
              className="px-3 py-1.5 text-sm rounded-lg flex items-center"
            >
              <X size={14} className="mr-1" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-lg shadow-sm hover:shadow
                        flex items-center"
            >
              <Plus size={14} className="mr-1" />
              Add Item
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-2 rounded-lg border border-dashed flex items-center justify-center gap-2 
                   text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <Plus size={16} />
          <span>Add item to pack</span>
        </button>
      )}
    </div>
  );
};

export default PackingList;