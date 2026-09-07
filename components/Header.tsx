import React from 'react';
import { Page, User } from '../types';

interface HeaderProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
    currentUser: User | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
    activePage,
    setActivePage,
    currentUser,
    onLogout
}) => {
    const navItems: { label: string; page: Page }[] = [
        { label: 'Home', page: 'home' },
        { label: 'Live Alerts', page: 'alerts' },
        { label: 'Scam DB', page: 'database' },
        { label: 'Flagged', page: 'flagged-list' },
        { label: 'Report Scam', page: 'report' },
        { label: 'Helplines', page: 'resources' },
    ];

    return (
        <header className="border-b border-gray-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Brand / Logo */}
                <div 
                    onClick={() => setActivePage('home')}
                    className="cursor-pointer flex items-center space-x-3 group"
                >
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black tracking-tighter text-xl shadow-sm group-hover:scale-105 transition-transform">
                        !
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black tracking-tight text-black">PASOP</span>
                            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                                SA Scam Watch
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Verify before you trust</p>
                    </div>
                </div>

                {/* Right controls: User actions */}
                <div className="flex items-center gap-2">
                    {currentUser ? (
                        <div className="flex items-center gap-2">
                            {currentUser.isAdmin && (
                                <button
                                    onClick={() => setActivePage('admin-dashboard')}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                                        activePage === 'admin-dashboard' 
                                            ? 'bg-purple-600 text-white border-purple-600' 
                                            : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                                    }`}
                                >
                                    Admin Panel
                                </button>
                            )}
                            <button
                                onClick={() => setActivePage('profile')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                                    activePage === 'profile'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                {currentUser.name || 'My Profile'}
                            </button>
                            <button
                                onClick={onLogout}
                                className="px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition"
                                title="Sign out"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActivePage('login')}
                                className="px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:text-black transition"
                            >
                                Sign in
                            </button>
                            <button
                                onClick={() => setActivePage('signup')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition"
                            >
                                Join Community
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop / Tablet Navigation Row */}
            <nav className="mt-4 pt-3 border-t border-gray-100 overflow-x-auto custom-scrollbar">
                <ul className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium whitespace-nowrap">
                    {navItems.map((item) => (
                        <li key={item.page}>
                            <button
                                onClick={() => setActivePage(item.page)}
                                className={`px-3 py-1.5 rounded-lg transition-colors ${
                                    activePage === item.page
                                        ? 'bg-black text-white font-semibold'
                                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                                }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => setActivePage('contact')}
                            className={`px-3 py-1.5 rounded-lg transition-colors ${
                                activePage === 'contact'
                                    ? 'bg-black text-white font-semibold'
                                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                            }`}
                        >
                            Support
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
