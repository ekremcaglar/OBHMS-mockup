import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const ManualSection: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            {description && <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
        <div className="p-6">{children}</div>
    </div>
);

const ColorSwatch: React.FC<{ hex: string; name: string; }> = ({ hex, name }) => (
    <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600" style={{ backgroundColor: hex }}></div>
        <div>
            <div className="font-semibold text-gray-800 dark:text-white">{name}</div>
            <div className="text-sm font-mono text-gray-500 dark:text-gray-400">{hex}</div>
        </div>
    </div>
);

const ColorGroup: React.FC<{ title: string; description: string; children: React.ReactNode; }> = ({ title, description, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}
        </div>
    </div>
);

const TypeSample: React.FC<{ title: string; className: string; text: string }> = ({ title, className, text }) => (
    <div>
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
        <p className={className}>{text}</p>
    </div>
);

const IconSample: React.FC<{ name: string; label: string; }> = ({ name, label }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <Icon name={name} className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-2" />
        <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
    </div>
);


const UISpecsManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="Palette" className="w-10 h-10" />
                {t('manual_ui_ux_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_ui_ux_subtitle')}
            </p>

            <ManualSection title={t('manual_section_color_palette')} description={t('manual_color_palette_desc')}>
                <div className="space-y-8">
                    <ColorGroup title={t('manual_color_primary')} description={t('manual_color_primary_desc')}>
                        <ColorSwatch hex="#0ea5e9" name="Sky-500" />
                        <ColorSwatch hex="#0284c7" name="Sky-600" />
                        <ColorSwatch hex="#0369a1" name="Sky-700" />
                    </ColorGroup>
                    <ColorGroup title={t('manual_color_secondary')} description={t('manual_color_secondary_desc')}>
                         <ColorSwatch hex="#475569" name="Slate-600" />
                         <ColorSwatch hex="#334155" name="Slate-700" />
                         <ColorSwatch hex="#1e293b" name="Slate-800" />
                    </ColorGroup>
                    <ColorGroup title={t('manual_color_background')} description={t('manual_color_background_desc')}>
                        <ColorSwatch hex="#101827" name="Primary BG" />
                        <ColorSwatch hex="#1f2937" name="Surface (e.g. Card)" />
                        <ColorSwatch hex="#374151" name="Border / Divider" />
                    </ColorGroup>
                    <ColorGroup title={t('manual_color_status')} description={t('manual_color_status_desc')}>
                        <ColorSwatch hex="#22c55e" name={t('manual_status_nominal')} />
                        <ColorSwatch hex="#f59e0b" name={t('manual_status_warning')} />
                        <ColorSwatch hex="#ef4444" name={t('manual_status_critical')} />
                    </ColorGroup>
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_typography')} description={t('manual_typography_desc')}>
                <div className="space-y-6">
                    <TypeSample title={t('manual_typography_h1')} className="text-4xl font-bold text-gray-900 dark:text-white" text="Fleet Command Overview" />
                    <TypeSample title={t('manual_typography_h2')} className="text-2xl font-bold text-gray-900 dark:text-white" text="Aircraft Watchlist" />
                    <TypeSample title={t('manual_typography_h3')} className="text-lg font-semibold text-gray-800 dark:text-white" text="Primary Alert" />
                    <TypeSample title={t('manual_typography_body')} className="text-base text-gray-600 dark:text-gray-400" text={t('manual_ui_ux_subtitle')} />
                    <TypeSample title={t('manual_typography_label')} className="text-xs text-gray-500 dark:text-gray-500 uppercase" text="Mission Capable Rate" />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_iconography')} description={t('manual_iconography_desc')}>
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('manual_icon_examples')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    <IconSample name="Plane" label="Brand / Aircraft" />
                    <IconSample name="LayoutDashboard" label="Dashboards" />
                    <IconSample name="HeartPulse" label="Health" />
                    <IconSample name="AlertTriangle" label="Warning" />
                    <IconSample name="CheckCircle" label="Success / Nominal" />
                    <IconSample name="Settings" label="Settings" />
                    <IconSample name="Search" label="Search" />
                    <IconSample name="Plus" label="Add / Create" />
                    <IconSample name="Printer" label="Print" />
                    <IconSample name="Sparkles" label="AI / Generate" />
                    <IconSample name="FileText" label="Reports / Files" />
                    <IconSample name="Users" label="Users / Roles" />
                </div>
            </ManualSection>
            
            {/* FIX: Changed the translation key from the duplicate 'manual_section_layout' to 'manual_ui_ux_section_layout' to correctly display the section title. */}
            <ManualSection title={t('manual_ui_ux_section_layout')} description={t('manual_layout_desc')}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{t('manual_layout_container')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('manual_layout_container_desc')}</p>
                    </div>
                     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{t('manual_layout_grid')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('manual_layout_grid_desc')}</p>
                    </div>
                     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{t('manual_layout_spacing')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('manual_layout_spacing_desc')}</p>
                    </div>
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_states')} description={t('manual_states_desc')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                    <div>
                        <p className="text-center mb-2 font-semibold text-gray-800 dark:text-white">{t('manual_states_default')}</p>
                        <button className="w-full py-2 px-4 text-sm font-semibold rounded-lg bg-sky-600 text-white">Action Button</button>
                    </div>
                    <div>
                        <p className="text-center mb-2 font-semibold text-gray-800 dark:text-white">{t('manual_states_hover')}</p>
                        <button className="w-full py-2 px-4 text-sm font-semibold rounded-lg bg-sky-500 text-white">Action Button</button>
                    </div>
                    <div>
                        <p className="text-center mb-2 font-semibold text-gray-800 dark:text-white">{t('manual_states_active')}</p>
                        <button className="w-full py-2 px-4 text-sm font-semibold rounded-lg bg-sky-700 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-sky-500">Action Button</button>
                    </div>
                     <div>
                        <p className="text-center mb-2 font-semibold text-gray-800 dark:text-white">{t('manual_states_disabled')}</p>
                        <button className="w-full py-2 px-4 text-sm font-semibold rounded-lg bg-gray-500 text-white cursor-not-allowed">Action Button</button>
                    </div>
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_animations')} description={t('manual_animations_desc')}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{t('manual_animation_fade')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('manual_animation_fade_desc')}</p>
                    </div>
                     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{t('manual_animation_hover')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('manual_animation_hover_desc')}</p>
                    </div>
                     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{t('manual_animation_layout')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('manual_animation_layout_desc')}</p>
                    </div>
                </div>
            </ManualSection>
        </div>
    );
};

export default UISpecsManualPage;
