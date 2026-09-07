import React, { useState } from 'react';
import { Page } from '../types';
import { INITIAL_ALERTS, INITIAL_REPORTS, INITIAL_FLAGGED } from '../data';

interface HomePageProps {
    setActivePage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [quickResult, setQuickResult] = useState<{ found: boolean; message: string } | null>(null);

    const handleQuickCheck = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();
        if (!query) return;

        const matchFlagged = INITIAL_FLAGGED.find(item => 
            item.value.toLowerCase().includes(query) || item.label.toLowerCase().includes(query)
        );
        const matchReport = INITIAL_REPORTS.find(item =>
            item.title.toLowerCase().includes(query) || 
            (item.scammerContact && item.scammerContact.toLowerCase().includes(query)) ||
            item.description.toLowerCase().includes(query)
        );

        if (matchFlagged) {
            setQuickResult({
                found: true,
                message: `⚠️ WARNING: Matches flagged entity "${matchFlagged.value}" (${matchFlagged.label}) with ${matchFlagged.reportsCount} community reports!`
            });
        } else if (matchReport) {
            setQuickResult({
                found: true,
                message: `⚠️ WARNING: Similar scam reported: "${matchReport.title}". Reported loss: R${matchReport.lossAmount?.toLocaleString() || 'N/A'}.`
            });
        } else {
            setQuickResult({
                found: false,
                message: `No immediate flags found for "${searchQuery}". Always exercise caution or search the full database.`
            });
        }
    };

    return (
        <div className="space-y-8">
            {/* Hero Alert Banner */}
            <div className="rounded-2xl bg-black text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider mb-3">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        Active Citizen Protection
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                        PASOP! Protect yourself and your family from fraud.
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                        South Africa's community-driven scam reporting center. Verify suspicious phone numbers, banking details, WhatsApp messages, and fake jobs before you lose your hard-earned money.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={() => setActivePage('report')}
                            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition shadow-sm active:scale-95"
                        >
                            Report a Scam Now
                        </button>
                        <button
                            onClick={() => setActivePage('database')}
                            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm border border-white/20 transition"
                        >
                            Browse Scam Database
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Check Tool */}
            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-200">
                <h2 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Quick Check: Is it a Scam?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Enter a South African cellphone number, bank account number, email, or company name to check against verified reports:
                </p>
                <form onSubmit={handleQuickCheck} className="mt-4 flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g. 071 884 9201, Capitec, Paxi, SARS refund..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-sm transition"
                    >
                        Verify Now
                    </button>
                </form>

                {quickResult && (
                    <div className={`mt-4 p-4 rounded-xl text-sm font-medium border ${
                        quickResult.found 
                            ? 'bg-red-50 text-red-800 border-red-200' 
                            : 'bg-green-50 text-green-800 border-green-200'
                    }`}>
                        <div className="flex items-start justify-between">
                            <p>{quickResult.message}</p>
                            <button
                                onClick={() => setQuickResult(null)}
                                className="text-xs ml-2 text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-2 pt-2 border-t border-black/10 flex gap-3 text-xs">
                            <button
                                onClick={() => setActivePage('database')}
                                className="underline font-bold"
                            >
                                Open detailed database
                            </button>
                            <button
                                onClick={() => setActivePage('report')}
                                className="underline"
                            >
                                File new community report
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Live Urgent Alerts */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">Latest Live Alerts</h2>
                        <p className="text-xs text-gray-500">Real-time fraud warnings across South Africa</p>
                    </div>
                    <button
                        onClick={() => setActivePage('alerts')}
                        className="text-xs font-semibold text-black hover:underline"
                    >
                        View all alerts &rarr;
                    </button>
                </div>

                <div className="space-y-3">
                    {INITIAL_ALERTS.slice(0, 3).map((alert) => (
                        <div
                            key={alert.id}
                            onClick={() => setActivePage('alerts')}
                            className="p-4 rounded-xl border border-gray-200 hover:border-black cursor-pointer transition bg-white shadow-sm hover:shadow"
                        >
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="inline-block font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700">
                                    {alert.category}
                                </span>
                                <span className="text-gray-400">{alert.date}</span>
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 leading-snug">{alert.title}</h3>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.description}</p>
                            <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                                <span>📍 {alert.affectedProvince}</span>
                                <span>•</span>
                                <span>🛡️ {alert.source}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* South Africa 5 Golden Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🛡️</span> The PASOP Golden Rules of Safety
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-900 mb-1">1. Never share OTP or Banking PIN</p>
                        <p>No South African bank employee or fraud investigator will EVER ask for your App PIN, password, or OTP code.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-900 mb-1">2. Verify "Hi Mom / Dad" voice</p>
                        <p>If someone asks for money from a new number claiming to be family, call their old number or ask for a live voice note.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-900 mb-1">3. Legitimate jobs are 100% free</p>
                        <p>Never pay upfront for background checks, uniforms, medical clearance, or Pep Paxi registration fees.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-900 mb-1">4. Beware Proof-of-Payment SMS</p>
                        <p>Never hand over marketplace goods until the money physically reflects in your available balance via your bank app.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
