
import { useState, useEffect } from 'react';
import { SelectionPanel } from './SelectionPanel';
import { ExportGrid } from './ExportGrid';
import { PreviewModal } from './PreviewModal';
import { ExportCombination } from '../types/export';
import { generateCombinations } from '../utils/combinations';
import { useToast } from '../hooks/use-toast';

export const EmailExportApp = () => {
  const [selectedMailingSites, setSelectedMailingSites] = useState<string[]>([]);
  const [selectedMailingItems, setSelectedMailingItems] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedOptimoveFolders, setSelectedOptimoveFolders] = useState<string[]>([]);
  const [combinations, setCombinations] = useState<ExportCombination[]>([]);
  const [previewItem, setPreviewItem] = useState<ExportCombination | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Generate combinations when selections change
  useEffect(() => {
    if (selectedMailingSites.length > 0 && selectedMailingItems.length > 0 && selectedLanguages.length > 0) {
      setLoading(true);
      const newCombinations = generateCombinations(
        selectedMailingSites,
        selectedMailingItems,
        selectedLanguages
      );
      setCombinations(newCombinations);
      setLoading(false);
    } else {
      setCombinations([]);
    }
  }, [selectedMailingSites, selectedMailingItems, selectedLanguages]);

  const handlePreview = (combination: ExportCombination) => {
    setPreviewItem(combination);
  };

  const handleExport = async (combination: ExportCombination) => {
    // Update status to in progress
    setCombinations(prev => prev.map(c => 
      c.id === combination.id ? { ...c, status: 'in-progress' } : c
    ));

    try {
      // Simulate export API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update status to exported
      setCombinations(prev => prev.map(c => 
        c.id === combination.id ? { 
          ...c, 
          status: 'exported',
          lastExported: new Date().toISOString()
        } : c
      ));

      toast({
        title: "Export Successful",
        description: `${combination.mailingItem} exported to Optimove successfully.`,
      });
    } catch (error) {
      // Update status back to not exported on error
      setCombinations(prev => prev.map(c => 
        c.id === combination.id ? { ...c, status: 'not-exported' } : c
      ));

      toast({
        title: "Export Failed",
        description: "Failed to export to Optimove. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <SelectionPanel
        selectedMailingSites={selectedMailingSites}
        setSelectedMailingSites={setSelectedMailingSites}
        selectedMailingItems={selectedMailingItems}
        setSelectedMailingItems={setSelectedMailingItems}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedOptimoveFolders={selectedOptimoveFolders}
        setSelectedOptimoveFolders={setSelectedOptimoveFolders}
      />

      {combinations.length > 0 && (
        <div className="animate-fade-in">
          <ExportGrid
            combinations={combinations}
            loading={loading}
            onPreview={handlePreview}
            onExport={handleExport}
          />
        </div>
      )}

      {previewItem && (
        <PreviewModal
          combination={previewItem}
          open={!!previewItem}
          onClose={() => setPreviewItem(null)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};
