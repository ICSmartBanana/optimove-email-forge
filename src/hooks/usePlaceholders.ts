
import { useQuery } from '@tanstack/react-query';
import { Placeholder } from '../types/export';
import { apiClient } from '../api/client';

export const usePlaceholders = (mailingItemId: string) => {
  return useQuery({
    queryKey: ['placeholders', mailingItemId],
    queryFn: async (): Promise<Placeholder[]> => {
      const response = await apiClient.getPlaceholders(mailingItemId);
      
      // Convert string array to Placeholder objects
      return response.placeholders.map(key => ({
        key,
        defaultValue: '',
        description: `Placeholder for ${key}`
      }));
    },
    enabled: !!mailingItemId,
  });
};
