import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('General Support');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Support & Inquiries</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Get in touch with the PASOP team, submit legal requests, or partner with our anti-fraud initiative.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Form */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    {submitted ? (
                        <div className="text-center py-8 space-y-2">
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto text-xl font-bold">
                                ✓
                            </div>
                            <h3 className="font-bold text-base text-gray-900">Message Received!</h3>
                            <p className="text-xs text-gray-600">
                                Thank you for contacting PASOP. Our community safety moderators will get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setMessage('');
                                }}
                                className="mt-4 px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Lerato M."
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="lerato@domain.co.za"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Topic</label>
                                <select
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="General Support">General Support</option>
                                    <option value="Takedown / Correction Request">Takedown / Correction Request</option>
                                    <option value="Banking / Corporate Partnership">Banking / Corporate Partnership</option>
                                    <option value="Media & Press Inquiry">Media & Press Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="How can we assist you?"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>

                {/* FAQ / Info */}
                <div className="space-y-4">
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                        <h3 className="font-bold text-sm text-gray-900">Does reporting on PASOP replace the police?</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            No. PASOP is a community intelligence database designed for early warning and public protection. You must still open a case at your local SAPS police station for legal criminal prosecution.
                        </p>
                    </div>

                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                        <h3 className="font-bold text-sm text-gray-900">How does PASOP verify reports?</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Submissions undergo automated verification, duplicate detection, and community cross-referencing against verified SABRIC and banking bulletins.
                        </p>
                    </div>

                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                        <h3 className="font-bold text-sm text-gray-900">Data Privacy & POPIA Compliance</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            PASOP strictly does not publish victims' private confidential identifiers. Only verified fraudulent accounts and numbers used by criminal syndicates are indexed for public safety.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
