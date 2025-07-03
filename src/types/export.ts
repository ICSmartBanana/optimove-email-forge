
export interface MailingSite {
  id: string;
  name: string;
  path: string;
}

export interface MailingItem {
  id: string;
  name: string;
  label: string;
  brand: string;
  path: string;
  lastModified: string;
  modifiedBy: string;
}

export interface Language {
  code: string;
  name: string;
  displayName: string;
}

export interface OptimoveFolder {
  id: string;
  name: string;
  path: string;
}

export interface ExportCombination {
  id: string;
  mailingItem: string;
  mailingItemId: string;
  label: string;
  brand: string;
  language: string;
  languageCode: string;
  optimoveFolder: string;
  optimoveFolderId: string;
  lastModified: string;
  modifiedBy: string;
  lastExported?: string;
  status: 'exported' | 'not-exported' | 'in-progress';
  isValid: boolean;
  validationErrors?: string[];
}

export interface Placeholder {
  key: string;
  defaultValue?: string;
  description?: string;
}

export interface ExportRequest {
  mailingItemId: string;
  languageCode: string;
  optimoveFolderId: string;
  html: string;
  placeholders: Record<string, string>;
}
