
import { useQuery } from '@tanstack/react-query';
import { OptimoveFolder } from '../types/export';

export const useOptimoveFolders = () => {
  return useQuery({
    queryKey: ['optimove-folders'],
    queryFn: async (): Promise<OptimoveFolder[]> => {
      // Mock data for now - replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 'opt1', name: 'Marketing Templates', path: '/Templates/Marketing' },
            { id: 'opt2', name: 'Transactional', path: '/Templates/Transactional' },
            { id: 'opt3', name: 'Welcome Series', path: '/Templates/Welcome' },
            { id: 'opt4', name: 'Promotional', path: '/Templates/Promotional' },
            { id: 'opt5', name: 'Support', path: '/Templates/Support' },
          ]);
        }, 400);
      });
    },
  });
};
