
import { useQuery } from '@tanstack/react-query';

export const useMailingHtml = (mailingItemId: string, languageCode: string) => {
  return useQuery({
    queryKey: ['mailing-html', mailingItemId, languageCode],
    queryFn: async (): Promise<string> => {
      // Mock HTML content - replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
                    .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
                    .header { background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { padding: 20px; }
                    .footer { background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
                    .button { background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>%%EMAIL_TITLE%%</h1>
                    </div>
                    <div class="content">
                        <p>Dear %%CUSTOMER_NAME%%,</p>
                        <p>%%EMAIL_CONTENT%%</p>
                        <p>%%CUSTOM_MESSAGE%%</p>
                        <p style="text-align: center; margin: 30px 0;">
                            <a href="%%CTA_LINK%%" class="button">%%CTA_TEXT%%</a>
                        </p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 %%COMPANY_NAME%%. All rights reserved.</p>
                        <p>Contact us: %%CONTACT_EMAIL%%</p>
                    </div>
                </div>
            </body>
            </html>
          `);
        }, 600);
      });
    },
    enabled: !!mailingItemId && !!languageCode,
  });
};
