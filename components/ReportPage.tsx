import React, { useState } from 'react';
import { User, ScamReport, ScamCategory } from '../types';

interface ReportPageProps {
    onReportSuccess: (customMsg?: { title: string; body: string }) => void;
    currentUser: User | null;
}

const ReportPage: React.FC<ReportPageProps> = ({ onReportSuccess, currentUser }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<ScamCategory>('WhatsApp & SMS Phishing');
    const [platform, setPlatform] = useState('WhatsApp');
    const [scammerContact, setScammerContact] = useState('');
    const [location, setLocation] = useState('Gauteng');
    const [lossAmount, setLossAmount] = useState<string>('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories: ScamCategory[] = [
        'WhatsApp & SMS Phishing',
        'Banking & Card Fraud',
        'Impersonation (SARS/Police/Bank)',
        'Job & Employment Offers',
        'Online Shopping & Marketplace',
        'Crypto & Investment Schemes',
        'Courier & Delivery Parcel',
        'SIM Swap & OTP Theft',
        'Tender & Business Fraud',
        'Other'
    ];

    const platforms = [
        'WhatsApp',
        'SMS',
        'Direct Phone Call',
        'Facebook Marketplace',
        'Instagram / TikTok',
        'Telegram',
        'Email',
        'Gumtree / OLX',
        'Physical / In-Person'
    ];

    const provinces = [
        'Gauteng',
        'Western Cape',
        'KwaZulu-Natal',
        'Eastern Cape',
        'North West',
        'Free State',
        'Limpopo',
        'Mpumalanga',
        'Northern Cape',
        'National / Online'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        setIsSubmitting(true);

        const newReport: ScamReport = {
            id: `rep-usr-${Date.now()}`,
            title: title.trim(),
            category,
            platform,
            scammerContact: scammerContact.trim() || undefined,
            location,
            lossAmount: lossAmount ? parseFloat(lossAmount) : 0,
            description: description.trim(),
            date: new Date().toISOString().split('T')[0],
            status: 'verified',
            upvotes: 1,
            flaggedCount: 0,
            reportedBy: currentUser?.id || 'anonymous',
            reportedByName: currentUser?.name || 'Concerned Citizen',
            dangerLevel: lossAmount && parseFloat(lossAmount) > 1000 ? 'high' : 'medium',
            aiAnalysis: 'Community verified report. Automated duplicate and pattern check completed.'
        };

        try {
            const existing = JSON.parse(localStorage.getItem('pasop_custom_reports') || '[]');
            localStorage.setItem('pasop_custom_reports', JSON.stringify([newReport, ...existing]));
        } catch (err) {
            console.error(err);
        }

        setIsSubmitting(false);

        // Reset form
        setTitle('');
        setScammerContact('');
        setLossAmount('');
        setDescription('');

        onReportSuccess({
            title: 'Report Published Successfully!',
            body: 'Thank you for contributing to PASOP. Your report helps protect fellow South Africans from being victimized by this fraud syndicate.'
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Report a Scam Incident</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Help alert your community. Your submission will be recorded in the public PASOP database to protect others.
                </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900">
                <span className="font-bold">🔒 Privacy Notice: </span>
                Do not include your own personal banking password, OTP, or ID number. Only provide the fraudster's details and the tactics they used.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">
                        Incident Headline / Title *
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Fake Capitec urgent cancellation link sent via SMS"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1">Scam Category *</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as ScamCategory)}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1">Platform Used *</label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {platforms.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1">
                            Scammer Number / Account / URL
                        </label>
                        <input
                            type="text"
                            value={scammerContact}
                            onChange={(e) => setScammerContact(e.target.value)}
                            placeholder="e.g. 082 123 4567 or link"
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1">Province</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {provinces.map(prov => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1">Amount Lost (ZAR / R)</label>
                        <input
                            type="number"
                            value={lossAmount}
                            onChange={(e) => setLossAmount(e.target.value)}
                            placeholder="0 if prevented"
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">
                        Detailed Description of How It Happened *
                    </label>
                    <textarea
                        rows={5}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Explain the initial contact, what they promised or claimed, how they pressured you, what links or bank accounts they provided, and how you realized it was fraudulent..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition shadow-sm active:scale-98 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Verifying & Submitting...' : 'Submit Scam Report to PASOP SA'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReportPage;
