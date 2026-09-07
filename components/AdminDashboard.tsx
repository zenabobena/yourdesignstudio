import React, { useState } from 'react';
import { ScamReport, ScamAlert } from '../types';
import { INITIAL_REPORTS, INITIAL_ALERTS } from '../data';

const AdminDashboard: React.FC = () => {
    const [reports, setReports] = useState<ScamReport[]>(() => {
        try {
            const saved = localStorage.getItem('pasop_custom_reports');
            if (saved) {
                return [...JSON.parse(saved), ...INITIAL_REPORTS];
            }
        } catch {}
        return INITIAL_REPORTS;
    });

    const [alerts, setAlerts] = useState<ScamAlert[]>(INITIAL_ALERTS);
    const [newAlertTitle, setNewAlertTitle] = useState('');
    const [newAlertDesc, setNewAlertDesc] = useState('');
    const [newAlertCategory, setNewAlertCategory] = useState('Banking & Card Fraud');
    const [newAlertSeverity, setNewAlertSeverity] = useState<'critical' | 'high' | 'medium'>('high');
    const [alertSuccess, setAlertSuccess] = useState(false);

    const handleVerify = (id: string) => {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'verified' } : r));
    };

    const handleDismiss = (id: string) => {
        setReports(prev => prev.filter(r => r.id !== id));
    };

    const handleCreateAlert = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAlertTitle || !newAlertDesc) return;

        const newAlert: ScamAlert = {
            id: `alt-adm-${Date.now()}`,
            title: newAlertTitle.trim(),
            description: newAlertDesc.trim(),
            category: newAlertCategory,
            severity: newAlertSeverity,
            date: 'Just now',
            source: 'PASOP Administrator Bulletin',
            affectedProvince: 'National Priority'
        };

        setAlerts([newAlert, ...alerts]);
        setNewAlertTitle('');
        setNewAlertDesc('');
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 4000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Security Operations Console</h1>
                    <p className="text-xs text-gray-500">Moderation dashboard for verified reports and live warning dispatches</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                        Live System Operational
                    </span>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-xs text-gray-500 font-medium">Total Reports</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">{reports.length}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-xs text-gray-500 font-medium">Broadcast Alerts</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">{alerts.length}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-xs text-gray-500 font-medium">Fraud Stopped</div>
                    <div className="text-xl font-bold text-green-700 mt-1">R1.4M+</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-xs text-gray-500 font-medium">Active Syndicates</div>
                    <div className="text-xl font-bold text-red-600 mt-1">14 Flagged</div>
                </div>
            </div>

            {/* Broadcast New Alert */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-base font-bold text-gray-900">Dispatch Emergency Alert Bulletin</h2>
                {alertSuccess && (
                    <div className="p-3 bg-green-50 text-green-800 rounded-xl text-xs font-semibold">
                        ✓ Alert successfully published to all live feeds!
                    </div>
                )}
                <form onSubmit={handleCreateAlert} className="space-y-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Headline</label>
                        <input
                            type="text"
                            required
                            value={newAlertTitle}
                            onChange={(e) => setNewAlertTitle(e.target.value)}
                            placeholder="e.g. Surge in fake Capitec OTP calls targeting pension payouts"
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                            <select
                                value={newAlertCategory}
                                onChange={(e) => setNewAlertCategory(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                            >
                                <option value="Banking & Card Fraud">Banking & Card Fraud</option>
                                <option value="WhatsApp & SMS Phishing">WhatsApp & SMS Phishing</option>
                                <option value="Impersonation (SARS/Police/Bank)">Impersonation (SARS/Police/Bank)</option>
                                <option value="Job & Employment Offers">Job & Employment Offers</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Severity Level</label>
                            <select
                                value={newAlertSeverity}
                                onChange={(e) => setNewAlertSeverity(e.target.value as any)}
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                            >
                                <option value="critical">Critical (Immediate danger)</option>
                                <option value="high">High (Widespread campaign)</option>
                                <option value="medium">Medium (Moderate reports)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Description & Safety Advice</label>
                        <textarea
                            rows={3}
                            required
                            value={newAlertDesc}
                            onChange={(e) => setNewAlertDesc(e.target.value)}
                            placeholder="Detail the tactics used and what immediate action citizens should take..."
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition"
                    >
                        Publish Broadcast Alert
                    </button>
                </form>
            </div>

            {/* Reports Queue */}
            <div>
                <h2 className="text-base font-bold text-gray-900 mb-3">Community Submissions Queue</h2>
                <div className="space-y-3">
                    {reports.slice(0, 5).map(rep => (
                        <div key={rep.id} className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                                        {rep.category}
                                    </span>
                                    <span className="text-xs text-gray-400">Date: {rep.date}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900">{rep.title}</h4>
                                <p className="text-xs text-gray-600 line-clamp-1">{rep.description}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => handleVerify(rep.id)}
                                    className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition"
                                >
                                    Verify
                                </button>
                                <button
                                    onClick={() => handleDismiss(rep.id)}
                                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg transition"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
