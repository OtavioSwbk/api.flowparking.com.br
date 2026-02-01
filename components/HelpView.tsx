
import React from 'react';

interface Props {
  onBack: () => void;
}

const HelpView: React.FC<Props> = ({ onBack }) => {
  const whatsappUrl = "https://wa.me/5534991785447?text=Olá! Preciso de ajuda com o aplicativo Área Azul Frutal.";

  const workingHours = [
    { day: 'Segunda-feira', hours: '08:00 - 18:00' },
    { day: 'Terça-feira', hours: '08:00 - 18:00' },
    { day: 'Quarta-feira', hours: '08:00 - 18:00' },
    { day: 'Quinta-feira', hours: '08:00 - 18:00' },
    { day: 'Sexta-feira', hours: '08:00 - 18:00' },
    { day: 'Sábado', hours: '08:00 - 12:00' },
    { day: 'Domingo', hours: 'Fechada', closed: true },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300 pb-10">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-green-800">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-xl font-black text-green-900 uppercase">Suporte e Ajuda</h2>
      </div>

      {/* Card de Horário de Funcionamento */}
      <div className="bg-white rounded-[40px] p-6 shadow-sm border border-green-100">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <i className="fa-solid fa-clock"></i>
            </div>
            <h3 className="font-black text-green-900 uppercase text-xs tracking-widest">Horário de Funcionamento</h3>
        </div>
        
        <div className="space-y-2">
            {workingHours.map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl ${item.closed ? 'bg-rose-50' : 'bg-slate-50'}`}>
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${item.closed ? 'text-rose-700' : 'text-slate-600'}`}>
                        {item.day}
                    </span>
                    <span className={`text-[11px] font-black ${item.closed ? 'text-rose-600' : 'text-green-700'}`}>
                        {item.hours}
                    </span>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-green-700 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-10"></div>
        <h3 className="font-black mb-6 flex items-center gap-3 text-lg uppercase tracking-tight">
            <i className="fa-solid fa-lightbulb"></i> Guia Rápido
        </h3>
        <ul className="space-y-5 text-sm font-bold uppercase tracking-wide">
            <li className="flex gap-4 items-center">
                <span className="bg-white text-green-700 w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-lg font-black text-xs">1</span>
                <span>Cadastre sua placa oficial.</span>
            </li>
            <li className="flex gap-4 items-center">
                <span className="bg-white text-green-700 w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-lg font-black text-xs">2</span>
                <span>Tenha saldo ativo no SIGV.</span>
            </li>
            <li className="flex gap-4 items-center">
                <span className="bg-white text-green-700 w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-lg font-black text-xs">3</span>
                <span>Ative o tempo na vaga.</span>
            </li>
        </ul>
      </div>

      <div className="space-y-4 px-1">
        <h3 className="font-black text-green-900 uppercase text-[10px] tracking-[0.2em] ml-2">Perguntas Frequentes</h3>
        {[
          { q: 'Como evitar notificações?', a: 'Sempre mantenha o tempo ativo enquanto o carro estiver na vaga. O fiscal consulta a placa em tempo real no dashboard.' },
          { q: 'Saldo expira?', a: 'Não, o saldo da sua carteira FlowParking não tem validade e pode ser usado quando desejar em Frutal.' }
        ].map((faq, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <p className="font-black text-slate-800 text-xs mb-2 uppercase tracking-tight">{faq.q}</p>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{faq.a}</p>
            </div>
        ))}
      </div>

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-green-50 text-green-700 font-black py-5 rounded-[30px] border-2 border-dashed border-green-200 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-all"
      >
          <i className="fa-brands fa-whatsapp text-xl"></i>
          Suporte WhatsApp: (34) 99178-5447
      </a>

      <div className="text-center opacity-40 pt-2 pb-6">
        <p className="text-[9px] font-black uppercase tracking-[0.3em]">SIGV • FLOWPARKING FRUTAL</p>
      </div>
    </div>
  );
};

export default HelpView;
