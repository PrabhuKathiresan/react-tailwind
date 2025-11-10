import React from "react";

export const DocLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <header className="border-b p-4 bg-white shadow-sm sticky top-0 z-10 border-gray-200">
      <h1 className="text-2xl font-bold">React-tailwind Library Docs</h1>
    </header>
    <main className="flex flex-1">
      <aside className="w-64 border-r p-4 border-gray-200">
        <ul className="space-y-2">
          <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
          <li><a href="/components" className="text-blue-600 hover:underline">Components</a></li>
        </ul>
      </aside>
      <section className="flex-1 p-6">{children}</section>
    </main>
  </div>
);
