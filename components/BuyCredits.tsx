
import React, { useState } from 'react';
import { UserState } from '../types';
import { calculateParkingEndTime } from '../services/parkingUtils';

interface Props {
  user: UserState;
  onBack: () => void;
  onConfirm: (vId: string, minutes: number, cost: number) => void;
  onRecharge: () => void;
}

const BuyCredits: React.FC<Props> = ({ user, onBack, onConfirm, onRecharge }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(user.vehicles[0]?.id || '');
  const [selectedOpt, setSelectedOpt] = useState<number>(1);

  const generateOptions = () => {
    const opts = [{ label: '30 Minutos', sub: 'R$ 1.00', min: 30, price: 1.00 }];
    for (let h = 1; h <= 50; h++) {
      opts.push({
        label: `${h < 10 ? '0' + h : h} ${h === 1 ? 'Hora' : 'Horas'}`,
        sub: `R$ ${(h * 2).toFixed(2)}`,
        min: h * 60,
        price: h * 2.00
      });
    }
    return opts;
  };

  const options = generateOptions();
  const currentSelection = options[selectedOpt];
  const isBalanceEnough = user.balance >= currentSelection.price;

  // Cálculo da expiração para exibição
  const expiryDate = calculateParkingEndTime(new Date(), currentSelection.min);
  const isRollover = expiryDate.getDate() !== new Date().getDate();

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-green-800">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-[13px] font-[900] text-[#15803d] uppercase tracking-wider">Escolha o Período</h2>
      </div>

      <div className="mb-6">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Veículo Selecionado</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {user.vehicles.map(v => (
            <button 
              key={v.id}
              onClick={() => setSelectedVehicle(v.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl border-2 transition-all ${selectedVehicle === v.id ? 'border-green-600 bg-green-50 text-green-800 shadow-sm' : 'border-gray-100 bg-white text-slate-400'}`}
            >
              <span className="font-black text-xs uppercase">{v.plate}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-60 overflow-y-auto no-scrollbar pr-1">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => setSelectedOpt(index)}
            className={`bg-white p-5 rounded-[24px] flex flex-col items-center justify-center shadow-sm border-2 transition-all active:scale-95 ${
              selectedOpt === index 
              ? 'border-green-500 bg-green-50/30 ring-2 ring-green-100' 
              : 'border-transparent'
            }`}
          >
            <span className="text-[13px] font-bold text-slate-600 mb-1">{opt.label}</span>
            <span className="text-[14px] font-[900] text-green-600">{opt.sub}</span>
          </button>
        ))}
      </div>

      <div className="fixed bottom-20 left-4 right-4 max-w-[448px] mx-auto z-40 space-y-3">
        <div className={`rounded-3xl p-4 border flex items-center justify-between shadow-xl backdrop-blur-md transition-all duration-500 ${isBalanceEnough ? 'bg-white/90 border-green-100' : 'bg-amber-50 border-amber-200'}`}>
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBalanceEnough ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                 <i className={`fa-solid ${isBalanceEnough ? 'fa-check' : 'fa-triangle-exclamation'} text-lg`}></i>
              </div>
              <div>
                 <p className={`text-[9px] font-black uppercase tracking-widest ${isBalanceEnough ? 'text-green-600' : 'text-amber-700'}`}>
                    {isBalanceEnough ? 'Saldo Confirmado' : 'Atenção ao Saldo'}
                 </p>
                 <p className="text-[11px] font-bold text-slate-700">
                    Seu saldo atual: <span className="font-black">R$ {user.balance.toFixed(2)}</span>
                 </p>
              </div>
           </div>
           {!isBalanceEnough && (
             <button 
              onClick={onRecharge}
              className="bg-amber-500 text-white text-[9px] font-black px-3 py-2 rounded-xl shadow-md active:scale-95 uppercase tracking-tighter"
             >
               Recarregar
             </button>
           )}
        </div>

        <div className="bg-slate-900 text-white rounded-[32px] p-6 shadow-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-400 font-black uppercase text-[9px] tracking-[0.2em] mb-1">Válido Até:</p>
              <p className={`font-bold text-sm ${isRollover ? 'text-amber-400' : 'text-white'}`}>
                {expiryDate.toLocaleDateString('pt-BR', { weekday: 'long' })}, {expiryDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}h
              </p>
              {isRollover && <p className="text-[8px] text-amber-400 font-black uppercase tracking-widest mt-1">Crédito Estendido para Próximo Dia Útil</p>}
            </div>
            <div className="text-right">
              <p className={`font-black text-2xl ${isBalanceEnough ? 'text-green-400' : 'text-amber-400'}`}>R$ {currentSelection.price.toFixed(2)}</p>
            </div>
          </div>

          {isBalanceEnough ? (
            <button 
              onClick={() => onConfirm(selectedVehicle, currentSelection.min, currentSelection.price)}
              className="w-full bg-green-500 py-5 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              ATIVAR VAGA <i className="fa-solid fa-check-circle"></i>
            </button>
          ) : (
            <button 
              onClick={onRecharge}
              className="w-full bg-amber-500 py-5 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              ADICIONAR SALDO <i className="fa-solid fa-wallet"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;
