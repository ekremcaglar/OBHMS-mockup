import React from 'react';
import {
  Search, ChevronDown, ArrowLeft, Printer, Plus, Trash2, Edit3, Save, X, Check, Layout,
  Settings, LayoutDashboard, HeartPulse, AreaChart, FileText, LoaderCircle, Sparkles,
  AlertTriangle, Info, CheckCircle, Plane, Wrench, TrendingUp, FileCheck2, ArrowUp, ArrowDown, Minus,
  ShieldAlert, RadioTower, Activity, Rotate3d, ZoomIn, ZoomOut, Move3d, User, LayoutGrid, Bell, Radar, HelpCircle,
  Users, ClipboardList, BookOpen, BarChartHorizontal
} from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  Search, ChevronDown, ArrowLeft, Printer, Plus, Trash2, Edit3, Save, X, Check, Layout,
  Settings, LayoutDashboard, HeartPulse, AreaChart, FileText, LoaderCircle, Sparkles,
  AlertTriangle, Info, CheckCircle, Plane, Wrench, TrendingUp, FileCheck2, ArrowUp, ArrowDown, Minus,
  ShieldAlert, RadioTower, Activity, Rotate3d, ZoomIn, ZoomOut, Move3d, User, LayoutGrid, Bell, Radar, HelpCircle,
  Users, ClipboardList, BookOpen, BarChartHorizontal
};

interface IconProps {
  name: string;
  color?: string;
  size?: number | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;