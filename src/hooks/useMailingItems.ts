
import { useQuery } from '@tanstack/react-query';
import { MailingItem } from '../types/export';

export const useMailingItems = (selectedSites: string[]) => {
  return useQuery({
    queryKey: ['mailing-items', selectedSites],
    queryFn: async (): Promise<MailingItem[]> => {
      // Mock data for now - replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          const items: MailingItem[] = [];
          
          selectedSites.forEach(siteId => {
            switch (siteId) {
              case '1': // Marketing Campaigns
                items.push(
                  { id: 'm1', name: 'Newsletter Template', label: 'Weekly Newsletter', brand: 'Brand A', path: '/Marketing/Newsletter', lastModified: '2024-01-15T10:30:00Z', modifiedBy: 'John Doe' },
                  { id: 'm2', name: 'Promotion Alert', label: 'Flash Sale Alert', brand: 'Brand A', path: '/Marketing/Promotion', lastModified: '2024-01-14T09:15:00Z', modifiedBy: 'Jane Smith' }
                );
                break;
              case '2': // Welcome Series
                items.push(
                  { id: 'w1', name: 'Welcome Email', label: 'New User Welcome', brand: 'Brand B', path: '/Welcome/NewUser', lastModified: '2024-01-13T14:20:00Z', modifiedBy: 'Bob Johnson' },
                  { id: 'w2', name: 'Getting Started', label: 'Getting Started Guide', brand: 'Brand B', path: '/Welcome/GettingStarted', lastModified: '2024-01-12T11:45:00Z', modifiedBy: 'Alice Brown' }
                );
                break;
              case '3': // Order Confirmations
                items.push(
                  { id: 'o1', name: 'Order Confirmation', label: 'Purchase Confirmation', brand: 'Brand C', path: '/Orders/Confirmation', lastModified: '2024-01-11T16:30:00Z', modifiedBy: 'Charlie Wilson' },
                  { id: 'o2', name: 'Shipping Notification', label: 'Order Shipped', brand: 'Brand C', path: '/Orders/Shipping', lastModified: '2024-01-10T13:20:00Z', modifiedBy: 'Diana Lee' }
                );
                break;
              case '4': // Customer Support
                items.push(
                  { id: 's1', name: 'Support Confirmation', label: 'Ticket Created', brand: 'Brand A', path: '/Support/TicketCreated', lastModified: '2024-01-09T08:30:00Z', modifiedBy: 'Eve Davis' }
                );
                break;
            }
          });
          
          resolve(items);
        }, 300);
      });
    },
    enabled: selectedSites.length > 0,
  });
};
