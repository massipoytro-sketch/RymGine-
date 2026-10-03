/**
 * @license
 * DeSiaVe Main Application Shell
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation, NavTab } from './components/gx/Navigation';
import { HomeScreen } from './screens/Home';
import { MoneyScreen } from './screens/Money';
import { PagesScreen } from './pages/Pages';
import { AccountScreen } from './screens/Account';
import { AuthScreen } from './screens/Auth';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header & Navigation */}
      <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Responsive Screen Viewport */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        {currentTab === 'home' && <HomeScreen onNavigateToTab={setCurrentTab} />}
        {currentTab === 'money' && <MoneyScreen />}
        {currentTab === 'pages' && <PagesScreen />}
        {currentTab === 'account' && <AccountScreen />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
