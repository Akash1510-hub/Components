import fs from 'fs';

const configFile = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
`;

const postcssFile = `import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
`;

fs.writeFileSync('tailwind.config.js', configFile);
fs.writeFileSync('postcss.config.js', postcssFile);

console.log('✅ Tailwind config files created!');
