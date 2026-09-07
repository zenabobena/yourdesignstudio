import React, { useState } from 'react';
import { User, ScamReport } from '../types';
import { INITIAL_REPORTS } from '../data';

interface DatabasePageProps {
    currentUser: User | null;
}

const DatabasePage: React.FC<DatabasePageProps> = ({ currentUser }) => {
    const [reports, setReports] = useState<ScamReport[]>(() => {
        try {
            const local = localStorage.getItem('pasop_custom_reports');
            if (local) {
                const parsed = JSON.parse(local);
                return [...parsed, ...INITIAL_REPORTS];
            }
        } catch {
            // fallback
        }
        return INITIAL_REPORTS;
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedProvince, setSelectedProvince] = useState<string>('All');
    const [expandedReportId, setExpandedReportId] = useState<string | null>(null);

    const categories = [
        'All',
        'Courier & Delivery Parcel',
        'Job & Employment Offers',
        'Crypto & Investment Schemes',
        'Online Shopping & Marketplace',
        'Banking & Card Fraud',
        'WhatsApp & SMS Phishing'
    ];

    const provinces = [
        'All',
        'Gauteng',
        'Western Cape',
        'KwaZulu-Natal',
        'Eastern Cape',
        'North West',
        'Free State',
        'Limpopo',
        'Mpumalanga',
        'Northern Cape'
    ];

    const handleUpvote = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setReports(prev => prev.map(rep => {
            if (rep.id === id) {
                return { ...rep, upvotes: rep.upvotes + 1 };
            }
            return rep;
        }));
    };

    const handleFlag = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setReports(prev => prev.map(rep => {
            if (rep.id === id) {
                return { ...rep, flaggedCount: rep.flaggedCount + 1 };
            }
            return rep;
        }));
    };

    const filteredReports = reports.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesProvince = selectedProvince === 'All' || item.location === selectedProvince;
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            (item.scammerContact && item.scammerContact.toLowerCase().includes(q)) ||
            item.platform.toLowerCase().includes(q);

        return matchesCategory && matchesProvince && matchesQuery;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Community Scam Database</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Search and browse incident reports submitted by South Africans to verify fraud patterns before engaging.
                </p>
            </div>

            {/* Filter Controls */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by scam title, contact number, bank, or keyword..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Province</label>
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {provinces.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Showing {filteredReports.length} reports</span>
                <span>South Africa National Register</span>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {filteredReports.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-sm text-gray-600">No scam records found matching your filters.</p>
                    </div>
                ) : (
                    filteredReports.map(report => {
                        const isExpanded = expandedReportId === report.id;
                        return (
                            <div
                                key={report.id}
                                onClick={() => setExpandedReportId(isExpanded ? null : report.id)}
                                className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-black/50 transition cursor-pointer shadow-sm space-y-3"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black text-white">
                                            {report.category}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            📍 {report.location || 'National'}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400">{report.date}</span>
                                </div>

                                <h2 className="text-base font-bold text-gray-900 leading-snug">{report.title}</h2>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    {isExpanded ? report.description : `${report.description.slice(0, 140)}...`}
                                </p>

                                {isExpanded && (
                                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs">
                                        {report.scammerContact && (
                                            <div className="p-2.5 rounded-lg bg-red-50 text-red-900 font-mono text-xs">
                                                <span className="font-bold">Scammer Contact / Account: </span>
                                                {report.scammerContact}
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-2 text-gray-600">
                                            <div><span className="font-semibold text-gray-900">Platform:</span> {report.platform}</div>
                                            <div>
                                                <span className="font-semibold text-gray-900">Loss Incurred:</span>{' '}
                                                {report.lossAmount ? `R${report.lossAmount.toLocaleString()}` : 'None reported (attempt only)'}
                                            </div>
                                        </div>
                                        {report.aiAnalysis && (
                                            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
                                                <span className="font-bold text-gray-900">💡 Fraud Pattern Analysis: </span>
                                                {report.aiAnalysis}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => handleUpvote(report.id, e)}
                                            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium flex items-center gap-1 transition"
                                            title="Confirm you experienced this scam too"
                                        >
                                            👍 Me too ({report.upvotes})
                                        </button>
                                        <button
                                            onClick={(e) => handleFlag(report.id, e)}
                                            className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-red-600 transition"
                                            title="Flag report as suspicious"
                                        >
                                            🚩 Flag
                                        </button>
                                    </div>
                                    <span className="text-gray-400 font-medium">
                                        {isExpanded ? 'Click to collapse ▲' : 'Click to view details ▼'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DatabasePage;
