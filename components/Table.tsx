import React from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="min-w-full divide-y divide-gray-700">{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-800">{children}</thead>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="bg-gray-900 even:bg-gray-800">{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{children}</th>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="bg-gray-900 divide-y divide-gray-700">{children}</tbody>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{children}</td>
);