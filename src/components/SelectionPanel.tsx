
import { MultiSelect } from './MultiSelect';
import { useMailingSites } from '../hooks/useMailingSites';
import { useMailingItems } from '../hooks/useMailingItems';
import { useLanguages } from '../hooks/useLanguages';
import { useOptimoveFolders } from '../hooks/useOptimoveFolders';

interface SelectionPanelProps {
  selectedMailingSites: string[];
  setSelectedMailingSites: (sites: string[]) => void;
  selectedMailingItems: string[];
  setSelectedMailingItems: (items: string[]) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  selectedOptimoveFolders: string[];
  setSelectedOptimoveFolders: (folders: string[]) => void;
}

export const SelectionPanel = ({
  selectedMailingSites,
  setSelectedMailingSites,
  selectedMailingItems,
  setSelectedMailingItems,
  selectedLanguages,
  setSelectedLanguages,
  selectedOptimoveFolders,
  setSelectedOptimoveFolders,
}: SelectionPanelProps) => {
  const { data: mailingSites, isLoading: loadingMailingSites } = useMailingSites();
  const { data: mailingItems, isLoading: loadingMailingItems } = useMailingItems(selectedMailingSites);
  const { data: languages, isLoading: loadingLanguages } = useLanguages(selectedMailingItems);
  const { data: optimoveFolders, isLoading: loadingOptimoveFolders } = useOptimoveFolders();

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Selection Criteria</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mailing Sites
          </label>
          <MultiSelect
            options={mailingSites?.map(site => ({ value: site.id, label: site.name })) || []}
            selectedValues={selectedMailingSites}
            onSelectionChange={setSelectedMailingSites}
            placeholder="Select mailing sites..."
            loading={loadingMailingSites}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mailing Items
          </label>
          <MultiSelect
            options={mailingItems?.map(item => ({ value: item.id, label: item.name })) || []}
            selectedValues={selectedMailingItems}
            onSelectionChange={setSelectedMailingItems}
            placeholder="Select mailing items..."
            loading={loadingMailingItems}
            disabled={selectedMailingSites.length === 0}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages
          </label>
          <MultiSelect
            options={languages?.map(lang => ({ value: lang.code, label: lang.displayName })) || []}
            selectedValues={selectedLanguages}
            onSelectionChange={setSelectedLanguages}
            placeholder="Select languages..."
            loading={loadingLanguages}
            disabled={selectedMailingItems.length === 0}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optimove Folders
          </label>
          <MultiSelect
            options={optimoveFolders?.map(folder => ({ value: folder.id, label: folder.name })) || []}
            selectedValues={selectedOptimoveFolders}
            onSelectionChange={setSelectedOptimoveFolders}
            placeholder="Select folders..."
            loading={loadingOptimoveFolders}
          />
        </div>
      </div>
    </div>
  );
};
