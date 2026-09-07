import React, { useState } from 'react';
import { FlaggedEntity } from '../types';
import { INITIAL_FLAGGED } from '../data';

const FlaggedListPage: React.FC = () => {
    const [flaggedList, setFlaggedList] = useState<FlaggedEntity[]>(() => {
        try {
            const saved = localStorage.getItem('pasop_custom_flagged');
            if (saved) {
                return [...JSON.parse(saved), ...INITIAL_FLAGGED];
            }
        } catch {}
        return INITIAL_FLAGGED;
    });

    const [filterType, setFilterType] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmittingNew, setIsSubmittingNew] = useState(false);
    const [newValue, setNewValue] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [newType, setNewType] = useState<'phone' | 'bank_account' | 'email' | 'website'>('phone');
    const [newScamType, setNewScamType] = useState('');

    const handleAddFlagged = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newValue || !newLabel) return;

        const newEntity: FlaggedEntity = {
            id: `flg-custom-${Date.now()}`,
            type: newType,
            value: newValue,
            label: newLabel,
            reportsCount: 1,
            lastReported: 'Just now',
            associatedScamType: newScamType || 'Community Report',
            status: 'investigating'
        };

        const updated = [newEntity, ...flaggedList];
        setFlaggedList(updated);
        try {
            const existingCustom = JSON.parse(localStorage.getItem('pasop_custom_flagged') || '[]');
            localStorage.setItem('pasop_custom_flagged', JSON.stringify([newEntity, ...existingCustom]));
        } catch {}

        setIsSubmittingNew(false);
        setNewValue('');
        setNewLabel('');
        setNewScamType('');
    };

    const filtered = flaggedList.filter(item => {
        const matchesType = filterType === 'all' || item.type === filterType;
        const q = searchTerm.toLowerCase();
        const matchesSearch = item.value.toLowerCase().includes(q) ||
                              item.label.toLowerCase().includes(q) ||
                              item.associatedScamType.toLowerCase().includes(q);
        return matchesType && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Flagged Directory</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        High-risk cellphone numbers, mule bank accounts, phishing URLs, and fraudulent emails.
                    </p>
                </div>
                <button
                    onClick={() => setIsSubmittingNew(!isSubmittingNew)}
                    className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition whitespace-nowrap"
                >
                    {isSubmittingNew ? 'Cancel Flag' : '+ Flag a Number / Account'}
                </button>
            </div>

            {/* Submit New Modal / Form Card */}
            {isSubmittingNew && (
                <form onSubmit={handleAddFlagged} className="p-5 bg-gray-50 rounded-2xl border border-gray-300 space-y-3">
                    <h2 className="text-sm font-bold text-gray-900">Flag a Suspicious Entity</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Entity Type</label>
                            <select
                                value={newType}
                                onChange={(e) => setNewType(e.target.value as any)}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                            >
                                <option value="phone">Cellphone Number (WhatsApp / SMS / Call)</option>
                                <option value="bank_account">Bank Account / eWallet / Cash Send</option>
                                <option value="website">Suspicious URL / Phishing Website</option>
                                <option value="email">Fraudulent Email Address</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Value (Number, Account, Link)</label>
                            <input
                                type="text"
                                required
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                placeholder="e.g. 071 993 1120 or Capitec 19482..."
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Warning Label</label>
                            <input
                                type="text"
                                required
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                placeholder="e.g. Pep Paxi deposit scammer"
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Associated Scam Type</label>
                            <input
                                type="text"
                                value={newScamType}
                                onChange={(e) => setNewScamType(e.target.value)}
                                placeholder="e.g. Job Offer Medical Fee"
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition"
                    >
                        Submit Flag to Directory
                    </button>
                </form>
            )}

            {/* Filter and Search Bar */}
            <div className="space-y-3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search flagged numbers, bank accounts, emails..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />

                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs font-medium">
                    {['all', 'phone', 'bank_account', 'website', 'email'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-3 py-1.5 rounded-lg capitalize transition ${
                                filterType === type
                                    ? 'bg-black text-white font-semibold'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {type.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Entity Cards */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-sm text-gray-600">No flagged records found for this query.</p>
                    </div>
                ) : (
                    filtered.map(entity => (
                        <div key={entity.id} className="p-4 rounded-xl border border-gray-200 bg-white hover:border-black transition shadow-sm space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700">
                                        {entity.type.replace('_', ' ')}
                                    </span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                        entity.status === 'confirmed_fraud' 
                                            ? 'bg-black text-white' 
                                            : 'bg-amber-100 text-amber-900'
                                    }`}>
                                        {entity.status === 'confirmed_fraud' ? 'Confirmed Fraud' : 'Under Investigation'}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">Reports: {entity.reportsCount}</span>
                            </div>

                            <div className="font-mono text-sm font-bold text-gray-900 bg-gray-50 p-2 rounded-lg border border-gray-100 select-all">
                                {entity.value}
                            </div>

                            <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 gap-1 pt-1">
                                <div>
                                    <span className="font-semibold text-gray-800">{entity.label}</span>
                                    <span className="text-gray-400"> ({entity.associatedScamType})</span>
                                </div>
                                <span className="text-gray-400">Last reported: {entity.lastReported}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FlaggedListPage;
