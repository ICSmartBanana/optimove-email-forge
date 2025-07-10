
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export const useMailingHtml = (mailingItemId: string, languageCode: string) => {
  return useQuery({
    queryKey: ['mailing-html', mailingItemId, languageCode],
    queryFn: async (): Promise<string> => {
      const response = await apiClient.getMailingHtml(mailingItemId, languageCode);
      return response.html;
    },
    enabled: !!mailingItemId && !!languageCode,
  });
};
