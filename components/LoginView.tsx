
import React, { useState } from 'react';
import Logo from './Logo';

interface Props {
  onLogin: () => void;
}

const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [modal, setModal] = useState<'none' | 'forgot' | 'register'>('none');
  
  // Estados para os campos controlados com máscara
  const [loginCpf, setLoginCpf] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  // Estados do Modal
  const [modalCpf, setModalCpf] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalPass, setModalPass] = useState('');

  // Funções de Máscara
  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 6 primeiros dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca hífen após os 9 primeiros dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalCpf.length < 14) return alert("Por favor, informe um CPF válido.");
    alert(`Instruções de recuperação enviadas para o contato vinculado ao CPF ${modalCpf}.`);
    setModal('none');
    setModalCpf('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalCpf.length < 14 || modalPhone.length < 15) return alert("Preencha os campos corretamente.");
    alert(`Seu cadastro com o CPF ${modalCpf} foi realizado! Agora é só acessar.`);
    setModal('none');
    setModalCpf('');
    setModalPhone('');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-600 to-green-900 text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"></div>

      <div className="mb-10 text-center animate-in zoom-in duration-700 relative z-10">
        <div className="bg-white p-2 rounded-full inline-block mb-4 shadow-2xl border-4 border-green-300/30 overflow-hidden">
           <Logo className="w-24 h-24" />
        </div>
        <h1 className="text-2xl font-black tracking-tight uppercase leading-tight">Área Azul Digital<br/>Frutal</h1>
        <p className="text-green-100 mt-2 font-bold tracking-[0.3em] text-[10px] uppercase opacity-80">SISTEMA FLOWPARKING - SIGV</p>
      </div>

      <div className="w-full space-y-4 relative z-10 max-w-sm">
        <div className="relative group">
          <i className="fa-solid fa-address-card absolute left-4 top-1/2 -translate-y-1/2 text-green-200"></i>
          <input 
            type="text" 
            inputMode="numeric"
            value={loginCpf}
            onChange={(e) => setLoginCpf(maskCPF(e.target.value))}
            placeholder="CPF (000.000.000-00)"
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-green-200 outline-none focus:bg-white/20 transition-all font-medium"
          />
        </div>
        <div className="relative group">
          <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-green-200"></i>
          <input 
            type="password" 
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            placeholder="Senha"
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-green-200 outline-none focus:bg-white/20 transition-all"
          />
        </div>
        
        <button 
          onClick={onLogin}
          className="w-full bg-white text-green-800 font-black py-4 rounded-2xl shadow-xl hover:bg-green-50 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 uppercase tracking-widest text-sm"
        >
          ENTRAR NO SISTEMA <i className="fa-solid fa-arrow-right"></i>
        </button>
        
        <div className="flex justify-between text-[11px] text-green-100 font-bold pt-4 px-1 uppercase tracking-wider opacity-80">
          <button onClick={() => setModal('forgot')} className="hover:text-white transition-colors">Esqueci a senha</button>
          <button onClick={() => setModal('register')} className="hover:text-white transition-colors">Criar conta (CPF)</button>
        </div>
      </div>

      {modal !== 'none' && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-slate-800 shadow-2xl animate-in slide-in-from-bottom-5 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-green-900">{modal === 'forgot' ? 'Recuperar Acesso' : 'Cadastro pelo CPF'}</h2>
              <button onClick={() => setModal('none')} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"><i className="fa-solid fa-times"></i></button>
            </div>
            <form onSubmit={modal === 'forgot' ? handleForgot : handleRegister} className="space-y-4">
              <div className="relative">
                <i className="fa-solid fa-address-card absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={modalCpf}
                  onChange={(e) => setModalCpf(maskCPF(e.target.value))}
                  placeholder="CPF (000.000.000-00)" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-green-500 font-medium" 
                />
              </div>
              
              {modal === 'register' && (
                <>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      placeholder="Nome Completo" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-green-500 font-medium" 
                    />
                  </div>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="tel" 
                      inputMode="numeric"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(maskPhone(e.target.value))}
                      placeholder="Celular (00) 00000-0000" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-green-500 font-medium" 
                    />
                  </div>
                  <div className="relative">
                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="password" 
                      value={modalPass}
                      onChange={(e) => setModalPass(e.target.value)}
                      placeholder="Crie uma senha" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-green-500 font-medium" 
                    />
                  </div>
                </>
              )}
              
              <button className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg mt-2 uppercase tracking-widest text-xs">
                {modal === 'forgot' ? 'RECUPERAR' : 'FINALIZAR CADASTRO'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <div className="mt-auto text-[9px] text-green-200/50 font-bold uppercase tracking-widest pb-4">
        FRUTAL • FLOWPARKING © 2026
      </div>
    </div>
  );
};

export default LoginView;
