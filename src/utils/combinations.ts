
import { ExportCombination } from '../types/export';

export const generateCombinations = (
  mailingItems: string[],
  languages: string[],
  optimoveFolders: string[]
): ExportCombination[] => {
  const combinations: ExportCombination[] = [];
  
  // Mock data for demonstration - in real implementation, fetch actual data
  const mockMailingData: Record<string, any> = {
    'm1': { name: 'Newsletter Template', label: 'Weekly Newsletter', brand: 'Brand A', lastModified: '2024-01-15T10:30:00Z', modifiedBy: 'John Doe' },
    'm2': { name: 'Promotion Alert', label: 'Flash Sale Alert', brand: 'Brand A', lastModified: '2024-01-14T09:15:00Z', modifiedBy: 'Jane Smith' },
    'w1': { name: 'Welcome Email', label: 'New User Welcome', brand: 'Brand B', lastModified: '2024-01-13T14:20:00Z', modifiedBy: 'Bob Johnson' },
    'w2': { name: 'Getting Started', label: 'Getting Started Guide', brand: 'Brand B', lastModified: '2024-01-12T11:45:00Z', modifiedBy: 'Alice Brown' },
    'o1': { name: 'Order Confirmation', label: 'Purchase Confirmation', brand: 'Brand C', lastModified: '2024-01-11T16:30:00Z', modifiedBy: 'Charlie Wilson' },
    'o2': { name: 'Shipping Notification', label: 'Order Shipped', brand: 'Brand C', lastModified: '2024-01-10T13:20:00Z', modifiedBy: 'Diana Lee' },
    's1': { name: 'Support Confirmation', label: 'Ticket Created', brand: 'Brand A', lastModified: '2024-01-09T08:30:00Z', modifiedBy: 'Eve Davis' },
  };

  const mockLanguageData: Record<string, string> = {
    'en': 'English (US)',
    'es': 'Español',
    'fr': 'Français', 
    'de': 'Deutsch',
    'it': 'Italiano',
  };

  const mockOptimoveData: Record<string, string> = {
    'opt1': 'Marketing Templates',
    'opt2': 'Transactional',
    'opt3': 'Welcome Series',
    'opt4': 'Promotional',
    'opt5': 'Support',
  };

  mailingItems.forEach(mailingItem => {
    languages.forEach(language => {
      optimoveFolders.forEach(folder => {
        const mailingData = mockMailingData[mailingItem];
        const isValid = Math.random() > 0.1; // 90% valid for demo
        
        combinations.push({
          id: `${mailingItem}-${language}-${folder}`,
          mailingItem: mailingData?.name || mailingItem,
          mailingItemId: mailingItem,
          label: mailingData?.label || 'Unknown Label',
          brand: mailingData?.brand || 'Unknown Brand',
          language: mockLanguageData[language] || language,
          languageCode: language,
          optimoveFolder: mockOptimoveData[folder] || folder,
          optimoveFolderId: folder,
          lastModified: mailingData?.lastModified || new Date().toISOString(),
          modifiedBy: mailingData?.modifiedBy || 'Unknown',
          status: Math.random() > 0.7 ? 'exported' : 'not-exported',
          isValid,
          validationErrors: isValid ? [] : ['Content not found in selected language', 'Missing required fields'],
          lastExported: Math.random() > 0.7 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        });
      });
    });
  });

  return combinations;
};
