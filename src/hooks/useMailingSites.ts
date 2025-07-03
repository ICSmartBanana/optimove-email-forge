
import { useQuery } from '@tanstack/react-query';
import { MailingSite } from '../types/export';
import { apiClient } from '../api/client';

export const useMailingSites = () => {
  return useQuery({
    queryKey: ['mailing-sites'],
    queryFn: async (): Promise<MailingSite[]> => {
      // Mock data for now - replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'Marketing Campaigns', path: '/content/Mailing/Transactional V2/Marketing' },
            { id: '2', name: 'Welcome Series', path: '/content/Mailing/Transactional V2/Welcome' },
            { id: '3', name: 'Order Confirmations', path: '/content/Mailing/Transactional V2/Orders' },
            { id: '4', name: 'Customer Support', path: '/content/Mailing/Transactional V2/Support' },
          ]);
        }, 500);
      });
    },
  });
};
