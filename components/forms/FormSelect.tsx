import React from 'react';

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, value, onChange, children, className = '' }) => (
    <div className={`mb-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
            {children}
        </select>
    </div>
);

export default FormSelect;