import React, { useState } from 'react';

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: number }>({
  data,
  columns,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const toggleRow = (id: number) => {
    const updated = selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id];
    setSelectedIds(updated);
    onRowSelect?.(data.filter((d) => updated.includes(d.id)));
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  if (data.length === 0)
    return <div className="text-center py-6 text-gray-500 dark:text-gray-400">No data available</div>;

  return (
    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
      <thead className="bg-indigo-100 dark:bg-indigo-900">
        <tr>
          {selectable && <th className="p-3"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && handleSort(col.key)}
              className={`text-left px-4 py-3 font-semibold text-gray-800 dark:text-gray-100 cursor-pointer select-none ${
                col.sortable ? 'hover:text-indigo-600 dark:hover:text-indigo-300' : ''
              }`}
            >
              <div className="flex items-center gap-1">
                {col.title}
                {sortConfig?.key === col.key && (
                  <span className="text-sm">{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr
            key={row.id}
            className={`border-b border-gray-200 dark:border-gray-700 transition-colors cursor-pointer ${
              selectedIds.includes(row.id) ? 'bg-indigo-100 dark:bg-indigo-800' : ''
            } ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-indigo-50 dark:hover:bg-indigo-900`}
            onClick={() => selectable && toggleRow(row.id)}
          >
            {selectable && (
              <td className="px-4 py-2 text-center">
                <input type="checkbox" checked={selectedIds.includes(row.id)} readOnly className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2 text-gray-800 dark:text-gray-100">
                {row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
