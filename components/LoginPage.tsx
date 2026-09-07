import React, { useState } from 'react';
import { User, Page } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
    setActivePage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setActivePage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = email.trim().toLowerCase();
        
        // Demo admin credential check or standard user login
        const isAdmin = trimmed.includes('admin') || trimmed === 'admin@pasop.co.za';
        const user: User = {
            id: `usr-${Date.now()}`,
            name: isAdmin ? 'PASOP Admin' : (email.split('@')[0] || 'Community Member'),
            email: trimmed,
            isAdmin,
            joinedDate: 'September 2026'
        };

        onLogin(user);
    };

    const handleDemoAdmin = () => {
        onLogin({
            id: 'admin-1',
            name: 'Security Ops Admin',
            email: 'admin@pasop.co.za',
            isAdmin: true,
            joinedDate: 'January 2026'
        });
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-black tracking-tight text-gray-900">Sign in to PASOP</h1>
                <p className="text-xs text-gray-500 mt-1">
                    Access your saved scam bookmarks, track reports, and manage alerts
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.co.za"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition active:scale-98"
                >
                    Sign In
                </button>

                <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={handleDemoAdmin}
                        className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold rounded-xl text-xs border border-purple-200 transition"
                    >
                        ⚡ Fast Demo: Log In as Moderator / Admin
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-2">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setActivePage('signup')}
                            className="font-bold text-black hover:underline"
                        >
                            Sign up free
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
