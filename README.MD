My Component Library

A React + TypeScript + TailwindCSS UI component library with Storybook documentation.

## Components

### 1. InputField
- Variants: Default, Email Invalid, Password, Disabled  
- Features: Label, placeholder, helper text, error message, disabled state, variant styles, sizes, clearable input, password toggle  
- Props:  
```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  type?: 'text' | 'password';
}
2. DataTable
Features: Sortable columns, selectable rows, loading & empty states

Props:

ts
Copy code
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
Setup Instructions
Clone the repository:

bash
Copy code
git clone <your-repo-url>
cd my-component-library
Install dependencies:

bash
Copy code
npm install
Run the React app locally:

bash
Copy code
npm run dev
Run Storybook:

bash
Copy code
npm run storybook
Build Storybook for deployment:

bash
Copy code
npm run build-storybook
Approach
Used React + TypeScript for type-safe components.

Styled components with TailwindCSS for rapid and responsive UI.

Created Storybook stories for all components and variants.

InputField supports validation, clearable input, and password toggle.

DataTable supports row selection and sortable columns.

Components are scalable and reusable for future additions.

Storybook Preview
Deployed via Chromatic or Vercel

Example link: <your-chromatic-or-vercel-link>