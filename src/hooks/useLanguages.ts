
import { useQuery } from '@tanstack/react-query';
import { Language } from '../types/export';

export const useLanguages = (selectedItems: string[]) => {
  return useQuery({
    queryKey: ['languages', selectedItems],
    queryFn: async (): Promise<Language[]> => {
      // Mock data for now - replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { code: 'en', name: 'English', displayName: 'English (US)' },
            { code: 'es', name: 'Spanish', displayName: 'Español' },
            { code: 'fr', name: 'French', displayName: 'Français' },
            { code: 'de', name: 'German', displayName: 'Deutsch' },
            { code: 'it', name: 'Italian', displayName: 'Italiano' },
          ]);
        }, 200);
      });
    },
    enabled: selectedItems.length > 0,
  });
};
