
import React, { useState, useEffect } from 'react';
import { UserState, Vehicle, ActiveParking } from './types';
import { api } from './services/api';
import { calculateParkingEndTime } from './services/parkingUtils';
import LoginView from './components/LoginView';
import Dashboard from './components/Dashboard';
import AddVehicle from './components/AddVehicle';
import BuyCredits from './components/BuyCredits';
import ActiveSession from './components/ActiveSession';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';
import MapView from './components/MapView';
import HelpView from './components/HelpView';
import RechargeView from './components/RechargeView';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dash' | 'add_vehicle' | 'buy_credits' | 'active' | 'history' | 'profile' | 'map' | 'help' | 'recharge'>('dash');
  
  const [user, setUser] = useState<UserState | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await api.getUserData();
      setUser(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (user) {
      api.saveUserData(user);
    }
  }, [user]);

  const handleLogin = async () => {
    setIsLoading(true);
    const success = await api.login("cpf_mascarado");
    if (success) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };
  
  const addCredits = (amount: number) => {
    if (!user) return;
    setUser(prev => prev ? ({
      ...prev,
      balance: prev.balance + amount,
      history: [
        { 
          id: Math.random().toString(36).substr(2, 9), 
          plate: 'CARTEIRA', 
          date: new Date().toISOString(), 
          duration: 'Recarga', 
          cost: amount, 
          status: 'Crédito Adicionado' 
        },
        ...prev.history
      ]
    }) : null);
    setCurrentView('dash');
  };

  const addVehicle = (plate: string, nickname: string) => {
    if (!user) return;
    const newVehicle: Vehicle = {
      id: Math.random().toString(36).substr(2, 9),
      plate: plate.toUpperCase(),
      nickname
    };
    setUser(prev => prev ? ({
      ...prev,
      vehicles: [...prev.vehicles, newVehicle]
    }) : null);
    setCurrentView('dash');
  };

  const buyParking = (vehicleId: string, minutes: number, cost: number) => {
    if (!user) return;
    if (user.balance < cost) {
      alert("Saldo insuficiente!");
      return;
    }

    const vehicle = user.vehicles.find(v => v.id === vehicleId);
    const now = new Date();
    
    // Nova lógica de Rollover para Frutal
    const expiryDate = calculateParkingEndTime(now, minutes);

    const active: ActiveParking = {
      vehicleId,
      startTime: now.getTime(),
      endTime: expiryDate.getTime(),
      totalDurationMinutes: minutes,
      creditsSpent: cost
    };

    setUser(prev => prev ? ({
      ...prev,
      balance: prev.balance - cost,
      activeParking: active,
      history: [
        { 
          id: Math.random().toString(36).substr(2, 9), 
          plate: vehicle?.plate || '---',
          date: new Date().toISOString(), 
          duration: `${minutes} min`, 
          cost: cost, 
          status: 'Em andamento' 
        },
        ...prev.history
      ]
    }) : null);
    setCurrentView('active');
  };

  const endParking = () => {
    if (!user) return;
    setUser(prev => prev ? ({
      ...prev,
      activeParking: null,
      history: prev.history.map((h) => h.status === 'Em andamento' ? { ...h, status: 'Concluído' } : h)
    }) : null);
    setCurrentView('dash');
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-green-800 flex flex-col items-center justify-center text-white p-10 text-center">
        <div className="w-16 h-16 border-4 border-green-300 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="font-black text-xl uppercase tracking-widest">Sincronizando SIGV...</h2>
        <p className="text-green-200 text-xs mt-2 opacity-60">Conectando ao banco de dados FLOWPARKING</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-800 bg-green-50 max-w-[480px] mx-auto shadow-2xl">
      <header className="bg-green-700 text-white p-4 shadow-md flex justify-between items-center z-50">
        <div className="flex flex-col">
          <h1 className="font-bold text-base tracking-tight leading-none uppercase">Área Azul Digital Frutal</h1>
          <span className="text-[9px] text-green-300 font-bold tracking-[0.2em] mt-1">POWERED BY FLOWPARKING</span>
        </div>
        <button 
          onClick={() => setCurrentView('recharge')}
          className="flex items-center gap-2 bg-green-800/50 px-3 py-1.5 rounded-full border border-green-400/30 active:scale-95 transition"
        >
          <i className="fa-solid fa-wallet text-green-300"></i>
          <span className="font-bold text-sm">R$ {user.balance.toFixed(2)}</span>
          <i className="fa-solid fa-plus-circle text-[10px] text-green-400"></i>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {currentView === 'dash' && (
          <Dashboard 
            user={user} 
            onAddVehicle={() => setCurrentView('add_vehicle')}
            onActivate={() => setCurrentView('buy_credits')}
            onViewActive={() => setCurrentView('active')}
            onViewMap={() => setCurrentView('map')}
            onViewHelp={() => setCurrentView('help')}
            onRecharge={() => setCurrentView('recharge')}
          />
        )}
        {currentView === 'add_vehicle' && (
          <AddVehicle onBack={() => setCurrentView('dash')} onSave={addVehicle} />
        )}
        {currentView === 'buy_credits' && (
          <BuyCredits 
            user={user} 
            onBack={() => setCurrentView('dash')} 
            onConfirm={buyParking} 
            onRecharge={() => setCurrentView('recharge')}
          />
        )}
        {currentView === 'active' && user.activeParking && (
          <ActiveSession 
            active={user.activeParking} 
            vehicle={user.vehicles.find(v => v.id === user.activeParking?.vehicleId)!}
            onEnd={endParking}
          />
        )}
        {currentView === 'history' && <HistoryView history={user.history} />}
        {currentView === 'profile' && <ProfileView user={user} onLogout={() => setIsLoggedIn(false)} />}
        {currentView === 'map' && <MapView onBack={() => setCurrentView('dash')} />}
        {currentView === 'help' && <HelpView onBack={() => setCurrentView('dash')} />}
        {currentView === 'recharge' && <RechargeView onBack={() => setCurrentView('dash')} onConfirm={addCredits} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 shadow-2xl z-50 max-w-[480px] mx-auto">
        <button onClick={() => setCurrentView('dash')} className={`flex flex-col items-center transition-colors ${['dash', 'add_vehicle', 'map', 'help', 'recharge'].includes(currentView) ? 'text-green-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[10px] mt-1 font-medium">Início</span>
        </button>
        <button onClick={() => setCurrentView(user.activeParking ? 'active' : 'buy_credits')} className={`flex flex-col items-center transition-colors ${['buy_credits', 'active'].includes(currentView) ? 'text-green-600' : 'text-gray-400'}`}>
          <i className={`fa-solid ${user.activeParking ? 'fa-circle-dot animate-pulse text-green-500' : 'fa-clock'} text-lg`}></i>
          <span className="text-[10px] mt-1 font-medium">{user.activeParking ? 'Ativo' : 'Ativar'}</span>
        </button>
        <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center transition-colors ${currentView === 'history' ? 'text-green-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-receipt text-lg"></i>
          <span className="text-[10px] mt-1 font-medium">Histórico</span>
        </button>
        <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center transition-colors ${currentView === 'profile' ? 'text-green-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-user text-lg"></i>
          <span className="text-[10px] mt-1 font-medium">Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
