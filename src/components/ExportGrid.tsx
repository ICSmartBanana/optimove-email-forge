
import { useState } from 'react';
import { ExportCombination } from '../types/export';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, Download, AlertTriangle, Loader2 } from 'lucide-react';

interface ExportGridProps {
  combinations: ExportCombination[];
  loading: boolean;
  onPreview: (combination: ExportCombination) => void;
  onExport: (combination: ExportCombination) => void;
}

export const ExportGrid = ({ combinations, loading, onPreview, onExport }: ExportGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(combinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCombinations = combinations.slice(startIndex, endIndex);

  const getStatusBadge = (status: ExportCombination['status']) => {
    switch (status) {
      case 'exported':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Exported</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Not Exported</Badge>;
    }
  };

  const getStatusRowClass = (status: ExportCombination['status']) => {
    switch (status) {
      case 'exported':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Generating combinations...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Export Combinations ({combinations.length} total)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mailing Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Label
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCombinations.map((combination) => (
              <tr 
                key={combination.id} 
                className={`transition-colors hover:bg-gray-50 border-l-4 ${getStatusRowClass(combination.status)}`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {combination.mailingItem}
                    </div>
                    {!combination.isValid && (
                      <div className="ml-2 cursor-pointer" title="Content validation issues">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {combination.label}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {combination.brand}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {combination.language}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{new Date(combination.lastModified).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">by {combination.modifiedBy}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {getStatusBadge(combination.status)}
                  {combination.lastExported && (
                    <div className="text-xs text-gray-400 mt-1">
                      Exported: {new Date(combination.lastExported).toLocaleDateString()}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPreview(combination)}
                      className="flex items-center gap-1"
                    >
                      <Eye size={14} />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onExport(combination)}
                      disabled={combination.status === 'in-progress' || !combination.isValid}
                      className="flex items-center gap-1"
                    >
                      {combination.status === 'in-progress' ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      Export
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, combinations.length)} of {combinations.length} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
