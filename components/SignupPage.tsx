import React, { useState } from 'react';
import { User, Page } from '../types';

interface SignupPageProps {
    onSignup: (user: User) => void;
    setActivePage: (page: Page) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, setActivePage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [province, setProvince] = useState('Gauteng');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        const newUser: User = {
            id: `usr-${Date.now()}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            isAdmin: email.includes('admin'),
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        onSignup(newUser);
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-black tracking-tight text-gray-900">Join the PASOP Network</h1>
                <p className="text-xs text-gray-500 mt-1">
                    Become a registered citizen defender against South African cyber fraud
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name or Alias</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sipho Ndlovu"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

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
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Province</label>
                    <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Gauteng">Gauteng</option>
                        <option value="Western Cape">Western Cape</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="North West">North West</option>
                        <option value="Northern Cape">Northern Cape</option>
                    </select>
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
                    Create Account
                </button>

                <p className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => setActivePage('login')}
                        className="font-bold text-black hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
