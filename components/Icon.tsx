
import React from 'react';
// @ts-ignore
import { icons } from 'lucide-react';

interface IconProps {
  name: string;
  color?: string;
  size?: number | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => {
  // @ts-ignore
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
