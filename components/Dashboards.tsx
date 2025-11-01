import React, { useState } from 'react';
import { Dashboard, Tile, TileType } from '../types';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import DashboardTile from './dashboard/DashboardTile';
import { AVAILABLE_TILES } from '../constants';
import Icon from './Icon';
import { useI18n } from '../context/I18nContext';

interface DashboardsProps {
    dashboards: Dashboard[];
    setDashboards: React.Dispatch<React.SetStateAction<Dashboard[]>>;
    activeDashboardId: string;
    setActiveDashboardId: (id: string) => void;
    onAircraftSelect: (id: string) => void;
}

const Dashboards: React.FC<DashboardsProps> = ({ dashboards, setDashboards, activeDashboardId, setActiveDashboardId, onAircraftSelect }) => {
    const [editingDashboardId, setEditingDashboardId] = useState<string | null>(null);
    const [editingDashboardName, setEditingDashboardName] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const { t } = useI18n();

    const activeDashboard = dashboards.find(db => db.id === activeDashboardId);

    const handleCreateDashboard = () => {
        const newId = `db-${Date.now()}`;
        const newDashboard: Dashboard = { id: newId, name: `${t('new_dashboard')} ${dashboards.length + 1}`, tiles: [] };
        setDashboards([...dashboards, newDashboard]);
        setActiveDashboardId(newId);
    };

    const handleDeleteDashboard = (id: string) => {
        const newDashboards = dashboards.filter(db => db.id !== id);
        setDashboards(newDashboards);
        if (activeDashboardId === id) {
            setActiveDashboardId(newDashboards.length > 0 ? newDashboards[0].id : '');
        }
    };

    const handleStartEdit = (dashboard: Dashboard) => {
        setEditingDashboardId(dashboard.id);
        setEditingDashboardName(dashboard.name);
    };

    const handleSaveEdit = (id: string) => {
        setDashboards(dashboards.map(db => (db.id === id ? { ...db, name: editingDashboardName } : db)));
        setEditingDashboardId(null);
    };

    const handleCancelEdit = () => {
        setEditingDashboardId(null);
    };
    
    const handleAddTile = (tileType: TileType, defaultGridSpan: number, defaultMetricId?: string) => {
        if (!activeDashboard) return;
        const newTile: Tile = {
            id: `tile-${Date.now()}`,
            type: tileType,
            gridSpan: defaultGridSpan,
            ...(defaultMetricId && { metricId: defaultMetricId }),
            ...(tileType.includes('chart') && { title: `New ${tileType.replace('_', ' ')}` }),
        };
        const updatedDashboard = { ...activeDashboard, tiles: [...activeDashboard.tiles, newTile] };
        setDashboards(dashboards.map(db => db.id === activeDashboardId ? updatedDashboard : db));
    };

    const handleRemoveTile = (tileId: string) => {
        if (!activeDashboard) return;
        const updatedTiles = activeDashboard.tiles.filter(t => t.id !== tileId);
        const updatedDashboard = { ...activeDashboard, tiles: updatedTiles };
        setDashboards(dashboards.map(db => db.id === activeDashboardId ? updatedDashboard : db));
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
            <aside className="lg:col-span-3 bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white">{t('my_dashboards')}</h2>
                    <button onClick={handleCreateDashboard} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700/50">
                        <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                <div className="space-y-2 overflow-y-auto">
                    {dashboards.map(db => (
                        <div key={db.id} className={`group w-full text-left p-3 rounded-md transition-colors flex items-center justify-between ${activeDashboardId === db.id ? 'bg-sky-600/20 dark:bg-cyan-600/50' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}>
                            {editingDashboardId === db.id ? (
                                <input
                                    type="text"
                                    value={editingDashboardName}
                                    onChange={(e) => setEditingDashboardName(e.target.value)}
                                    className="bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-white w-full text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-sm px-1"
                                    autoFocus
                                />
                            ) : (
                                <button onClick={() => setActiveDashboardId(db.id)} className="flex-grow text-left text-sm font-semibold text-gray-800 dark:text-white truncate">
                                    {db.name}
                                </button>
                            )}
                            <div className="flex items-center space-x-1 flex-shrink-0">
                                {editingDashboardId === db.id ? (
                                    <>
                                        <button onClick={() => handleSaveEdit(db.id)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600"><Save className="w-4 h-4 text-green-500" /></button>
                                        <button onClick={handleCancelEdit} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600"><X className="w-4 h-4 text-gray-500" /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleStartEdit(db)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100"><Edit3 className="w-4 h-4 text-yellow-500" /></button>
                                        <button onClick={() => handleDeleteDashboard(db.id)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="lg:col-span-9 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm flex flex-col">
                {activeDashboard ? (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{activeDashboard.name}</h1>
                            <div className="flex items-center space-x-4">
                               <button onClick={() => setIsEditMode(!isEditMode)} className="flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-white">
                                    <Icon name={isEditMode ? "Check" : "Layout"} className="w-4 h-4" />
                                    <span>{isEditMode ? t('done_editing') : t('edit_layout')}</span>
                                </button>
                                {isEditMode && (
                                    <div className="relative group">
                                        <button className="flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors bg-sky-600 hover:bg-sky-500 text-white">
                                            <Icon name="Plus" className="w-4 h-4" />
                                            <span>{t('add_tile')}</span>
                                        </button>
                                        <div className="absolute hidden group-hover:block right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 w-48 top-full mt-1 z-10 border border-gray-200 dark:border-gray-700">
                                            {AVAILABLE_TILES.map(tile => (
                                                <a key={tile.type} onClick={() => handleAddTile(tile.type, tile.defaultGridSpan, tile.defaultMetricId)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{tile.name}</a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                             <div className="grid grid-cols-12 gap-6">
                                {activeDashboard.tiles.map(tile => (
                                    <DashboardTile key={tile.id} tile={tile} onAircraftSelect={onAircraftSelect} isEditMode={isEditMode} onRemove={() => handleRemoveTile(tile.id)} />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>{t('select_or_create_dashboard')}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboards;