
import React from 'react';

interface Props {
  history: any[];
}

const HistoryView: React.FC<Props> = ({ history }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-black text-green-900 px-1 uppercase tracking-tight">Histórico Frutal</h2>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:border-green-200 transition">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.status === 'Concluído' ? 'bg-green-100 text-green-600' : 'bg-green-600 text-white animate-pulse shadow-md'}`}>
                <i className={`fa-solid ${item.status === 'Concluído' ? 'fa-check-double' : 'fa-clock-rotate-left'}`}></i>
              </div>
              <div>
                <p className="font-black text-slate-800 uppercase text-lg leading-none mb-1">{item.plate}</p>
                <p className="text-[10px] text-gray-400 font-bold tracking-wider">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-slate-800">R$ {item.cost.toFixed(2)}</p>
              <p className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Concluído' ? 'text-gray-400' : 'text-green-600'}`}>
                {item.duration} • {item.status}
              </p>
            </div>
          </div>
        ))}

        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <i className="fa-solid fa-receipt text-6xl mb-4 opacity-10"></i>
            <p className="font-bold uppercase tracking-widest text-xs">Sem registros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
