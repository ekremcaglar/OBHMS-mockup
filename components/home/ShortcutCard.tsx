import React from 'react';
import Icon from '../Icon';

interface ShortcutCardProps {
    icon: string;
    label: string;
    onClick?: () => void;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ icon, label, onClick }) => (
    <div onClick={onClick} className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 transition-colors cursor-pointer">
        <Icon name={icon} className="w-8 h-8 text-sky-400" />
        <span className="text-white font-medium">{label}</span>
    </div>
);

export default ShortcutCard;