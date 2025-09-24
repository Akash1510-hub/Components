import React, { useState, useEffect } from 'react';
import InputField from './components/InputField/InputField';
import DataTable from './components/DataTable/DataTable';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const root = window.document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
  }, [theme]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 28 },
  ];

  const columns = [
    { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="sticky top-0 z-50 flex justify-end p-4 bg-white dark:bg-gray-800 shadow-md">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div className="container mx-auto p-6 space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">Component Dashboard</h1>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">InputField Variants</h2>
          <InputField label="Name" placeholder="Enter your name" value={name} onChange={setName} helperText="Type your full name" clearable variant="outlined" size="md"/>
          <InputField label="Email" placeholder="Enter your email" value={email} onChange={setEmail} invalid={email.length>0 && !email.includes('@')} errorMessage="Invalid email" variant="outlined" size="md" clearable/>
          <InputField label="Password" placeholder="Enter your password" type="password" value={password} onChange={setPassword} variant="filled" size="md" clearable/>
          <InputField label="Disabled Input" placeholder="Can't type here" disabled variant="ghost" size="md"/>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">DataTable Example</h2>
          <DataTable data={data} columns={columns} selectable onRowSelect={setSelectedRows}/>
          <div className="mt-4">
            <strong>Selected Rows:</strong>
            <pre className="bg-gray-50 dark:bg-gray-700 p-3 rounded mt-2">{JSON.stringify(selectedRows, null, 2)}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
