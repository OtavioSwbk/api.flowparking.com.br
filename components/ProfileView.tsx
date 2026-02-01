
import React, { useState } from 'react';
import { UserState } from '../types';

interface Props {
  user: UserState;
  onLogout: () => void;
}

type ProfileSubView = 'main' | 'data' | 'payments' | 'security';

const ProfileView: React.FC<Props> = ({ user, onLogout }) => {
  const [subView, setSubView] = useState<ProfileSubView>('main');

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-6">
      <button onClick={() => setSubView('main')} className="p-2 -ml-2 text-green-800 bg-green-100 rounded-full">
        <i className="fa-solid fa-arrow-left text-sm"></i>
      </button>
      <h2 className="text-xl font-black text-green-900 uppercase tracking-tight">{title}</h2>
    </div>
  );

  if (subView === 'data') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        {renderHeader('Meus Dados')}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nome Completo</p>
            <p className="font-bold text-slate-800 uppercase text-sm">Otavio Sewaybricker Silveira</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">CPF Cadastrado</p>
            <p className="font-bold text-slate-800 text-sm">***.456.***-00</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Celular / WhatsApp</p>
            <p className="font-bold text-slate-800 text-sm">(17) 9****-3502</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">E-mail</p>
            <p className="font-bold text-slate-800 text-sm">otavio.***@flowparking.com.br</p>
          </div>
        </div>
        <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">
          Solicitar Alteração de Dados
        </button>
      </div>
    );
  }

  if (subView === 'payments') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        {renderHeader('Pagamentos')}
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Métodos Salvos</p>
        <div className="space-y-3">
          <div className="bg-white p-5 rounded-3xl border border-green-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-800 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
              <div>
                <p className="font-black text-slate-800 text-sm">**** **** **** 1234</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">Expira em 10/28</p>
              </div>
            </div>
            <i className="fa-solid fa-circle-check text-green-500"></i>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between grayscale opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white text-[10px] font-black">MASTER</div>
              <div>
                <p className="font-black text-slate-800 text-sm">**** **** **** 5678</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">Expira em 05/26</p>
              </div>
            </div>
            <button className="text-red-500 text-xs"><i className="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <button className="w-full py-5 border-2 border-dashed border-green-200 rounded-3xl text-green-600 font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all">
          <i className="fa-solid fa-plus-circle"></i> Adicionar Novo Cartão
        </button>
      </div>
    );
  }

  if (subView === 'security') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        {renderHeader('Segurança')}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
           <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha Atual</label>
              <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 outline-none focus:border-green-500" />
           </div>
           <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nova Senha</label>
              <input type="password" placeholder="Nova senha" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 outline-none focus:border-green-500" />
           </div>
           <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Nova Senha</label>
              <input type="password" placeholder="Repita a nova senha" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 outline-none focus:border-green-500" />
           </div>
           <button 
             onClick={() => {
                alert('Senha alterada com sucesso!');
                setSubView('main');
             }}
             className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
           >
              ATUALIZAR SENHA
           </button>
        </div>
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
          <i className="fa-solid fa-shield-halved text-amber-500"></i>
          <p className="text-[9px] text-amber-800 font-bold uppercase leading-relaxed">
            Recomendamos trocar sua senha a cada 90 dias para manter sua conta FLOWPARKING segura.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] p-8 text-center shadow-sm border border-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-green-600"></div>
        <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl relative overflow-hidden">
           <i className="fa-solid fa-circle-user text-6xl text-green-600"></i>
        </div>
        <h2 className="text-2xl font-black text-slate-800 leading-tight">Otavio Sewaybricker Silveira</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Usuário Verificado SIGV</p>
        
        <div className="mt-8 pt-8 border-t border-gray-50 flex justify-around">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Veículos</p>
            <p className="font-black text-green-700 text-2xl">{user.vehicles.length}</p>
          </div>
          <div className="w-px h-12 bg-gray-100"></div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Saldo</p>
            <p className="font-black text-green-700 text-2xl">R$ {user.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <button 
          onClick={() => setSubView('data')}
          className="w-full p-5 flex items-center justify-between hover:bg-green-50 border-b border-gray-50 transition active:bg-green-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <i className="fa-solid fa-user-gear text-lg"></i>
            </div>
            <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Meus Dados</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </button>
        <button 
          onClick={() => setSubView('payments')}
          className="w-full p-5 flex items-center justify-between hover:bg-green-50 border-b border-gray-50 transition active:bg-green-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <i className="fa-solid fa-credit-card text-lg"></i>
            </div>
            <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Pagamentos</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </button>
        <button 
          onClick={() => setSubView('security')}
          className="w-full p-5 rounded-b-3xl flex items-center justify-between hover:bg-green-50 transition active:bg-green-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <i className="fa-solid fa-shield-halved text-lg"></i>
            </div>
            <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Segurança</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </button>
      </div>

      <button 
        onClick={onLogout}
        className="w-full p-5 rounded-2xl text-red-600 font-black bg-white border border-red-100 flex items-center justify-center gap-3 active:scale-95 transition shadow-sm uppercase tracking-widest text-xs"
      >
        <i className="fa-solid fa-power-off"></i> Sair do Aplicativo
      </button>
    </div>
  );
};

export default ProfileView;
