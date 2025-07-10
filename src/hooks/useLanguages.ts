
import { useQuery } from '@tanstack/react-query';
import { Language } from '../types/export';
import { apiClient } from '../api/client';

export const useLanguages = (selectedItems: string[]) => {
  return useQuery({
    queryKey: ['languages', selectedItems],
    queryFn: async (): Promise<Language[]> => {
      if (selectedItems.length === 0) return [];
      
      // Get languages for the first selected item (assuming all items have same languages)
      const response = await apiClient.getLanguages(selectedItems[0]);
      
      // Convert string array to Language objects
      return response.languages.map(lang => ({
        code: lang,
        name: lang,
        displayName: lang
      }));
    },
    enabled: selectedItems.length > 0,
  });
};
