import React from 'react';
import { Page, User } from '../types';

interface BottomNavProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
    currentUser: User | null;
}

const BottomNav: React.FC<BottomNavProps> = ({
    activePage,
    setActivePage,
    currentUser
}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-4 md:hidden">
            <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
                {/* Home */}
                <button
                    onClick={() => setActivePage('home')}
                    className={`flex flex-col items-center justify-center py-1 transition ${
                        activePage === 'home' ? 'text-black font-bold' : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Home</span>
                </button>

                {/* Live Alerts */}
                <button
                    onClick={() => setActivePage('alerts')}
                    className={`flex flex-col items-center justify-center py-1 transition ${
                        activePage === 'alerts' ? 'text-black font-bold' : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Alerts</span>
                </button>

                {/* Report (Prominent) */}
                <button
                    onClick={() => setActivePage('report')}
                    className="flex flex-col items-center justify-center -mt-3 text-white transition group"
                >
                    <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-active:scale-95 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-red-600 font-bold mt-0.5">Report</span>
                </button>

                {/* Scam Database */}
                <button
                    onClick={() => setActivePage('database')}
                    className={`flex flex-col items-center justify-center py-1 transition ${
                        activePage === 'database' ? 'text-black font-bold' : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Search</span>
                </button>

                {/* Profile / Account */}
                <button
                    onClick={() => setActivePage(currentUser ? 'profile' : 'login')}
                    className={`flex flex-col items-center justify-center py-1 transition ${
                        activePage === 'profile' || activePage === 'login' ? 'text-black font-bold' : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[10px] mt-0.5">{currentUser ? 'Account' : 'Login'}</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
