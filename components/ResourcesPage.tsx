import React from 'react';
import { RESOURCES_LIST } from '../data';

const ResourcesPage: React.FC = () => {
    const bankHelplines = [
        { bank: 'Capitec Bank', phone: '0860 10 20 43', note: '24/7 Client Care & Card Stops' },
        { bank: 'First National Bank (FNB)', phone: '087 575 9444', note: 'Fraud & Unauthorized Transactions' },
        { bank: 'Standard Bank', phone: '0800 222 050', note: 'Toll-free Fraud Operations' },
        { bank: 'Nedbank', phone: '0800 110 929', note: 'National Fraud Emergency Unit' },
        { bank: 'Absa Bank', phone: '0860 557 557', note: 'Actionline & Account Security' },
        { bank: 'TymeBank', phone: '0860 999 119', note: 'Digital Fraud & SIM Swap Hotline' },
        { bank: 'Discovery Bank', phone: '0800 07 96 97', note: 'Client Security Center' }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Emergency Helplines & Resources</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Direct contacts for South African bank fraud units, police cyber crime divisions, and victim recovery support.
                </p>
            </div>

            {/* Emergency 1-Hour Protocol */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-red-800 font-bold text-base mb-2">
                    <span>🚨</span> SCAMMED JUST NOW? Complete These 3 Steps Immediately:
                </div>
                <div className="space-y-3 mt-3 text-xs sm:text-sm text-red-950">
                    <div className="flex items-start gap-2">
                        <span className="font-bold bg-red-200 text-red-800 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                        <p><strong>Call your bank immediately:</strong> Instruct the fraud desk to freeze all your cards, digital banking tokens, and cancel pending external EFT transfers.</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="font-bold bg-red-200 text-red-800 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                        <p><strong>Lock your SIM / WhatsApp:</strong> If an unauthorized SIM swap or OTP theft occurred, contact your mobile network (Vodacom, MTN, Telkom, Cell C) to lock your line.</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="font-bold bg-red-200 text-red-800 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                        <p><strong>Open a SAPS Criminal Docket:</strong> Visit your nearest police station with bank statements, phone numbers, and WhatsApp transcripts to get an official CAS number.</p>
                    </div>
                </div>
            </div>

            {/* South African Bank Fraud Hotlines */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">South African Bank Fraud Lines</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bankHelplines.map((b) => (
                        <div key={b.bank} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">{b.bank}</h3>
                                <p className="text-xs text-gray-500">{b.note}</p>
                            </div>
                            <a
                                href={`tel:${b.phone.replace(/\s+/g, '')}`}
                                className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition"
                            >
                                {b.phone}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* National Official Agencies */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">National Authorities & Recovery Services</h2>
                <div className="space-y-4">
                    {RESOURCES_LIST.map((res) => (
                        <div key={res.id} className="p-5 rounded-2xl border border-gray-200 bg-white space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                        {res.category}
                                    </span>
                                    <h3 className="text-base font-bold text-gray-900 mt-1">{res.title}</h3>
                                </div>
                                {res.phone && (
                                    <span className="font-mono text-xs font-bold bg-gray-50 px-2 py-1 rounded border border-gray-200">
                                        {res.phone}
                                    </span>
                                )}
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{res.description}</p>

                            {res.actionSteps && (
                                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 bg-gray-50 p-3 rounded-xl">
                                    {res.actionSteps.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ul>
                            )}

                            {res.website && (
                                <div className="pt-1">
                                    <a
                                        href={res.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                                    >
                                        Visit Official Website &rarr;
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
