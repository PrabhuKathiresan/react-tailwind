// src/components/SearchBox.tsx
import { useState } from 'react';
import Fuse from 'fuse.js';

const fuse = new Fuse([], { keys: ['name', 'description'], threshold: 0.3 });

export function SearchBox() {
  const [query, setQuery] = useState('');
  const results: any[] = query ? fuse.search(query).map(r => r.item) : [];

  return (
    <div className="relative max-w-md mx-auto">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components..."
        className="w-full border rounded-md p-2"
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full rounded-md shadow-lg">
          {results.map((r) => (
            <li key={r.name} className="p-2 hover:bg-gray-100 cursor-pointer">
              {r.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
