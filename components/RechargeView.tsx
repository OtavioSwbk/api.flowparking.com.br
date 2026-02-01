
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

type PaymentMethod = 'pix' | 'credit' | 'debit';

const RechargeView: React.FC<Props> = ({ onBack, onConfirm }) => {
  const [selectedOptIndex, setSelectedOptIndex] = useState(1); // Default 1 hora
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [showPixScreen, setShowPixScreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixCode = "00020126580014br.gov.bcb.pix0136995d6d80-6831-414c-a439-92b6f7e0d2765204000053039865802BR5925Road Cars Automoveis Ltda6014RIO DE JANEIRO62070503***63042665";

  // Gera opções de 30 min até 50 horas
  const generateOptions = () => {
    const opts = [{ label: '30 Minutos', price: 1.00 }];
    for (let h = 1; h <= 50; h++) {
      opts.push({
        label: `${h < 10 ? '0' + h : h} ${h === 1 ? 'Hora' : 'Horas'}`,
        price: h * 2.00
      });
    }
    return opts;
  };

  const options = generateOptions();
  const selectedAmount = options[selectedOptIndex].price;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paymentMethods = [
    { 
      id: 'pix' as PaymentMethod, 
      title: 'PIX Instantâneo', 
      sub: 'Saldo na hora', 
      icon: 'fa-qrcode',
      color: '#10b981'
    },
    { 
      id: 'credit' as PaymentMethod, 
      title: 'Cartão de Crédito', 
      sub: 'Até 12x', 
      icon: 'fa-credit-card',
      color: '#3b82f6'
    },
    { 
      id: 'debit' as PaymentMethod, 
      title: 'Cartão de Débito', 
      sub: 'Débito imediato', 
      icon: 'fa-id-card',
      color: '#6366f1'
    }
  ];

  if (showPixScreen) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300 pb-20 h-full flex flex-col">
        <div className="relative flex items-center justify-center py-2">
          <button 
            onClick={() => setShowPixScreen(false)} 
            className="absolute left-0 p-2 text-green-800"
          >
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          <h2 className="text-xl font-[900] text-[#065f46] uppercase tracking-tight">Pagamento PIX</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-4">
          <div className="text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Valor do Crédito</p>
             <p className="text-4xl font-black text-green-700">R$ {selectedAmount.toFixed(2)}</p>
          </div>

          {/* QR Code Placeholder (Using an API to generate QR from user string) */}
          <div className="bg-white p-6 rounded-[40px] shadow-2xl border-4 border-green-50 relative group">
             <img 
               src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`} 
               alt="PIX QR Code"
               className="w-56 h-56"
             />
             <div className="absolute inset-0 border-4 border-green-500/20 rounded-[40px] pointer-events-none"></div>
          </div>

          <div className="w-full space-y-4">
             <div className="bg-slate-100 rounded-3xl p-5 border border-slate-200">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Código PIX Copia e Cola</p>
                <div className="flex items-center gap-3">
                   <div className="flex-1 truncate font-mono text-[10px] text-slate-500 select-all">
                      {pixCode}
                   </div>
                   <button 
                     onClick={handleCopyPix}
                     className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-90 ${copied ? 'bg-green-500 text-white' : 'bg-white text-green-600'}`}
                   >
                      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-lg`}></i>
                   </button>
                </div>
                {copied && <p className="text-center text-[10px] text-green-600 font-bold mt-2 animate-bounce">Copiado para a área de transferência!</p>}
             </div>

             <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 items-center">
                <i className="fa-solid fa-circle-info text-amber-500"></i>
                <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tight leading-relaxed">
                   Após o pagamento, o seu saldo será atualizado automaticamente em instantes no sistema SIGV.
                </p>
             </div>
          </div>
        </div>

        <div className="px-2 pt-4">
          <button 
            onClick={() => {
              onConfirm(selectedAmount);
            }}
            className="w-full bg-[#065f46] text-white font-[900] py-6 rounded-[32px] shadow-xl active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-sm"
          >
            CONFIRMAR PAGAMENTO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Header Centralizado */}
      <div className="relative flex items-center justify-center py-2">
        <button 
          onClick={onBack} 
          className="absolute left-0 p-2 text-green-800"
        >
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-xl font-[900] text-[#065f46] uppercase tracking-tight">Comprar Saldo</h2>
      </div>

      {/* Seleção de Valor baseada em Horas (Scrollable Grid) */}
      <div className="space-y-3">
          <p className="text-[#94a3b8] text-[10px] font-[800] uppercase ml-6 tracking-[0.2em]">
            Selecione o período (Até 50h)
          </p>
          
          <div className="grid grid-cols-2 gap-3 px-2 max-h-[400px] overflow-y-auto no-scrollbar py-2">
              {options.map((opt, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedOptIndex(index)}
                    className={`p-5 rounded-[32px] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                      setSelectedOptIndex && selectedOptIndex === index 
                      ? 'border-[#10b981] bg-white shadow-xl scale-[1.02]' 
                      : 'border-transparent bg-slate-100/50 text-slate-400'
                    }`}
                  >
                    <span className={`text-[12px] font-bold uppercase tracking-tight ${selectedOptIndex === index ? 'text-slate-600' : 'text-slate-400'}`}>
                        {opt.label}
                    </span>
                    <span className={`text-lg font-[900] ${selectedOptIndex === index ? 'text-green-600' : 'text-slate-400'}`}>
                        R$ {opt.price.toFixed(2)}
                    </span>
                  </button>
              ))}
          </div>
      </div>

      {/* Formas de Pagamento */}
      <div className="space-y-3 pt-2">
          <p className="text-[#94a3b8] text-[10px] font-[800] uppercase ml-6 tracking-[0.2em]">
            Forma de Pagamento
          </p>
          
          <div className="space-y-3 px-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full bg-white rounded-[32px] p-4 flex items-center justify-between border-2 transition-all duration-300 ${
                  paymentMethod === method.id 
                  ? 'border-[#10b981] shadow-md' 
                  : 'border-transparent shadow-sm grayscale opacity-70 scale-95'
                }`}
              >
                <div className="flex items-center gap-4 text-left">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: paymentMethod === method.id ? method.color : '#94a3b8' }}
                    >
                        <i className={`fa-solid ${method.icon} text-lg`}></i>
                    </div>
                    <div>
                        <p className="text-[13px] font-[900] text-slate-800 uppercase tracking-tight leading-none mb-1">
                          {method.title}
                        </p>
                        <p className={`text-[8px] font-black uppercase tracking-widest ${paymentMethod === method.id ? 'text-[#10b981]' : 'text-slate-400'}`}>
                          {method.sub}
                        </p>
                    </div>
                </div>
                {paymentMethod === method.id && (
                  <i className="fa-solid fa-circle-check text-green-500 text-xl mr-2"></i>
                )}
              </button>
            ))}
          </div>
      </div>

      {/* Botão de Finalização */}
      <div className="pt-4 px-2">
        <button 
          onClick={() => {
            if (paymentMethod === 'pix') {
              setShowPixScreen(true);
            } else {
              onConfirm(selectedAmount);
              alert(`Recarga de R$ ${selectedAmount.toFixed(2)} (${options[selectedOptIndex].label}) confirmada via Cartão!`);
            }
          }}
          className="w-full bg-[#065f46] text-white font-[900] py-6 rounded-[32px] shadow-[0_20px_40px_rgba(6,95,70,0.25)] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-[0.2em] text-sm"
        >
          <span>FINALIZAR COMPRA</span>
          <span className="text-green-300 text-[10px] opacity-80">Equivalente a {options[selectedOptIndex].label}</span>
        </button>
        
        <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-6">
            Ambiente Seguro • FLOWPARKING - SIGV
        </p>
      </div>
    </div>
  );
};

export default RechargeView;
