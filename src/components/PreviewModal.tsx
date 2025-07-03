
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ExportCombination, Placeholder } from '../types/export';
import { useMailingHtml } from '../hooks/useMailingHtml';
import { usePlaceholders } from '../hooks/usePlaceholders';
import { Download, Loader2 } from 'lucide-react';

interface PreviewModalProps {
  combination: ExportCombination;
  open: boolean;
  onClose: () => void;
  onExport: (combination: ExportCombination) => void;
}

export const PreviewModal = ({ combination, open, onClose, onExport }: PreviewModalProps) => {
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  const [processedHtml, setProcessedHtml] = useState('');
  
  const { data: html, isLoading: loadingHtml } = useMailingHtml(combination.mailingItemId, combination.languageCode);
  const { data: placeholders, isLoading: loadingPlaceholders } = usePlaceholders(combination.mailingItemId);

  // Initialize placeholder values and process HTML
  useEffect(() => {
    if (placeholders && html) {
      const initialValues: Record<string, string> = {};
      placeholders.forEach(placeholder => {
        initialValues[placeholder.key] = placeholder.defaultValue || '';
      });
      setPlaceholderValues(initialValues);
      
      // Process HTML with placeholder values
      let processed = html;
      Object.entries(initialValues).forEach(([key, value]) => {
        const regex = new RegExp(`%%${key}%%`, 'g');
        processed = processed.replace(regex, value);
      });
      setProcessedHtml(processed);
    }
  }, [placeholders, html]);

  // Update processed HTML when placeholder values change
  useEffect(() => {
    if (html) {
      let processed = html;
      Object.entries(placeholderValues).forEach(([key, value]) => {
        const regex = new RegExp(`%%${key}%%`, 'g');
        processed = processed.replace(regex, value);
      });
      setProcessedHtml(processed);
    }
  }, [placeholderValues, html]);

  const handlePlaceholderChange = (key: string, value: string) => {
    setPlaceholderValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    // Create a modified combination with the processed HTML
    const modifiedCombination = {
      ...combination,
      processedHtml,
      placeholderValues
    };
    onExport(modifiedCombination);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            Preview: {combination.mailingItem} ({combination.language})
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar for placeholders */}
          {placeholders && placeholders.length > 0 && (
            <div className="w-80 border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Placeholders</h3>
              <div className="space-y-4">
                {placeholders.map((placeholder: Placeholder) => (
                  <div key={placeholder.key}>
                    <Label htmlFor={placeholder.key} className="text-sm font-medium">
                      {placeholder.key}
                    </Label>
                    {placeholder.description && (
                      <p className="text-xs text-gray-500 mb-1">{placeholder.description}</p>
                    )}
                    <Input
                      id={placeholder.key}
                      value={placeholderValues[placeholder.key] || ''}
                      onChange={(e) => handlePlaceholderChange(placeholder.key, e.target.value)}
                      placeholder={placeholder.defaultValue || `Enter ${placeholder.key}`}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Preview area */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="h-full border border-gray-200 rounded-lg overflow-hidden">
              {loadingHtml || loadingPlaceholders ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                  <span className="ml-2 text-gray-600">Loading preview...</span>
                </div>
              ) : (
                <iframe
                  srcDoc={processedHtml}
                  className="w-full h-full border-0"
                  title="Email Preview"
                  sandbox="allow-same-origin"
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={handleExport}
            disabled={loadingHtml || loadingPlaceholders}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export to Optimove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
