
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Loader2 } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
}

export const MultiSelect = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder,
  loading = false,
  disabled = false,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter(v => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const handleRemoveOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(selectedValues.filter(v => v !== value));
  };

  const getSelectedLabels = () => {
    return selectedValues.map(value => 
      options.find(option => option.value === value)?.label || value
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`border rounded-lg p-3 cursor-pointer transition-colors min-h-[44px] flex items-center justify-between ${
          disabled 
            ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
            : 'bg-white border-gray-300 hover:border-blue-400 focus-within:border-blue-500'
        }`}
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
      >
        <div className="flex-1 flex flex-wrap gap-1">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {label}
                {!disabled && (
                  <X
                    size={14}
                    className="cursor-pointer hover:text-blue-600"
                    onClick={(e) => handleRemoveOption(selectedValues[index], e)}
                  />
                )}
              </span>
            ))
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {loading && <Loader2 size={16} className="animate-spin text-gray-400" />}
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && !loading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="p-3 text-gray-500 text-center">No options available</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedValues.includes(option.value) ? 'bg-blue-50 text-blue-700' : ''
                }`}
                onClick={() => handleToggleOption(option.value)}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
