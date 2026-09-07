import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AlertsPage from './components/AlertsPage';
import DatabasePage from './components/DatabasePage';
import ReportPage from './components/ReportPage';
import ResourcesPage from './components/ResourcesPage';
import ProfilePage from './components/ProfilePage';
import ContactPage from './components/ContactPage';
import BottomNav from './components/BottomNav';
import Modal from './components/Modal';
import FlaggedListPage from './components/FlaggedListPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>('home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: 'Success!',
        body: 'Operation completed successfully. You can refer back to saved items in your profile or database.'
    });
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('currentUser');
        }
    }, []);

    const handleLogin = (user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        setActivePage(user.isAdmin ? 'admin-dashboard' : 'profile');
    };
    
    const handleSignup = (user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        setActivePage('profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setActivePage('home');
    };

    const handleReportSuccess = (customMsg?: { title: string; body: string }) => {
        if (customMsg) {
            setModalMessage(customMsg);
        } else {
            setModalMessage({
                title: 'Success!',
                body: 'Operation completed successfully. You can refer back to saved items in your profile or database.'
            });
        }
        setIsModalOpen(true);
    };

    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <HomePage setActivePage={setActivePage} />;
            case 'alerts':
                return <AlertsPage currentUser={currentUser} onSaveSuccess={handleReportSuccess} />;
            case 'database':
                return <DatabasePage currentUser={currentUser} />;
            case 'flagged-list':
                return <FlaggedListPage />;
            case 'report':
                return <ReportPage onReportSuccess={handleReportSuccess} currentUser={currentUser} />;
            case 'resources':
                return <ResourcesPage />;
            case 'profile':
                if (!currentUser) {
                    return <LoginPage onLogin={handleLogin} setActivePage={setActivePage} />;
                }
                return <ProfilePage currentUser={currentUser} onLogout={handleLogout} setActivePage={setActivePage} />;
            case 'admin-dashboard':
                if (!currentUser?.isAdmin) {
                    setActivePage('home');
                    return null;
                }
                return <AdminDashboard />;
            case 'login':
                 return <LoginPage onLogin={handleLogin} setActivePage={setActivePage} />;
            case 'signup':
                 return <SignupPage onSignup={handleSignup} setActivePage={setActivePage} />;
            case 'contact':
                return <ContactPage />;
            default:
                return <HomePage setActivePage={setActivePage} />;
        }
    };

    return (
        <div className="bg-white text-black min-h-screen">
            <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 md:p-8">
                <Header 
                    activePage={activePage} 
                    setActivePage={setActivePage} 
                    currentUser={currentUser} 
                    onLogout={handleLogout} 
                />
                <main className="mt-8">
                    {renderPage()}
                </main>
                {/* 
                  Crucial Spacer: This ensures that even the longest content 
                  can be scrolled past the fixed bottom navigation bar.
                */}
                <div className="h-32 w-full" aria-hidden="true" />
            </div>
            <BottomNav activePage={activePage} setActivePage={setActivePage} currentUser={currentUser} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="text-center">
                    <h3 className="text-lg font-bold leading-6 text-black italic tracking-tight">{modalMessage.title}</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {modalMessage.body}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default App;
