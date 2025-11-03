import React, { useState, useMemo } from 'react';
import { MOCK_TCP_DATA } from '../constants';
import { TCP, TCPStatus } from '../types';
import Icon from './Icon';
import { useI18n } from '../context/I18nContext';
import { Check, X as XIcon, ArrowUpCircle } from 'lucide-react';

const StatusBadge: React.FC<{ status: TCPStatus }> = ({ status }) => {
  const statusClasses = {
    Approved: 'bg-green-500/20 text-green-500 dark:text-green-400 border-green-500/30',
    'In Review': 'bg-yellow-400/20 text-yellow-500 dark:text-yellow-300 border-yellow-400/30',
    Rejected: 'bg-red-500/20 text-red-500 dark:text-red-400 border-red-500/30',
    Draft: 'bg-gray-500/20 text-gray-500 dark:text-gray-400 border-gray-500/30',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

const NewTcpModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdd: (tcp: Omit<TCP, 'id' | 'status' | 'createdDate'>) => void; }> = ({ isOpen, onClose, onAdd }) => {
    const { t } = useI18n();
    const [title, setTitle] = useState('');
    const [aircraft, setAircraft] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !aircraft || !author) return;
        onAdd({ title, aircraftSerialNumber: aircraft, author });
        onClose();
        setTitle(''); setAircraft(''); setAuthor('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('create_tcp')}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Icon name="X" className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('tcp_title')}</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('tcp_aircraft_sn')}</label>
                            <input type="text" value={aircraft} onChange={e => setAircraft(e.target.value)} className="w-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('tcp_author')}</label>
                            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                        </div>
                    </div>
                    <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                        <button type="button" onClick={onClose} className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-white">{t('cancel')}</button>
                        <button type="submit" className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-sky-600 hover:bg-sky-500 text-white">{t('create_tcp')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TCPPage: React.FC = () => {
    const { t } = useI18n();
    const [tcps, setTcps] = useState<TCP[]>(MOCK_TCP_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleAction = (id: string, newStatus: TCPStatus) => {
        setTcps(tcps.map(tcp => tcp.id === id ? { ...tcp, status: newStatus } : tcp));
    };

    const filteredData = useMemo(() => {
        return tcps
            .filter(tcp => 
                (tcp.title.toLowerCase().includes(searchTerm.toLowerCase()) || tcp.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (statusFilter === 'All' || tcp.status === statusFilter)
            )
            .sort((a, b) => {
                const dateA = new Date(a.createdDate).getTime();
                const dateB = new Date(b.createdDate).getTime();
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });
    }, [tcps, searchTerm, statusFilter, sortOrder]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleAddNewTcp = (newTcpData: Omit<TCP, 'id' | 'status' | 'createdDate'>) => {
        const newTcp: TCP = {
            ...newTcpData,
            id: `TCP-${new Date().getFullYear()}-${String(tcps.length + 1).padStart(3, '0')}`,
            status: 'Draft',
            createdDate: new Date().toISOString().split('T')[0],
        };
        setTcps(prev => [newTcp, ...prev]);
    };

    return (
        <div>
            <NewTcpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddNewTcp} />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Icon name="FileCheck2" className="w-8 h-8" />
                    {t('technical_compliance_portal')}
                </h1>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    <Icon name="Plus" className="w-4 h-4" />
                    <span>{t('new_tcp')}</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-xl flex items-center justify-between gap-4">
                <div className="relative flex-grow">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon name="Search" className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" placeholder={t('search_tcps')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full rounded-md border-0 bg-white dark:bg-slate-700/50 py-2 pl-9 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm" />
                </div>
                <div className="flex items-center gap-4">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-md border-0 bg-white dark:bg-slate-700/50 py-2 pl-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm">
                        <option value="All">{t('all_statuses')}</option>
                        <option value="Approved">Approved</option>
                        <option value="In Review">In Review</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Draft">Draft</option>
                    </select>
                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="rounded-md border-0 bg-white dark:bg-slate-700/50 py-2 pl-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm">
                        <option value="newest">{t('newest_first')}</option>
                        <option value="oldest">{t('oldest_first')}</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden">
                <div className="grid grid-cols-12 items-center px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/30">
                    <div className="col-span-2">{t('tcp_id')}</div>
                    <div className="col-span-3">{t('tcp_title')}</div>
                    <div className="col-span-1">{t('tcp_aircraft_sn')}</div>
                    <div className="col-span-1">{t('tcp_status')}</div>
                    <div className="col-span-1">{t('tcp_author')}</div>
                    <div className="col-span-2 text-center">{t('tcp_created')}</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700/50">
                    {paginatedData.map((tcp) => (
                        <div key={tcp.id} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                            <div className="col-span-2 font-mono text-xs text-sky-600 dark:text-cyan-400">{tcp.id}</div>
                            <div className="col-span-3 font-medium text-gray-900 dark:text-white">{tcp.title}</div>
                            <div className="col-span-1 text-sm text-gray-600 dark:text-gray-300">{tcp.aircraftSerialNumber}</div>
                            <div className="col-span-1">
                                <StatusBadge status={tcp.status} />
                            </div>
                            <div className="col-span-1 text-sm text-gray-600 dark:text-gray-300">{tcp.author}</div>
                            <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400 text-center">{tcp.createdDate}</div>
                            <div className="col-span-2 text-right flex items-center justify-end gap-2">
                                {tcp.status === 'In Review' && (
                                    <>
                                        <button onClick={() => handleAction(tcp.id, 'Approved')} className="p-1.5 rounded-md text-green-600 bg-green-500/10 hover:bg-green-500/20" title="Approve"><Check size={16} /></button>
                                        <button onClick={() => handleAction(tcp.id, 'Rejected')} className="p-1.5 rounded-md text-red-600 bg-red-500/10 hover:bg-red-500/20" title="Reject"><XIcon size={16} /></button>
                                    </>
                                )}
                                {tcp.status === 'Draft' && (
                                    <button onClick={() => handleAction(tcp.id, 'In Review')} className="p-1.5 rounded-md text-sky-600 bg-sky-500/10 hover:bg-sky-500/20" title="Submit for Review"><ArrowUpCircle size={16} /></button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/30 text-xs text-gray-500 flex justify-between items-center">
                    <span>{t('showing_tcps', { count: paginatedData.length, total: filteredData.length })}</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 py-1 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700">Prev</button>
                        <span>{currentPage} / {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 py-1 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TCPPage;