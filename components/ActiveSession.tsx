
import React, { useState, useEffect } from 'react';
import { ActiveParking, Vehicle } from '../types';
import { getRemainingWorkingMinutes, isOperatingTime, getNextOperatingStart } from '../services/parkingUtils';

interface Props {
  active: ActiveParking;
  vehicle: Vehicle;
  onEnd: () => void;
}

const ActiveSession: React.FC<Props> = ({ active, vehicle, onEnd }) => {
  const [remainingUsefulMinutes, setRemainingUsefulMinutes] = useState(0);
  const [isCurrentlyActive, setIsCurrentlyActive] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const endTime = new Date(active.endTime);
      
      const isOp = isOperatingTime(now);
      setIsCurrentlyActive(isOp);

      const mins = getRemainingWorkingMinutes(endTime);
      setRemainingUsefulMinutes(mins);
    };

    updateTime();
    const timer = setInterval(updateTime, 10000); // Atualiza a cada 10s para poupar bateria, mas a lógica é sólida
    return () => clearInterval(timer);
  }, [active]);

  const formatTime = (totalMins: number) => {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
  };

  const percentage = (remainingUsefulMinutes / active.totalDurationMinutes) * 100;
  const nextStart = getNextOperatingStart(new Date());

  return (
    <div className="h-full flex flex-col items-center justify-start space-y-6 animate-in zoom-in duration-500 px-2 pt-4">
      <div className="text-center w-full">
        <h2 className={`text-[11px] font-black tracking-[0.3em] uppercase mb-1 ${isCurrentlyActive ? 'text-green-800' : 'text-amber-600'}`}>
          {isCurrentlyActive ? 'TEMPO ÚTIL RESTANTE' : 'SESSÃO SUSPENSA'}
        </h2>
        <p className={`text-5xl font-black font-mono tracking-tight ${isCurrentlyActive ? 'text-slate-800' : 'text-slate-400 opacity-50'}`}>
          {formatTime(remainingUsefulMinutes)}
        </p>
      </div>

      <div className="relative w-52 h-52 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-green-100"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={276}
            strokeDashoffset={276 - (276 * percentage) / 100}
            className={`${!isCurrentlyActive ? 'text-amber-400' : percentage < 20 ? 'text-red-500' : 'text-green-600'} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center bg-white shadow-2xl rounded-3xl p-6 border-2 border-green-50">
          <div className={`${isCurrentlyActive ? 'bg-green-700' : 'bg-amber-500'} text-white px-3 py-1 rounded-lg text-[8px] font-black mb-1 shadow-sm uppercase tracking-widest transition-colors`}>
            {isCurrentlyActive ? 'FRUTAL' : 'PAUSADO'}
          </div>
          <p className="text-2xl font-black tracking-widest text-slate-800 uppercase leading-none">{vehicle?.plate}</p>
        </div>
      </div>

      {!isCurrentlyActive && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl w-full flex items-center gap-3 animate-pulse">
           <i className="fa-solid fa-moon text-amber-500 text-xl"></i>
           <div className="flex-1">
              <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Fora de Horário Comercial</p>
              <p className="text-[11px] font-bold text-amber-900 leading-tight mt-1">
                Sua sessão será retomada automaticamente em: {nextStart.toLocaleDateString('pt-BR')} às 08:00h.
              </p>
           </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-4 w-full shadow-sm border border-green-50 grid grid-cols-2 gap-4">
        <div className="text-center border-r border-green-50">
           <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-wider">Ativação</p>
           <p className="font-black text-slate-700 text-lg leading-none">{new Date(active.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}h</p>
        </div>
        <div className="text-center">
           <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-wider">Término Real</p>
           <p className="font-black text-green-700 text-lg leading-none">{new Date(active.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}h</p>
        </div>
      </div>

      <div className={`p-4 rounded-2xl shadow-lg w-full mt-auto flex items-center gap-3 transition-colors ${isCurrentlyActive ? 'bg-green-700' : 'bg-slate-800'} text-white`}>
        <i className={`fa-solid ${isCurrentlyActive ? 'fa-bell-on animate-bounce' : 'fa-calendar-check'} text-green-300`}></i>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed">
          {isCurrentlyActive 
            ? 'O fiscal da área já foi notificado da sua ativação. Estacione com tranquilidade!'
            : 'Sua vaga está protegida. O tempo útil voltará a contar no próximo período operacional.'}
        </p>
      </div>
      
      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">
        O sistema SIGV Frutal respeita os horários da Lei Municipal.
      </p>
    </div>
  );
};

export default ActiveSession;
