
import React from 'react';
import { UserState } from '../types';
import Logo from './Logo';

interface Props {
  user: UserState;
  onAddVehicle: () => void;
  onActivate: () => void;
  onViewActive: () => void;
  onViewMap: () => void;
  onViewHelp: () => void;
  onRecharge: () => void;
}

const Dashboard: React.FC<Props> = ({ user, onAddVehicle, onActivate, onViewActive, onViewMap, onViewHelp, onRecharge }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Aviso de Sessão Ativa */}
      {user.activeParking && (
        <div 
          onClick={onViewActive}
          className="bg-green-600 p-4 rounded-2xl text-white flex items-center justify-between shadow-lg animate-pulse cursor-pointer border border-green-400"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <i className="fa-solid fa-car-on text-xl"></i>
            </div>
            <div>
              <p className="font-bold">Tempo em Uso!</p>
              <p className="text-xs opacity-90">Toque para ver os detalhes</p>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      )}

      {/* Card de Saldo */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-[10px] font-bold mb-1 uppercase tracking-wider">Saldo Frutal</p>
          <div className="flex items-end gap-2">
            <span className="text-green-600 text-lg mb-1 font-bold">R$</span>
            <span className="text-4xl font-black text-slate-800">{user.balance.toFixed(2)}</span>
          </div>
        </div>
        <Logo className="w-12 h-12 opacity-80" />
      </div>

      <button 
        onClick={onRecharge}
        className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-xs shadow-lg active:scale-95 flex items-center justify-center gap-2 transition-all"
      >
        <i className="fa-solid fa-plus-circle"></i> COMPRAR CRÉDITOS
      </button>

      {/* Lista de Veículos */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="font-bold text-gray-700">Meus Veículos</h2>
          <button onClick={onAddVehicle} className="text-green-600 text-xs font-bold flex items-center gap-1">
             <i className="fa-solid fa-plus-circle"></i> Adicionar
          </button>
        </div>
        
        <div className="space-y-3">
          {user.vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:border-green-200 transition">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-full text-green-600 border border-green-100">
                  <i className="fa-solid fa-car"></i>
                </div>
                <div>
                  <p className="font-black text-slate-800 uppercase tracking-tight text-lg leading-none mb-1">{vehicle.plate}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{vehicle.nickname}</p>
                </div>
              </div>
              {!user.activeParking ? (
                <button 
                  onClick={onActivate}
                  className="bg-green-600 text-white text-[10px] font-bold px-6 py-2.5 rounded-full shadow-md active:scale-95 transition uppercase tracking-widest"
                >
                  ATIVAR
                </button>
              ) : (
                <div className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid de Atalhos */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        <button 
          onClick={onViewMap}
          className="bg-green-50/50 p-4 rounded-2xl border border-green-100 text-left transition hover:bg-green-100 active:scale-95"
        >
          <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-md">
            <i className="fa-solid fa-map-location-dot text-xl"></i>
          </div>
          <p className="text-xs font-bold text-green-900 uppercase">Mapa Vagas</p>
          <p className="text-[9px] text-green-600 mt-1 leading-tight font-medium">Veja locais disponíveis em Frutal</p>
        </button>
        <button 
          onClick={onViewHelp}
          className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-left transition hover:bg-amber-100 active:scale-95"
        >
          <div className="bg-amber-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-md">
            <i className="fa-solid fa-question-circle text-xl"></i>
          </div>
          <p className="text-xs font-bold text-amber-900 uppercase">Suporte</p>
          <p className="text-[9px] text-amber-600 mt-1 leading-tight font-medium">Dúvidas sobre o Área Azul Frutal</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
