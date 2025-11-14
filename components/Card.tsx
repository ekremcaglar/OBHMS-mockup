import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b border-gray-700">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white">{children}</h2>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);