
import { useQuery } from '@tanstack/react-query';
import { Placeholder } from '../types/export';

export const usePlaceholders = (mailingItemId: string) => {
  return useQuery({
    queryKey: ['placeholders', mailingItemId],
    queryFn: async (): Promise<Placeholder[]> => {
      // Mock placeholder data - replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { key: 'EMAIL_TITLE', defaultValue: 'Welcome to Our Service', description: 'The main title of the email' },
            { key: 'CUSTOMER_NAME', defaultValue: 'Valued Customer', description: 'Customer\'s full name' },
            { key: 'EMAIL_CONTENT', defaultValue: 'Thank you for joining us!', description: 'Main email body content' },
            { key: 'CUSTOM_MESSAGE', defaultValue: 'We\'re excited to have you on board.', description: 'Additional custom message' },
            { key: 'CTA_LINK', defaultValue: 'https://example.com', description: 'Call-to-action button link' },
            { key: 'CTA_TEXT', defaultValue: 'Get Started', description: 'Call-to-action button text' },
            { key: 'COMPANY_NAME', defaultValue: 'Your Company', description: 'Company name for footer' },
            { key: 'CONTACT_EMAIL', defaultValue: 'support@company.com', description: 'Contact email address' },
          ]);
        }, 300);
      });
    },
    enabled: !!mailingItemId,
  });
};
