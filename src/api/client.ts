
// API client for Sitecore endpoints
class ApiClient {
  private baseUrl = '/sitecore/api/email-export';

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Sitecore API endpoints
  getMailingSites() {
    return this.get('/mailing-sites');
  }

  getMailingItems(siteId: string) {
    return this.get(`/mailing-items?site=${siteId}`);
  }

  getLanguages(mailingItemId: string) {
    return this.get<{languages: string[]}>(`/languages?mailingItem=${mailingItemId}`);
  }

  getOptimoveFolders() {
    return this.get('/folders');
  }

  getMailingHtml(id: string, language: string) {
    return this.get<{html: string}>(`/mailing-html/${id}?language=${language}`);
  }

  getPlaceholders(id: string) {
    return this.get<{placeholders: string[]}>(`/placeholders?id=${id}`);
  }

  checkAvailability(mailingItem: string, language: string) {
    return this.get<{available: boolean}>(`/check-availability?mailingItem=${mailingItem}&language=${language}`);
  }

  getMetadata(mailingItem: string, language: string) {
    return this.get<{subject: string, fromName: string, replyTo: string}>(`/metadata?mailingItem=${mailingItem}&language=${language}`);
  }

  exportToOptimove(data: any) {
    return this.post('/export', data);
  }
}

export const apiClient = new ApiClient();
