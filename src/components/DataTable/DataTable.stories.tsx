import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState([]);
    return (
      <div className="space-y-4">
        <DataTable {...args} onRowSelect={setSelectedRows} />
        <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded">{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    );
  },
  args: {
    selectable: true,
    data: [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 28 },
    ],
    columns: [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    ],
  },
};
