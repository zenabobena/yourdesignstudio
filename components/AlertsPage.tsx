import React, { useState } from 'react';
import { User, ScamAlert } from '../types';
import { INITIAL_ALERTS } from '../data';

interface AlertsPageProps {
    currentUser: User | null;
    onSaveSuccess: (msg?: { title: string; body: string }) => void;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ currentUser, onSaveSuccess }) => {
    const [alerts, setAlerts] = useState<ScamAlert[]>(INITIAL_ALERTS);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [savedAlertIds, setSavedAlertIds] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('pasop_saved_alerts');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const categories = ['All', 'Banking & Card Fraud', 'WhatsApp & SMS Phishing', 'Impersonation (SARS/Police/Bank)', 'Online Shopping & Marketplace'];

    const handleToggleSave = (alertId: string) => {
        let updated: string[];
        if (savedAlertIds.includes(alertId)) {
            updated = savedAlertIds.filter(id => id !== alertId);
            setSavedAlertIds(updated);
            localStorage.setItem('pasop_saved_alerts', JSON.stringify(updated));
            onSaveSuccess({
                title: 'Alert Removed',
                body: 'The alert has been removed from your saved list.'
            });
        } else {
            updated = [...savedAlertIds, alertId];
            setSavedAlertIds(updated);
            localStorage.setItem('pasop_saved_alerts', JSON.stringify(updated));
            onSaveSuccess({
                title: 'Alert Saved!',
                body: 'This scam alert has been bookmarked to your account for quick reference.'
            });
        }
    };

    const handleShare = (alert: ScamAlert) => {
        const text = `⚠️ PASOP ALERT: ${alert.title}\n\n${alert.description}\n\nSafety Advice: ${alert.advice || 'Stay alert.'}\nStay safe with PASOP SA.`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            onSaveSuccess({
                title: 'Copied to Clipboard!',
                body: 'Alert details copied. You can now paste and forward this warning to your family and WhatsApp groups.'
            });
        }
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesCategory = selectedCategory === 'All' || alert.category === selectedCategory;
        const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (alert.affectedProvince && alert.affectedProvince.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Live Fraud & Scam Alerts</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Verified real-time warnings from banks, law enforcement, and verified South African community reports.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter alerts by keyword (e.g. Capitec, WhatsApp, SARS, FNB)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />

                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                                selectedCategory === cat
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {filteredAlerts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-sm text-gray-600">No alerts matched your search query.</p>
                    </div>
                ) : (
                    filteredAlerts.map(alert => {
                        const isSaved = savedAlertIds.includes(alert.id);
                        return (
                            <div key={alert.id} className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                            alert.severity === 'critical' ? 'bg-red-600 text-white' :
                                            alert.severity === 'high' ? 'bg-orange-500 text-white' :
                                            'bg-yellow-500 text-white'
                                        }`}>
                                            {alert.severity} Risk
                                        </span>
                                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                                            {alert.category}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{alert.date}</span>
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900 leading-snug">{alert.title}</h2>
                                    <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed">{alert.description}</p>
                                </div>

                                {alert.advice && (
                                    <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl text-xs text-red-950">
                                        <span className="font-bold text-red-700">🛡️ Recommended Action: </span>
                                        {alert.advice}
                                    </div>
                                )}

                                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                                    <div className="flex items-center gap-3">
                                        <span>📍 {alert.affectedProvince}</span>
                                        <span>•</span>
                                        <span>Source: {alert.source}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleSave(alert.id)}
                                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                                                isSaved
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {isSaved ? '★ Bookmarked' : '☆ Save'}
                                        </button>
                                        <button
                                            onClick={() => handleShare(alert)}
                                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            Share / Forward
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AlertsPage;
