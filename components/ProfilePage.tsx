import React from 'react';
import { User, Page } from '../types';
import { INITIAL_ALERTS } from '../data';

interface ProfilePageProps {
    currentUser: User;
    onLogout: () => void;
    setActivePage: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onLogout, setActivePage }) => {
    const savedAlertIds: string[] = (() => {
        try {
            const saved = localStorage.getItem('pasop_saved_alerts');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    })();

    const bookmarkedAlerts = INITIAL_ALERTS.filter(alert => savedAlertIds.includes(alert.id));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Citizen Profile</h1>
                    <p className="text-xs text-gray-500">Manage your saved alerts and contributions</p>
                </div>
                <button
                    onClick={onLogout}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                >
                    Sign Out
                </button>
            </div>

            {/* User Identity Card */}
            <div className="p-5 rounded-2xl bg-black text-white shadow-md">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xl border border-white/20">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold">{currentUser.name}</h2>
                            {currentUser.isAdmin && (
                                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                    Admin
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-300">{currentUser.email}</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                            🛡️ PASOP Community Defender • Joined {currentUser.joinedDate || 'September 2026'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => setActivePage('report')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-left transition"
                >
                    <div className="text-lg">📢</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">File a Scam Report</div>
                    <div className="text-xs text-gray-500">Alert other South Africans</div>
                </button>
                <button
                    onClick={() => setActivePage('database')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-left transition"
                >
                    <div className="text-lg">🔍</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">Search Directory</div>
                    <div className="text-xs text-gray-500">Check numbers and accounts</div>
                </button>
            </div>

            {/* Saved Alerts */}
            <div>
                <h2 className="text-base font-bold text-gray-900 mb-3">Your Bookmarked Alerts ({bookmarkedAlerts.length})</h2>
                {bookmarkedAlerts.length === 0 ? (
                    <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                        <p className="text-xs text-gray-600">You haven't bookmarked any fraud alerts yet.</p>
                        <button
                            onClick={() => setActivePage('alerts')}
                            className="mt-2 text-xs font-bold text-black hover:underline"
                        >
                            Browse live alerts to save &rarr;
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {bookmarkedAlerts.map(alert => (
                            <div key={alert.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-red-600">{alert.category}</span>
                                    <span className="text-gray-400">{alert.date}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900">{alert.title}</h4>
                                <p className="text-xs text-gray-600 line-clamp-2">{alert.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
