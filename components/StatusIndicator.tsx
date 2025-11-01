import React from 'react';
import { Status } from '../types';

interface StatusIndicatorProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 'md' }) => {
  const statusClasses = {
    nominal: 'bg-green-500',
    warning: 'bg-yellow-400',
    critical: 'bg-red-500',
  };

  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  return (
    <span className={`inline-block rounded-full ${statusClasses[status]} ${sizeClasses[size]}`}></span>
  );
};

export default StatusIndicator;